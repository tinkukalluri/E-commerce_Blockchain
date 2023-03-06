from django.contrib import admin
from django.urls import path, include

from . import views


urlpatterns = [
    path('' , views.index),
    path('home/' , views.index),
    path('firebase/' , views.index)
]