from django.contrib import admin
from django.urls import path, include

from . import views


urlpatterns = [
    path('get_new_products' , views.getNewProducts.as_view()),
    path('loginwithgoogle' , views.LoginWithGoogle.as_view()),
    path('authenticate' , views.Authenticate.as_view()),
    path('logout' , views.Logout.as_view()),
    path('product_search' , views.ProductSearch.as_view()),
    path('product_detials' , views.getProductDetails.as_view())
]