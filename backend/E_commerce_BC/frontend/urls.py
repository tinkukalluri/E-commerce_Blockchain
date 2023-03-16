from django.contrib import admin
from django.urls import path, include

from . import views


urlpatterns = [
    path('' , views.index),
    path('login/' , views.index),
    path('cart/' , views.index),
    path('checkout/' , views.index),
    path('add_product/' , views.index),
    path('product_search/' , views.index),
    path('product/<str:productID>' , views.index),
    path('tin_wallet/' , views.index)
]