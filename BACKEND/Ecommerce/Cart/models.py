from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone 


class User(AbstractUser):
    location = models.CharField(max_length=20)
    phone_no=models.BigIntegerField(null=True)
    user_image=models.ImageField(upload_to='profile_image/',null=True,blank=True)

class OTP(models.Model):
    otp_code=models.CharField(max_length=6)
    created_at=models.DateTimeField(default=timezone.now)
    user=models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)

class Company(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    logo = models.ImageField(upload_to='company_logos/', null=True, blank=True)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Product(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=255,null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    size = models.CharField(max_length=20)
    color = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.company.name} - {self.model.name} - {self.color}"

class Product_Image(models.Model):
    image=models.ImageField(upload_to='product_image/',null=True,blank=True)  
    product=models.ForeignKey(Product,related_name='images',on_delete=models.CASCADE,null=True,blank=True) 


class product_review(models.Model):
    review=models.CharField(max_length=100)
    rating=models.IntegerField(null=True,blank=True)
    user=models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)
    created_at = models.DateField(auto_now_add=True,null=True,blank=True)
    products_id=models.IntegerField(null=True,blank=True)
    
class cart(models.Model):
    proquantity = models.IntegerField(default=1,null=True,blank=True)
    product= models.ForeignKey(Product, on_delete=models.CASCADE,null=True,blank=True)
    productname=models.CharField(max_length=100,null=True,blank=True)
    productprice=models.IntegerField(null=True,blank=True)
    list_user=models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)

class checkout(models.Model):
    product_name=models.CharField(max_length=100)
    product_quantity=models.IntegerField()
    product_total=models.IntegerField()
    shipingaddress=models.CharField(max_length=200)
    user_id=models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)