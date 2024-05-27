from rest_framework import serializers
from .models import User,OTP,Company,Category,Product, Product_Image,product_review,cart,checkout

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email','location','phone_no','user_image']

class OTPSerializer(serializers.ModelSerializer):
    class Meta:
        model = OTP
        fields = '__all__'

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id','name', 'description', 'logo']

    def validate(self, attrs):
        name = attrs.get('name')
        description = attrs.get('description')
        logo = attrs.get('logo')

        if not name:
            raise serializers.ValidationError("Company name cannot be empty")

        if not description:
            raise serializers.ValidationError("Company description cannot be empty")

        if not logo:
            raise serializers.ValidationError("Company logo is required")

        return attrs

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name','company']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_Image
        fields = ['id','image']

class ProductSerializer(serializers.ModelSerializer):
    
    images = ProductImageSerializer(many=True, read_only=True)
    company_name = serializers.CharField(source='company.name', read_only=True)
    
    class Meta:
        model = Product
        fields = ['id','company_name','company','category', 'name','price', 'size', 'color', 'images']
    
  

class productreviewserializer(serializers.ModelSerializer):
    class Meta:
        model=product_review
        fields='__all__'                 

class cartserializer(serializers.ModelSerializer):
    class Meta:
        model=cart
        fields='__all__'        

class checkoutserializer(serializers.ModelSerializer):
    class Meta:
        model=checkout
        fields='__all__'