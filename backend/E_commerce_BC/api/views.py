from functools import reduce
from django.shortcuts import render , redirect
from rest_framework import generics, status
# Create your views here.from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response    
from .models import ProductItem , Product , Users , Variation , VariationOption , ProductCategory , ShoppingCart , ShoppingCartItem , ProductConfig
from .serializer import ProductItemSerializer , ProductSerializer ,VariationSerializer , VariationOptionSerializer, ProductConfigSerializer , ShoppingCartSerializer , ShoppingCartItemSerializer
import collections
from django.db.models import Q
from .utils import DEBUG

# Create your views here.

def index(request, *args, **kwargs):
    return HttpResponse('hello world from api')

def getProductsWithKwargs( filter_by=False ,order_by=[] , offset=0  , limit=100):
    products_=[]
    if len(order_by):
        if filter_by:
            querySet_items = Product.objects.filter(**filter_by).order_by(*order_by)[offset:limit]
        else:
            querySet_items = Product.objects.all().order_by(*order_by)[offset:limit]
    else:
        if filter_by:
            querySet_items = Product.objects.filter(**filter_by)[offset:limit]
        else:
            querySet_items = Product.objects.all()[offset:limit]
    print(len(querySet_items))
    for row in querySet_items:
        temp_Product = dict(ProductSerializer(row).data)
        products_.append(temp_Product)
    print(products_)
    return products_

def getProductItemsWithKwargs( filter_by=False ,order_by=[] , offset=0  , limit=10000):
    print("getProductItemsWithKwargs")
    print(filter_by , order_by , offset , limit)
    productConfig_=[]
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
        temp_ProductItem = dict(ProductItemSerializer(row).data)
        productConfig_.append(temp_ProductItem)
    print(productConfig_)
    return productConfig_


def getProductsWithSimilarNames(query_list , offset=0 , limit = 100):
    products_=[]
    # ob_list = ProductItem.objects.get(reduce(lambda x, y: x | y, [Q(name__contains=word) for word in query_list]))
    querySet_product = Product.objects.filter(reduce(lambda x, y: x | y, [Q(name__contains=word.lower()) | Q(description__contains=word.lower()) for word in query_list]))
    for row in querySet_product:
        temp_Product = ProductSerializer(row).data
        products_.append(temp_Product)
    print(products_)
    return products_
    
def getProductAndProductItems(product_id_list):
    result_= []
    for id in product_id_list:
        products = getProductsWithKwargs(filter_by={
            "id": id
        })
        for product in products:
            temp={
                "product": product,
                "productItem":[]
            }
            productItems = getProductItemsWithKwargs(filter_by={
                "product_id":product['id']
            } , order_by=['-added_on'])
            for productItem in productItems:
                temp['productItem'].append(productItem)
            result_.append(temp)
    return result_

def getProductAndProductItemsWithProductItem(productItem_id_list):
    result_= []
    for id in productItem_id_list:
        products = getProductItemsWithKwargs(filter_by={
            "id": id
        })
        for productItem in products:
            temp={
                "productItem": productItem,
                "product": getProductsWithKwargs(filter_by={
                "id":productItem['product_id']
            } , order_by=['-added_on'])[0]
            }
            result_.append(temp)
    return result_
        



class getNewProducts(APIView):
    def get(self, request, format=None):
        offset = int(request.GET.get('offset'))-1 if request.GET.get('offset') else 0
        limit = int(request.GET.get('limit')) if request.GET.get('limit') else 10
        products_ = getProductsWithKwargs(offset=offset, limit=limit , order_by=['-added_on'])
        for product in products_:  
            min_prize=float('inf')
            productConfig_ = getProductItemsWithKwargs(offset=1 , limit=100 , filter_by={
                "product_id":product["id"]
            })
            print(productConfig_)
            for productItem in productConfig_:
                min_prize= min(min_prize , int(productItem['prize']))
            if min_prize==float('inf'):
                min_prize=0 
            product['min_prize'] = min_prize
        print('for loop exit')
        return Response(products_,status=status.HTTP_200_OK)

def getQueryWords(value):
    words = value.split(' ')
    words = [word.strip() for word in words]
    print('words' , words)
    return words

class ProductSearch(APIView):
    def get(self , request , format=None):
        query_list= getQueryWords(request.GET.get('q'))
        offset = int(request.GET.get('offset'))-1 if request.GET.get('offset') else 0
        limit = int(request.GET.get('limit')) if request.GET.get('limit') else 10
        print(query_list)
        products_ = getProductsWithSimilarNames(query_list , offset=offset , limit=limit)
        for product in products_:  
            min_prize=float('inf')
            productConfig_ = getProductItemsWithKwargs(offset=1 , limit=100 , filter_by={
                "product_id":product["id"]
            })
            print(productConfig_)
            for productItem in productConfig_:
                min_prize= min(min_prize , int(productItem['prize']))
            if min_prize==float('inf'):
                min_prize=0 
            product['min_prize'] = min_prize
        print('for loop exit')
        return Response(products_ , status=status.HTTP_200_OK)
    
def getVariationFromCategoryID(categoryID):
    variation_querySet = Variation.objects.filter(category_id=categoryID)
    result_=[]
    for row in variation_querySet:
        print(row)
        result_.append(VariationSerializer(row).data)
    return result_

def getVariationValuesFromVariationID(variation_id):
    variationOption_querySet = VariationOption.objects.filter(variation_id = variation_id)
    result_ = []
    for row in variationOption_querySet:
        result_.append(VariationOptionSerializer(row).data)
    return result_

class getProductDetails(APIView):
    def get(self , request):
        product_id = request.GET.get('pID')
        product = Product.objects.filter(id = product_id)[0]
        product_items = getProductAndProductItems([int(product_id)])[0]
        categoryID = product.category_id.id
        product_category = ProductCategory.objects.filter(id = categoryID)[0]
        print('category id: ' , categoryID)
        variation_rows = getVariationFromCategoryID(int(categoryID))
        result_=[]
        print(variation_rows)
        variations=[]
        for variation in variation_rows:
            variation_options= getVariationValuesFromVariationID(variation["id"])
            variation["variation_options"]=[]
            for variation_option in variation_options:
                variation["variation_options"].append(variation_option)
            variations.append(variation)
        result_.append({"variation":variations,
                        "product" : product_items['product'],
                        "productItem" : product_items['productItem'],
                        "category": product_category.category_name
                        })
        print(result_)
        return Response(result_ , status=status.HTTP_200_OK)


def getProductIdsFromProductConfig(productItem_ids , **kwargs):
    for variation in kwargs.values():
        variation_id = variation['variation_id']
        variationOpt_id = variation['variationOpt_id']


def getProductConfigWithKwargs( filter_by=False ,order_by=[]):
    print("getProductConfigWithKwargs")
    print(filter_by , order_by)
    productConfig_=[]
    if len(order_by):
        if filter_by:
            querySet_items = ProductConfig.objects.filter(**filter_by).order_by(*order_by)
        else:
            querySet_items = ProductConfig.objects.all().order_by(*order_by)
    else:
        if filter_by:
            querySet_items = ProductConfig.objects.filter(**filter_by)
        else:
            querySet_items = ProductConfig.objects.all()
    print(len(querySet_items))
    for row in querySet_items:
        temp_ProductItem = dict(ProductConfigSerializer(row).data)
        productConfig_.append(temp_ProductItem)
    print(productConfig_)
    return productConfig_


# color
# : 
# {val: 'olive green', variation_id: 3, variationOpt_id: 15}
# memory
# : 
# {val: '256', variation_id: 4, variationOpt_id: 18}
# product_id
# : 
# 8
# quantity  
# : 
# "4"

# url - remove_from_cart
# JSON Response
class RemoveFromCart(APIView):
    def post(self , request):
        post_data = request.data
        shoppingCartItemInstance =   ShoppingCartItem.objects.filter(id = post_data['cart_item_id'])
        if shoppingCartItemInstance.exists():
            shoppingCartItemInstance=shoppingCartItemInstance[0]
            shoppingCartItemInstance.delete()
            return Response(
                {
                "status" : True
                } , status=status.HTTP_200_OK
            )
        else:
            return Response({
                "status" : "Item doesnt exists in cart"
            } , status=status.HTTP)
            


# url - add_to_cart
class AddToCart(APIView):
    def add_to_cart(productItemID , cartID , qty):
        shoppingCartInstance = ShoppingCart.objects.filter(id= cartID)[0]
        productItemInstance = ProductItem.objects.get(id=productItemID)
        productItemObj = ShoppingCartItem(cart_id=shoppingCartInstance , product_item_id = productItemInstance , qty = qty)
        productItemObj.save()


    def post(self, request):
        if request.method == 'POST':
            post_data= request.data
            print(post_data)
            qty =post_data.get('quantity')
            product_id = int(post_data.get('product_id'))
            user_id = self.request.session["user_id"]
            shoppingCart = getShoppingCartWithKwargs(filter_by={
                "user_id":int(user_id)
            } )
            cart_id = 0
            if(len(shoppingCart)):
                cart_id=shoppingCart[0]['id']
            productItem_querySet = getProductItemsWithKwargs(filter_by={
                'product_id':product_id
            })
            productItem_ids = [productItem['id'] for productItem in productItem_querySet]
            del post_data['quantity']
            del post_data['product_id']
            print(post_data)
            print(productItem_ids)
            temp_list=[]
            potential_product=[]
            variation=[]
            # this entire code is for finding the product_item_id(which is inside potential_product) using variations
            for key in post_data.keys():
                variation_id = post_data[key]['variation_id']
                variationOpt_id = post_data[key]['variationOpt_id']
                variationOpt_value = post_data[key]['val']
                variation.append({
                    'variation_name':str(key),
                    'variation_id' : int(variation_id),
                    'variationOpt_id': int(variationOpt_id),
                    'variationOpt_value' : str(variationOpt_value)      
                    })
                temp_list=getProductConfigWithKwargs(filter_by={
                    'product_item_id__in': productItem_ids ,
                    'variation_option': variationOpt_id
                })
                temp_list = [prodConfig['product_item_id'] for prodConfig in temp_list]
                print('temp_list' , temp_list)
                if not len(potential_product):
                    potential_product=temp_list
                else:
                    potential_product = list(set(potential_product) & set(temp_list))
                print('potential product')
                print(potential_product)
            # finished finding the product_item_id in potential_product[0]
            
            if(len(potential_product)==1):
                AddToCart.add_to_cart(potential_product[0] , cart_id , qty)
                return Response({
                    "product_item":potential_product[0],
                    "variation": variation
                    } , status=status.HTTP_200_OK)
            else:
                return Response({
                    'oops':"couldn't findout the productitem variation in productConfig tabe"
                })
        else:
            return Response({
                "oops":"something went wrong with the server"
            } , status=status.HTTP_204_NO_CONTENT)
    
def getShoppingCartWithKwargs( filter_by=False ,order_by=[]):
    print("getProductConfigWithKwargs")
    print(filter_by , order_by)
    shoppingCart_=[]
    if len(order_by):
        if filter_by:
            querySet_items = ShoppingCart.objects.filter(**filter_by).order_by(*order_by)
        else:
            querySet_items = ShoppingCart.objects.all().order_by(*order_by)
    else:
        if filter_by:
            querySet_items = ShoppingCart.objects.filter(**filter_by)
        else:
            querySet_items = ShoppingCart.objects.all()
    print(len(querySet_items))
    for row in querySet_items:
        temp_ProductItem = dict(ShoppingCartSerializer(row).data)
        shoppingCart_.append(temp_ProductItem)
    print(shoppingCart_)
    return shoppingCart_


def getShoppingCartItemWithKwargs( filter_by=False ,order_by=[]):
    print("getProductConfigWithKwargs")
    print(filter_by , order_by)
    ShoppingCartItem_=[]
    if len(order_by):
        if filter_by:
            querySet_items = ShoppingCartItem.objects.filter(**filter_by).order_by(*order_by)
        else:
            querySet_items = ShoppingCartItem.objects.all().order_by(*order_by)
    else:
        if filter_by:
            querySet_items = ShoppingCartItem.objects.filter(**filter_by)
        else:
            querySet_items = ShoppingCartItem.objects.all()
    print(len(querySet_items))
    for row in querySet_items:
        temp_ProductItem = dict(ShoppingCartItemSerializer(row).data)
        ShoppingCartItem_.append(temp_ProductItem)
    print(ShoppingCartItem_)
    return ShoppingCartItem_


# url - cart_products  
# JSON Response :
#     {
#     "shopping_cart_items": [
#         {
#             "id": 5,
#             "cart_id": 1,
#             "product_item_id": 12,
#             "qty": 1,
#             "added_on": "2023-03-16T14:23:34.199006Z",
#             "productItem": {
#                 "id": 12,
#                 "product_id": 7,
#                 "SKU": "xs-pants",
#                 "qty_in_stock": 19,
#                 "product_image": "http://cdn.shopify.com/s/files/1/0053/5350/4881/products/Steel-grey-everyday-pant2.jpg?v=1673092119",
#                 "prize": 333,
#                 "IPFS_hash": null,
#                 "img_url": "http://cdn.shopify.com/s/files/1/0053/5350/4881/products/Steel-grey-everyday-pant2.jpg?v=1673092119",
#                 "added_on": "2023-03-10T19:36:02Z"
#             },
#             "product": {
#                 "id": 7,
#                 "category_id": 2,
#                 "name": "cool pants",
#                 "description": "cools shirts",
#                 "product_image": "https://m.media-amazon.com/images/I/71DBklVte9L._UX569_.jpg",
#                 "added_on": "2023-03-10T19:35:20Z"
#             }
#         }
#     ],
#     "cart_id": 1
# }
class CartProducts(APIView):
    def get(self , request):
        user_id = self.request.session["user_id"]
        shoppingCart = getShoppingCartWithKwargs(filter_by={
            "user_id":int(user_id)
        } )
        cart_id = 0
        if(len(shoppingCart)):
            cart_id=shoppingCart[0]['id']
        else:
            return Response(
                {
                    'oops': 'cannot find the shopping cart of the user'
                } , status=status.HTTP_204_NO_CONTENT
            )
        shopping_cart_items = getShoppingCartItemWithKwargs(
            filter_by={
                "cart_id":int(cart_id)
            } , order_by=['-added_on']
        )
        # shopping_cart_productItems_ids = [cartItem['product_item_id'] for cartItem in shopping_cart_items]
        for index , cartItem in enumerate(shopping_cart_items):
            shopping_cart_item= getProductAndProductItemsWithProductItem([cartItem['product_item_id']])[0]
            shopping_cart_items[index]={
                **cartItem,
                **shopping_cart_item
            }
        return Response(
            {
                'shopping_cart_items':shopping_cart_items , 
                'cart_id': cart_id
            }
            , status=status.HTTP_200_OK)
        
        
        
        


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
        post_data=dict(request.data)
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
    
def loggedIn(request):
    # return True
    if request.session.get('user_id'):
        return True
    else:
        return False

class AddProductItem(APIView):
    pass


            
    


