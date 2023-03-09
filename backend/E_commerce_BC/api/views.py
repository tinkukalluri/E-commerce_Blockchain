from functools import reduce
from django.shortcuts import render , redirect
from rest_framework import generics, status
# Create your views here.from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response    
from .models import ProductItem , Product , Users
from .serializer import ProductItemSerializer , ProductSerializer;
import collections
from django.db.models import Q

# Create your views here.

def index(request, *args, **kwargs):
    return HttpResponse('hello world from api')

def getProductsWithKwargs( filter_by=False ,order_by=[] , offset=0  , limit=10):
    product_hash= collections.defaultdict(lambda : None)
    products_=[]
    if len(order_by):
        if filter_by:
            querySet_items = ProductItem.objects.filter(**filter_by).order_by(*order_by)[offset:limit]
        else:
            querySet_items = ProductItem.objects.all().order_by(*order_by)[offset:limit]
    else:
        if filter_by:
            querySet_items = ProductItem.objects.filter(**filter_by)[offset:limit]
        else:
            querySet_items = ProductItem.objects.all()[offset:limit]
    print(len(querySet_items))
    for row in querySet_items:
        temp_productItem = ProductItemSerializer(row).data
        productID= int(row.product_id.id)
        print('-------------productID-------------------')
        print(productID)
        print(type(productID))
        if(product_hash[productID]):
            temp_product = ProductSerializer(product_hash[productID]).data
        else:
            product_details = Product.objects.filter(id = productID)[0]
            product_hash[productID]=product_details
            print(product_details)
            print(type(product_details))
            temp_product = ProductSerializer(product_details).data
        #  we are doing this to avoid the id id , added_on-added_on coliision when peprforming dict spread operator
        temp_productItem['added_on_item']=temp_productItem['added_on']
        temp_productItem['product_image_item']=temp_productItem['product_image']
        temp_productItem['id_item']=temp_productItem['id']
        temp_product_= { **temp_productItem , **temp_product   }
        print(temp_product_['product_id'])
        products_.append(temp_product_)
        print(type(products_))
        print(products_)
    return products_


def getProductsWithSimilarNames(query_list):
    ob_list = ProductItem.objects.get(reduce(lambda x, y: x | y, [Q(name__contains=word) for word in query_list]))
    print(ob_list)
    

class getNewProducts(APIView):
    def get(self, request, format=None):
        offset = int(request.GET.get('offset'))-1 if request.GET.get('offset') else 0
        limit = int(request.GET.get('limit')) if request.GET.get('limit') else 10
        products_ = getProductsWithKwargs(offset=offset, limit=limit , order_by=['-added_on'])
        print('for loop exit')
        return Response(products_,status=status.HTTP_200_OK)

def getQueryWords(value):
  words = value.split(' ')
  words = [word.strip() for word in words]
  print('words' , words)
  return words

class SearchProduct(APIView):
    def get(self , request , format=None):
        query_list=
        ob_list = ProductItem.objects.filter(reduce(lambda x, y: x | y, [Q(name__contains=word) for word in query_list]))

    
    
    
    
class LoginWithGoogle(APIView):
    def post(self, request, format=None):
        post_data = dict(request.data)
        print(post_data)
        #print("type" , type(post_data))
        #print("post_data====" , post_data)
        # user.multiFactor.user.uid
        uid=post_data['authResult']['uid']
        accessToken=post_data['authResult']['accessToken']
        refreshToken=post_data['authResult']['refreshToken']
        photoURL=post_data['authResult']['photoURL']
        phoneNumber=post_data['authResult']['phoneNumber']
        providerId=post_data['authResult']['providerId']
        displayName=post_data['authResult']['displayName']
        email=post_data['authResult']['email']
        emailVerified=post_data['authResult']['emailVerified']
        #print(uid,accessToken , refreshToken)
        queryset=Users.objects.filter(google_uid=uid)
        if queryset.exists():
            self.user=queryset[0]
            self.request.session.create()       
            self.request.session["key"]=self.request.session.session_key
            self.request.session["user_id"]=self.user.id
            return Response({"result":True} , status=status.HTTP_200_OK)
            # return redirect('frontend:homepage')
        else:
            self.user=Users(google_uid=uid , email_uid=email , username=displayName , password="" , photoURL=photoURL)
            self.user.save()
            self.request.session.create()
            self.request.session["key"]=self.request.session.session_key
            self.request.session["user_id"]=self.user.id
            return Response({"result":True} , status=status.HTTP_200_OK )
            # return redirect('frontend:homepage')
            # return Response({"result":False} , status=status.HTTP_400_BAD_REQUEST)
            
class Authenticate(APIView):
    def post(self, request, format=None):
        post_data=dict(request.POST)
        print("post_data" , post_data)
        #print("from authenticate" , dict(self.request.session))
        if self.request.session.get('user_id')!= None:
        # if self.request.session.exists(self.request.session.get('user_id'):
            return Response({"result":self.request.session['user_id']} , status=status.HTTP_200_OK)
        else:
            return Response({"result":False} , status=status.HTTP_200_OK)
        
class Logout(APIView):
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            return Response({"status": True} , status=status.HTTP_200_OK)
        if "user_id" in self.request.session:
            s_id= self.request.session.pop("user_id" , None)
            return Response({"status": True} , status=status.HTTP_200_OK)
        return Response({"status": True} , status=status.HTTP_200_OK)


