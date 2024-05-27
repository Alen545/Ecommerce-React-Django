from django.urls import path
from Cart import views
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
     path('register/',views.RegisterAPI,name='register'),
     path("verifyotp/<int:id>/",views.verify_otp,name='verifyotp'),
     path("password/<int:id>/",views.create_password,name='password'),
     path("login/",views.LoginAPI,name="login"),
     path('addcompany/',views.AddCompany,name='addcompany'),
     path('viewcompanies/',views.ViewCompanies,name='viewcompany'),
     path('Edit_Delete/<int:company_id>/',views.Edit_Delete,name="editdelete"),
     path('addcategory/',views.AddCategory,name="addcategory"),
     path('viewcategories/<int:company_id>/',views.ViewCategory,name="viewcategories"),
     path('editcategory/<int:category_id>/', views.edit_category),
     path('deletecategory/<int:category_id>/', views.delete_category),
     path('addproduct/',views.add_product,name='add_product'),
     path('viewproduct/<int:company_id>/', views.view_product, name='view_product'),
     path('deleteproduct/<int:product_id>/', views.delete_product, name='delete_product'),
     path('editproduct/<int:product_id>/', views.product_detail, name='product_detail'),
     path('userproductlist/',views.product_list,name="product_list") ,
     path('userproductdetails/<int:product_id>/', views.user_product_details, name='user_product_details'),  
     
     path('reviewadd/',views.Reviewadd,name='reviewadd'),
     path('review/<int:pk>/',views.Review,name="review"),
     path('reviewdelete/<int:pk>/',views.Reviewdelete,name='reviewdelete'),
     path('users/',views.user_list,name="users"),
     path('userlist/',views.Userlist,name='userlist'),
     path('userlistdelete/<int:pk>',views.Userlistdelete,name='userlistdelete'),
     path('cart/',views.Cart,name='cart'),
     path('cartvalues/',views.Cartvalues,name='cartvalues'),
     path('cartupdate/<int:pk>',views.Cartupdate,name='cartupdate'),
     path('checkout/',views.Checkout,name='checkout'),
     path('checkaddress/<int:pk>',views.Checkaddress,name='checkaddress'),
     path('orderlists/',views.Orderlists,name='orderlists'),
     path('getallorders/',views.Getallorders,name='getallorders'),
     path('user/<int:pk>/',views.user_data,name='user_data'),
     path('total_sales/', views.Total_Sales, name='total_sales'),
     path('get_review/',views.get_review,name='get_review')
     
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# if settings.DEBUG:
#    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)