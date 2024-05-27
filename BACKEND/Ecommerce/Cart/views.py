from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from .serializer import UserSerializer,OTPSerializer,CompanySerializer,CategorySerializer,ProductSerializer,ProductImageSerializer,productreviewserializer,cartserializer,checkoutserializer,productreviewserializer
from .models import User,OTP,Company,Category,Product, Product_Image,product_review,cart,checkout
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.shortcuts import get_list_or_404
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum


@api_view(['POST'])
def RegisterAPI(request):
    serializer = UserSerializer(data=request.data)
    print("Request Data:", request.data)  # Debug print statement

    if serializer.is_valid():
        username = serializer.validated_data.get("username")
        email = serializer.validated_data.get("email")
        location = serializer.validated_data.get("location")  
        phone_no = serializer.validated_data.get("phone_no")

        #pushing data into db
        userdata = User.objects.create_user(username=username, email=email, location=location, phone_no=phone_no)
        print("Created User:", userdata)  # Debug print statement

        otp = get_random_string(length=6, allowed_chars='1234567890')

        email_subject = 'Verify your Email'
        email_message = 'Your OTP is {}'.format(otp)
        send_mail(email_subject, email_message, "alengeorge1999@gmail.com", [email])

        #OTP push to db
        OTP.objects.create(otp_code=otp, user=userdata)
        #userdata have full details about a person
        return Response({'message': 'OTP sent successfully', 'user': userdata.id}, status=status.HTTP_200_OK)
    else:
        print("Serializer Errors:", serializer.errors)  
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def verify_otp(request,id):
    otp=OTP.objects.get(user=id)#based on id we can fetch otp as(object)
    user=User.objects.get(id=id)#based on this we can fetch user details(user=object)
    stored_otp=otp.otp_code#obj.otp_code
    entered_otp=request.data['otp']#it comes from frontend{otp:otp}
    otp.delete()
    if entered_otp==stored_otp:
        return Response({"message":"OTP verification successful"}, status=status.HTTP_200_OK)
    else:
        user.delete()
        return Response({'error': 'Invalid OTP'}, status=400)

@api_view(['POST'])
def create_password(request,id):#user id we can fetch
    user=User.objects.get(id=id)
    password=request.data['password']
    cpassword=request.data['cpassword']

    if password==cpassword:
      user.set_password(password)#for hasing the password
      user.save()
      return Response({"message":"Password created succesfully"}, status=status.HTTP_200_OK)
    else:
        return Response({"error":"password and cpassword does not much"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])    
def LoginAPI(request):
    username = request.data['username']
    password = request.data['password']
    #print(username,password)

    user = authenticate(username=username,password=password)
    print(user)

    if user:
        refresh=RefreshToken.for_user(user)
        refresh.payload['superuser']=user.is_superuser
        return Response({"token":str(refresh.access_token)}, status=status.HTTP_200_OK)
    else:
        return Response({"error":"Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def AddCompany(request):
    serializer = CompanySerializer(data=request.data)
    
    if serializer.is_valid():
        companyname = serializer.validated_data.get('name')  
        companydescription = serializer.validated_data.get('description')  
        companylogo = request.FILES.get('logo')  

        companydata = Company.objects.create(name=companyname, description=companydescription, logo=companylogo)  
        return Response({"message": "Company created successfully"}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def ViewCompanies(request):
    if request.method == 'GET':
        company = Company.objects.all()
        serializer = CompanySerializer(company,many=True)
        return Response(serializer.data)

import logging#to check Django server logs to see the specific errors encountered during serialization.
logger = logging.getLogger(__name__)

@api_view(['GET', 'PUT', 'DELETE'])        
def Edit_Delete(request, company_id):
    try:    
        company = Company.objects.get(id=company_id)
    except Company.DoesNotExist:
        return Response({"error": "Company not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CompanySerializer(company)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CompanySerializer(company, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            logger.error(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        company.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def AddCategory(request):
    print(request.data)
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save() 
        return Response({"message": "Category created successfully"}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def ViewCategory(request, company_id):
    print(company_id)
    if request.method == 'GET':
        categories = Category.objects.filter(company_id=company_id)
        print(categories)
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

@api_view(['PUT'])
def edit_category(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist:
        return Response(status=404)

    if request.method == 'PUT':
        print(request.data)
        category.name = request.data['name']
        category.save()
        print('hellooo')
        return Response(status=200)

@api_view(['DELETE'])
def delete_category(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist:
        return Response(status=404)

    if request.method == 'DELETE':
        category.delete()
        return Response(status=204)

#Add Product
@api_view(['POST'])
def add_product(request):
    if request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            product = serializer.save()  

            images = request.FILES.getlist('images')
            image_models = []
            for image in images:
                image_model = Product_Image.objects.create(image=image, product=product)
                image_models.append(image_model)

            image_serializer = ProductImageSerializer(image_models, many=True)
            return Response({'product': serializer.data, 'images': image_serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Only POST requests are allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['GET'])
def view_product(request, company_id):
    print(request.data)
    try:
        products = Product.objects.filter(company_id=company_id)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
def delete_product(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response(status=404)
    
    product.delete()
    return Response(status=204)

@api_view(['GET', 'PUT'])
def product_detail(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    elif request.method == 'PUT':
        print(request.data)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            if 'images' in request.FILES:
                images_data = request.FILES.getlist('images')
                for image_data in images_data:
                    Product_Image.objects.create(product=product, image=image_data)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Product list
@api_view(['GET'])
def product_list(request):
    try:
        if request.method == 'GET':
            products = Product.objects.all()
            response_data = []

            for product in products:
                image_instance = Product_Image.objects.filter(product=product).first()
                image_url = image_instance.image.url if image_instance else None
                
                serializer = ProductSerializer(product)
                product_data = serializer.data
                
                product_data['image'] = image_url
                response_data.append(product_data)
                
            return Response(response_data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def user_product_details(request, product_id):
    if request.method == 'GET':
        product = get_object_or_404(Product, pk=product_id)
        product_data = {
            'name': product.name,
            'company': {
                'name': product.company.name,
                'description': product.company.description,
                'logo': (product.company.logo.url) if product.company.logo else None
            },
            'category': product.category.name,
            'price': str(product.price), 
            'size': product.size,
            'color': product.color,
            'images': [(image.image.url) for image in product.images.all()]
        }
        return Response(product_data)
    else:
        return Response({'error': 'Only GET method is allowed.'}, status=405)

@api_view(['GET'])
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def Reviewadd(request):
    serializer = productreviewserializer(data=request.data)
    if serializer.is_valid():
        review = serializer.validated_data.get('review')
        rating = serializer.validated_data.get('rating')
        user_id = request.data.get('userid')
        productid = request.data.get('productid')

        # Fetch the user object using the user_id
        user = get_object_or_404(User, id=user_id)

        reviews = product_review.objects.create(
            review=review,
            rating=rating,
            user=user,
            products_id=productid
        )

        response_serializer = productreviewserializer(reviews)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
    else:
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def Review(request, pk):
    userreview = get_list_or_404(product_review, products_id=pk)
    serializer = productreviewserializer(userreview, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
def Reviewdelete(request, pk):
    userreview = get_object_or_404(product_review, id=pk)
    userreview.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(['GET'])
def Userlist(request):
    users=user.objects.filter(is_superuser=False)
    serializer=userserializer(users,many=True)
    return Response(serializer.data)    

@api_view(['DELETE'])
def Userlistdelete(request,pk):
    users=get_object_or_404(user,id=pk)
    users.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)    


@api_view(['POST'])
def Cart(request):
    serializer=cartserializer(data=request.data)
    if serializer.is_valid():
        product =serializer.validated_data.get('product')
        list_user=serializer.validated_data.get('list_user')
        productname=serializer.validated_data.get('productname')
        productprice=serializer.validated_data.get('productprice')
        carts=cart.objects.create(product=product,list_user=list_user,productname=productname,productprice=productprice)
        response_serializer = cartserializer(carts)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
    else:
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def Cartvalues(request):
    cartvalues = request.query_params.get('userId')
    if cartvalues:
        cartvalue=cart.objects.filter(list_user=cartvalues)
        serializer=cartserializer(cartvalue,many=True)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH','DELETE'])
def Cartupdate(request,pk):
    cartid=get_object_or_404(cart,id=pk)
    if request.method=='PATCH':
        serializer = cartserializer(cartid, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method=='DELETE':
        cartid.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def Checkout(request):
    try:
        user_id = request.data.get('userid')
        products_str = request.data.get('products')
        
        products = json.loads(products_str)
        user_instance = User.objects.get(id=user_id)
        
        checkouts = []
        for product in products:
            product_name = product.get('productname')
            product_quantity = product.get('productquantity')
            product_total = product.get('producttotal')
            
            checkout1 = checkout.objects.create(
                product_name=product_name,
                product_quantity=product_quantity,
                product_total=product_total,
                user_id=user_instance,
            )
            checkouts.append(checkout1)
        
        # Clear the user's cart after checkout
        cart.objects.filter(list_user=user_id).delete()
        
        response_serializer = checkoutserializer(checkouts, many=True)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
    
    except user.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    except json.JSONDecodeError:
        return Response({"error": "Invalid JSON format for products"}, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['PATCH'])
def Checkaddress(request, pk):
    print(request.data)
    checkout_instances = get_list_or_404(checkout, user_id=pk)
    shipingaddress = request.data.get('address') 

    for checkout_instance in checkout_instances:
        checkout_instance.shipingaddress = shipingaddress
        checkout_instance.save()

    serializer = checkoutserializer(checkout_instances, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def Orderlists(request):
    orderlist = request.query_params.get('userId')
    if orderlist:
        orders=checkout.objects.filter(user_id=orderlist)
        serializer=checkoutserializer(orders,many=True)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def Getallorders(request):
    orderlists=checkout.objects.all()
    serializer=checkoutserializer(orderlists,many=True)
    return Response(serializer.data)   

@api_view(['GET', 'PUT', 'DELETE'])  
def user_data(request, pk):
    user = get_object_or_404(User, pk=pk)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': 
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def Total_Sales(request):
    total_sales = checkout.objects.aggregate(total=Sum('product_total'))['total']
    return Response({'total_sales': total_sales})

@api_view(['GET'])
def get_review(request):
    reviews = product_review.objects.all()
    serializer = productreviewserializer(reviews, many=True)  
    return Response(serializer.data)