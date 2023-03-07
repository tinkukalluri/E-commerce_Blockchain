from django.shortcuts import render , redirect
from rest_framework import generics, status
# Create your views here.from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response    
from .models import ProductItem , Product
from .serializer import ProductItemSerializer , ProductSerializer;

# Create your views here.

def index(request, *args, **kwargs):
    return HttpResponse('hello world from api')


class getNewProducts(APIView):
    def get(self, request, format=None):
        offset = int(request.GET.get('offset'))
        limit = int(request.GET.get('limit'))
        querySet = ProductItem.objects.all().order_by('-added_on')[offset:limit]
        products_list= []
        for row in querySet:
            serializer_data = ProductItemSerializer(row)
            products_list.append(serializer_data.data)
        return Response(products_list,status=status.HTTP_200_OK)


