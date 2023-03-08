from django.contrib import admin
from django.urls import path, include

from . import views


urlpatterns = [
    path('get_new_products' , views.getNewProducts.as_view()),
    path('loginwithgoogle' , views.LoginWithGoogle.as_view()),
    path('authenticate' , views.Authenticate.as_view())
]