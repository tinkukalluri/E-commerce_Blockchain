from functools import reduce
from django.shortcuts import render , redirect
from rest_framework import generics, status
# Create your views here.from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response    
from api.models import ProductItem , Product , Users , Variation , VariationOption , ProductCategory , ShoppingCart , ShoppingCartItem , ProductConfig
from api.serializer import ProductItemSerializer , ProductSerializer ,VariationSerializer , VariationOptionSerializer, ProductConfigSerializer , ShoppingCartSerializer , ShoppingCartItemSerializer
import collections
from django.db.models import Q


def index(request):
    return HttpResponse('tinnu')