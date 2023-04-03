from functools import reduce
from django.shortcuts import render , redirect
from rest_framework import generics, status
# Create your views here.from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response    
from .models import ProductItem , Product , Users , Variation , VariationOption , ProductCategory , ShoppingCart , ShoppingCartItem , ProductConfig
from .serializer import ProductItemSerializer , ProductSerializer ,VariationSerializer , VariationOptionSerializer, ProductConfigSerializer , ShoppingCartSerializer , ShoppingCartItemSerializer

# _add serializers 

from .serializer import ProductSerializer_add , ProductItemSerializer_add , ProductConfigSerializer_add

from .serializer import ProductCategorySerializer
import collections
from django.db.models import Q

# utils.py
from .utils import DEBUG , base64_to_image , send_base64_to_firebase_storage

# Create your views here.

def loggedIn(request):
    # return True
    if request.session.get('user_id'):
        return True
    else:
        return False

def index(request, *args, **kwargs):
    return HttpResponse('hello world from api')

def getVariationFromCategoryID(categoryID , instance= False):
    variation_querySet = Variation.objects.filter(category_id=categoryID)
    result_=[]
    for row in variation_querySet:
        print(row)
        if instance:
            result_.append(row)
        else:
            result_.append(VariationSerializer(row).data)
    return result_

def getVariationValuesFromVariationID(variation_id):
    variationOption_querySet = VariationOption.objects.filter(variation_id = variation_id)
    result_ = []
    for row in variationOption_querySet:
        result_.append(VariationOptionSerializer(row).data)
    return result_

def getProductsWithKwargs( filter_by=False ,order_by=[] , offset=0  , limit=100 , all=False):
    products_=[]
    if all:
        querySet_items = Product.objects.all()
    elif len(order_by):
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


def getProductCategoryWithKwargs( filter_by=False ,order_by=[] , offset=0  , limit=100 , all=False , instance=False ):
    productCategory_=[]
    if all:
        querySet_items = ProductCategory.objects.all()
    elif len(order_by):
        if filter_by:
            querySet_items = ProductCategory.objects.filter(**filter_by).order_by(*order_by)[offset:limit]
        else:
            querySet_items = ProductCategory.objects.all().order_by(*order_by)[offset:limit]
    else:
        if filter_by:
            querySet_items = ProductCategory.objects.filter(**filter_by)[offset:limit]
        else:
            querySet_items = ProductCategory.objects.all()[offset:limit]
    print(len(querySet_items))
    for row in querySet_items:
        if instance:
            temp_Product=row
            productCategory_.append(temp_Product)
        else:
            temp_Product = dict(ProductCategorySerializer(row).data)
            productCategory_.append(temp_Product)
    print("productCategories")
    print(productCategory_)
    return productCategory_



def getProductItemsWithKwargs( filter_by=False ,order_by=[] , offset=0  , limit=10000 , instance =False):
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
        if instance:
            temp_ProductItem = row
        else:
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
            productConfig_ = getProductItemsWithKwargs( filter_by={
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
    


class getProductCategory(APIView):
    def get(self , request):
        # try:
            product_categories = getProductCategoryWithKwargs()
            return Response({
                'status':True, 
                "product_category": product_categories
            } , status= status.HTTP_200_OK)
        # except:
            return Response({
                "status":False,
                "oops" : "looks like we have problem fetching product categories"
            })
        

# url- empty_cart
class EmptyCart(APIView):
    def get(self, request):
        user_id = self.request.session["user_id"]
        shoppingCart = getShoppingCartWithKwargs(filter_by={
            "user_id":int(user_id)
        }  , order_by=['-id'])
        if len(shoppingCart):
            shoppingCartItems = getShoppingCartItemWithKwargs(filter_by={
                "cart_id" : int(shoppingCart[0]['id'])
            })
            if len(shoppingCartItems):
                for shoppingcartitem in shoppingCartItems:
                    temp_shoppingCartInstance = ShoppingCartItem.objects.get(
                        id=shoppingcartitem['id']
                    )
                    temp_shoppingCartInstance.delete()
            else:
                return Response({
                    "status": False , 
                    "oops": "no items to delete in cart id"
                } , status= status.HTTP_202_ACCEPTED)
        else:
            return Response({
                "status": False ,
                "oops":"looks like there is no cart"
            } , status=status.HTTP_202_ACCEPTED)
        
        return Response({
            "status": True 
        } , status=status.HTTP_200_OK)
        

# payload

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
        product_config=[]
        for variation in variation_rows:
            variation_options= getVariationValuesFromVariationID(variation["id"])
            variation["variation_options"]=[]
            for variation_option in variation_options:
                variation["variation_options"].append(variation_option)
            variations.append(variation)
        
        # adding variation_options
        for productItem in product_items['productItem']:
            variation_options = []
            productItemId = productItem.get('id')
            product_configs = getProductConfigWithKwargs(filter_by={
                "product_item_id": productItemId
            })
            print(product_configs)
            for product_config in product_configs:
                variation_options.append(product_config.get('variation_option'))
            productItem['variation_options'] = variation_options


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
# payload:
{
    "quantity": 1,
    "size": {
        "val": "xs",
        "variation_id": 2,
        "variationOpt_id": 6
    },
    "product_id": 7,
    "selected_product": {
        "id": 12,
        "product_id": 7,
        "SKU": "xs-pants",
        "qty_in_stock": 19,
        "product_image": "http://cdn.shopify.com/s/files/1/0053/5350/4881/products/Steel-grey-everyday-pant2.jpg?v=1673092119",
        "prize": 333,
        # "IPFS_hash": null,
        "img_url": "http://cdn.shopify.com/s/files/1/0053/5350/4881/products/Steel-grey-everyday-pant2.jpg?v=1673092119",
        "added_on": "2023-03-10T19:36:02Z",
        "variation_options": [
            6
        ]
    }
}
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
            }  , order_by=['-id'])
            cart_id = 0
            if(len(shoppingCart)):
                cart_id=shoppingCart[len(shoppingCart)-1]['id']
            else:
                cartInstance = ShoppingCart(user_id=int(user_id))
                cartInstance.save()
                cart_id=cartInstance.id
            productItem_querySet = getProductItemsWithKwargs(filter_by={
                'product_id':product_id
            })
            potential_product=[]

            if(post_data['selected_product']):
                print("productItem selected from post_data['selected_product']")
                potential_product=[post_data['selected_product']["id"]]
            else:
                productItem_ids = [productItem['id'] for productItem in productItem_querySet]
                del post_data['quantity']
                del post_data['product_id']
                print(post_data)
                print(productItem_ids)
                temp_list=[]
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
                    "status" : True,
                    "product_item":potential_product[0],
                    # "variation": variation
                    } , status=status.HTTP_200_OK)
            elif len(potential_product)>1:
                return Response({
                    "status" : False,
                    'oops':"found more than one productitem satisfing the variation in productConfig tabe"
                } , status = status.HTTP_400_BAD_REQUEST)
            else:
                return Response({
                    "status" : False,
                    'oops':"couldn't findout the productitem variation in productConfig tabe"
                } , status = status.HTTP_400_BAD_REQUEST)
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
        user_id = self.request.session.get('user_id')
        if not user_id:
            return Response({
                "status": False,
                'oops':"looks like you have not signed in"
            }  , status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)
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



# response
{
    # "status": true,
    "variations": [
        {
            "id": 1,
            "category_id": 1,
            "name": "size",
            "variation_options": [
                {
                    "id": 1,
                    "variation_id": 1,
                    "value": "xs"
                },
                {
                    "id": 2,
                    "variation_id": 1,
                    "value": "s"
                },
                {
                    "id": 3,
                    "variation_id": 1,
                    "value": "m"
                },
                {
                    "id": 4,
                    "variation_id": 1,
                    "value": "l"
                },
                {
                    "id": 5,
                    "variation_id": 1,
                    "value": "xl"
                }
            ]
        }
    ]
}
class getVariations(APIView):
    def get(self , request):
        get_data = request.GET
        print(get_data)
        category_id = get_data['category_id']
        variation_rows = getVariationFromCategoryID(int(category_id))
        variations= []
        for variation in variation_rows:
            variation_options= getVariationValuesFromVariationID(variation["id"])
            variation["variation_options"]=[]
            for variation_option in variation_options:
                variation["variation_options"].append(variation_option)
            variations.append(variation)
        return Response({
            "status":True,
            "variations":variations
        } , status = status.HTTP_200_OK)
    

        
class getVariationValue(APIView):
    def get(self , request):
        get_data = request.GET
        print(get_data)
        variation_id = get_data['variation_id']
        variation_options = getVariationValuesFromVariationID(variation_id)
        return Response({
            "status":True,
            "variation_options":variation_options
        } , status = status.HTTP_200_OK)
    

def getVariationOptionsWithKwargs( filter_by=False ,order_by=[] , offset=0  , limit=100 , all=False , instance =False):
    variation_options_=[]
    if all:
        querySet_items = VariationOption.objects.all()
    elif len(order_by):
        if filter_by:
            querySet_items = VariationOption.objects.filter(**filter_by).order_by(*order_by)[offset:limit]
        else:
            querySet_items = VariationOption.objects.all().order_by(*order_by)[offset:limit]
    else:
        if filter_by:
            querySet_items = VariationOption.objects.filter(**filter_by)[offset:limit]
        else:
            querySet_items = VariationOption.objects.all()[offset:limit]
    print(len(querySet_items))
    for row in querySet_items:
        if instance:
            temp_VariationOption = row
        else:
            temp_VariationOption = dict(VariationOptionSerializer(row).data)
        variation_options_.append(temp_VariationOption)
    print(variation_options_)
    return variation_options_
        
        

# url = 'api/add_products'
# payload:
{
    "product_category": "1",
    "product": {
        "product_name": "jeans",
        "product_desc": "torn jeans for women Calvin kein",
        "product_img_base64": "https://i.pinimg.com/736x/ab/fc/ca/abfcca2493de4a22cea0fdc4b61e3965.jpg"
    },
    "product_items": [
        {
            "sku": "women-jean-xs",
            "qty": "3",
            "image_base64": "https://i.pinimg.com/736x/ab/fc/ca/abfcca2493de4a22cea0fdc4b61e3965.jpg",
            "price": "2",
            "variations_": [
                {
                    "variation_name": "1",
                    "variation_val": "1"
                }
            ]
        },
        {
            "sku": "women-jean-s",
            "qty": "6",
            "image_base64": "https://i.pinimg.com/736x/ab/fc/ca/abfcca2493de4a22cea0fdc4b61e3965.jpg",
            "price": "4",
            "variations_": [
                {
                    "variation_name": "1",
                    "variation_val": "2"
                }
            ]
        },
        {
            "sku": "women-jean-m",
            "qty": "9",
            "image_base64": "https://i.pinimg.com/736x/ab/fc/ca/abfcca2493de4a22cea0fdc4b61e3965.jpg",
            "price": "6",
            "variations_": [
                {
                    "variation_name": "1",
                    "variation_val": "3"
                }
            ]
        },
        {
            "sku": "women-jean-l",
            "qty": "12",
            "image_base64": "https://i.pinimg.com/736x/ab/fc/ca/abfcca2493de4a22cea0fdc4b61e3965.jpg",
            "price": "8",
            "variations_": [
                {
                    "variation_name": "1",
                    "variation_val": "4"
                }
            ]
        },
        {
            "sku": "women-jean-xl",
            "qty": "15",
            "image_base64": "https://i.pinimg.com/736x/ab/fc/ca/abfcca2493de4a22cea0fdc4b61e3965.jpg",
            "price": "10",
            "variations_": [
                {
                    "variation_name": "1",
                    "variation_val": "5"
                }
            ]
        }
    ]
}

class AddProductItem(APIView):
    def post(self , request):
        print('---------------------------add-product-item-start--------------------------------------')
        post_data = request.data
        print(post_data)
        all_good_variable_check = True
        product_cat_id = int(post_data['product_category'])
        productCategoryInstance  = getProductCategoryWithKwargs(filter_by={
            'id' : int(product_cat_id)
        } , instance=True)[0]
        product_name = post_data['product']['product_name']
        product_desc = post_data['product']['product_desc']
        product_img_base64= post_data['product']['product_img_base64']
        # uploading file to firebase storage
        product_img_base64 = send_base64_to_firebase_storage(product_img_base64)
        print('=============================product-image====================')
        print(product_img_base64) # this will now hold the link to the image hosted in firebase
        # ('category_id' , 'name' , 'description', 'product_image' )
        ProductSerializerInstance = ProductSerializer_add(data={"name" : product_name ,'description':product_desc  , "product_image":product_img_base64 ,  'category_id' : product_cat_id})
        # ('product_id' , 'SKU' , 'qty_in_stock' , 'product_image' , 'prize' , 'IPFS_hash' ,'img_url')
        
        if ProductSerializerInstance.is_valid():
            print(dict(ProductSerializerInstance.data))
            productInstance = Product(category_id = productCategoryInstance,
                                        name = ProductSerializerInstance.data.get('name'),
                                        description = ProductSerializerInstance.data.get('description'),
                                        product_image = ProductSerializerInstance.data.get('product_image')
                                        )
            try:
                productInstance.save()
                all_good_variable_check= all_good_variable_check and True
            except:
                print('something went wrong adding product to the database')
                all_good_variable_check= all_good_variable_check and False
                return Response({
                    "status":False , 
                    "oops" : "something went wrong adding product to the database"
                } , status = status.HTTP_200_OK)
            print(productInstance)
            for productItem_ in post_data['product_items']:
                productItemSerializerInstance = ProductItemSerializer_add(data={
                'product_id': productInstance.id,
                'SKU' : productItem_['sku'],
                'qty_in_stock' :int(productItem_['qty']) ,
                'product_image':send_base64_to_firebase_storage(productItem_['image_base64']) or 'https://storage.googleapis.com/ecommerce-blockchain-1fb3d.appspot.com/6e4db12a-8a3c-45f3-9210-fb3a6faaaf49',
                'IPFS_hash': productItem_.get('IPFS_hash'),
                'img_url' : productItem_.get('img_url'),
                'prize' : int(productItem_['price']),
                })
                
                product_variation_option_ids = [int(productItem_['variations_'][i]['variation_val']) for i in range(len(productItem_['variations_'])) ]
                # each productItem can have more than one variation so we are looking through the variations and adding them to productConfig file
                for product_variation in product_variation_option_ids:
                    productVariationInstance = getVariationOptionsWithKwargs(filter_by={
                        "id":product_variation
                    }  , instance=True)
                    if len(productVariationInstance):
                        all_good_variable_check= all_good_variable_check and True
                        productVariationInstance = productVariationInstance[0]
                        pass
                    else:
                        all_good_variable_check= all_good_variable_check and False
                        return Response({
                            "status":False , 
                            "oops": "somethings wrong with product variant option"
                        })
                    if productItemSerializerInstance.is_valid():
                        print({**productItemSerializerInstance.data , 'product_id': productInstance})
                        productItemInstance = ProductItem(**{**productItemSerializerInstance.data , 'product_id': productInstance})
                        try:
                            productItemInstance.save()
                            all_good_variable_check= all_good_variable_check and True
                        except:
                            all_good_variable_check= all_good_variable_check and False
                            print('something went wrong in adding productItem instance')
                            return Response({
                                "status":False , 
                                "oops": "something went wrong in adding productItem instance"
                            } , status = status.HTTP_200_OK)
                        # now we will save in productConfig table both productItem and variation option
                        productConfigSerializerInstance = ProductConfigSerializer_add(data={
                            'product_item_id': productItemInstance.id , 
                            'variation_option' : productVariationInstance.id
                        })
                        
                        if productConfigSerializerInstance.is_valid():
                            all_good_variable_check= all_good_variable_check and True
                            productConfigInstance = ProductConfig(product_item_id = productItemInstance , variation_option = productVariationInstance)
                            try:
                                productConfigInstance.save()
                                print('-------------------------------------productConfig-----------------------------')
                                print(ProductConfigSerializer(productConfigInstance).data)
                                all_good_variable_check= all_good_variable_check and True
                            except:
                                all_good_variable_check= all_good_variable_check and False
                                print('something went wrong in adding productConfig instance')
                                return Response({
                                    "status":False , 
                                    "oops": "something went wrong in adding productConfig instance"
                                } , status = status.HTTP_200_OK)
                        else:
                            all_good_variable_check= all_good_variable_check and False
                            return Response({
                                "status":False ,
                                "oops":"looks like something went wrong with productConfigSerializerInstance.isValid() "
                            })
                    else:
                        all_good_variable_check= all_good_variable_check and False
                        return Response({
                            "status":False , 
                            "oops": "something went wrong in productItemSerializerInstance.is_valid()"
                        } , status=status.HTTP_404_NOT_FOUND)
                        
        else:
            all_good_variable_check= all_good_variable_check and False
            print("ProductSerializerInstance.isValid() failed")
            return Response({
                "status":False , 
                "oops" : "ProductSerializerInstance.isValid() failed"
            })

        print('---------------------------add-product-item-end--------------------------------------')
        if all_good_variable_check:
            return Response({
                'status': True ,
            })
        else:
            return Response({
                "status":False ,
                "oops": "looks like something went wrong with the entire thing"
            })
        
        
        
        
        
        
        
        



