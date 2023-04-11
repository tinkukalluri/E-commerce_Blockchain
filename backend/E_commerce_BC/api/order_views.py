from functools import reduce
from django.shortcuts import render , redirect
from rest_framework import generics, status
# Create your views here.from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response    
from .models import ProductItem , Product , Users , Variation , VariationOption , ProductCategory , ShoppingCart , ShoppingCartItem , ProductConfig , ShopOrder , PaymentStatus , OrderStatus , OrderLine
from .serializer import ProductItemSerializer , ProductSerializer ,VariationSerializer , VariationOptionSerializer, ProductConfigSerializer , ShoppingCartSerializer , ShoppingCartItemSerializer , ShopOrderSerializer_add , ShopOrderSerializer , OrderLineSeializer
import collections
from django.db.models import Q


from .views import loggedIn
from .views import getProductAndProductItemsWithProductItem

# debug
from .utils import DEBUG

import uuid 

#  this views will handle placing the order in     

# ShopOrder : user_id , payment_status , shipping_address_id , order_total , order_status

#  OrderLine : product_item_id , order_id , qty , price 

# url - create_order
class MakeOrder(APIView):
    def post(self ,  request):
        post_data = request.data
        print(post_data)
        product_items = post_data['shopping_cart_items']
        # ------------------shoping order--------------------------------
        user_id = self.request.session["user_id"]
        userInstance = Users.objects.get(id=user_id)
        payment_status = PaymentStatus.objects.get(id=2)
        order_status = OrderStatus.objects.get(id=5)
        # shipping_address_id = 
        # order_total = post_data['cart_total']
        order_total= 0
        for product_item in product_items:
            product_item_qty = product_item['qty']
            product_item_total_prize = product_item['productItem']['prize'] * product_item_qty
            order_total+=product_item_total_prize
        
        try:
            shopingOrderInstance = ShopOrder(user_id = userInstance , payment_status = payment_status  , order_total = order_total , order_status = order_status)
            shopingOrderInstance.save()
        except:
            return Response({
                "status":False ,
                "oops":"something went wrong adding order in ShopOrder table"
            }, status=status.HTTP_404_NOT_FOUND)
        
        # -----------------order-line------------------------------------
# this is the json data coming from the client(payload)
#         {
#     "shopping_cart_items": [
#         {
#             "id": 10,
#             "cart_id": 1,
#             "product_item_id": 12,
#             "qty": 1,
#             "added_on": "2023-03-21T12:02:40.530091Z",
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
#     "cart_id": 1, 
#     "cart_total": 20 , 
#
# }
        try:
            for product_item in product_items:
                print('--------------------------------------------------------------------------')
                print(product_item)
                product_item_id = product_item['productItem']['id']
                product_item_qty = product_item['qty']
                product_item_total_prize = product_item['productItem']['prize'] * product_item_qty
                productItemInstance  = ProductItem.objects.get(id=product_item_id)
                temp_productItemInstance  = OrderLine(product_item_id = productItemInstance ,order_id = shopingOrderInstance , qty = product_item_qty , price = product_item_total_prize)
                temp_productItemInstance.save()
        except:
            return Response({
                "status": False,
                "oops":"something went wrong adding productItems in the orderLine table"
            } , status=status.HTTP_404_NOT_FOUND)
        
        return Response({**post_data , "status":True ,"order_id": shopingOrderInstance.id, "payment_status":2 , "order_status": 5} , status = status.HTTP_200_OK)
        

def getOrdersWithKwargs( filter_by=False ,order_by=[] , offset=0  , limit=100):
    orders_=[]
    if len(order_by):
        if filter_by:
            querySet_items = ShopOrder.objects.filter(**filter_by).order_by(*order_by)[offset:limit]
        else:
            querySet_items = ShopOrder.objects.all().order_by(*order_by)[offset:limit]
    else:
        if filter_by:
            querySet_items = ShopOrder.objects.filter(**filter_by)[offset:limit]
        else:
            querySet_items = ShopOrder.objects.all()[offset:limit]
    print(len(querySet_items))
    for row in querySet_items:
        temp_Product = dict(ShopOrderSerializer(row).data)
        orders_.append(temp_Product)
    print("orders: " , end='')
    print(orders_)
    return orders_


def getorderLineWithKwargs( filter_by=False ,order_by=[] , offset=0  , limit=10000):  
    orderItemss_=[]
    if len(order_by):
        if filter_by:
            querySet_items = OrderLine.objects.filter(**filter_by).order_by(*order_by)[offset:limit]
        else:
            querySet_items = OrderLine.objects.all().order_by(*order_by)[offset:limit]
    else:
        if filter_by:
            querySet_items = OrderLine.objects.filter(**filter_by)[offset:limit]
        else:
            querySet_items = OrderLine.objects.all()[offset:limit]
    print(len(querySet_items))
    for row in querySet_items:
        temp_Product = dict(OrderLineSeializer(row).data)
        orderItemss_.append(temp_Product)
    print("orderItemss: " , end='')
    print(orderItemss_)
    return orderItemss_


class UserOrders(APIView):
    def get(self , request):
        if(loggedIn(request) or DEBUG):
            user_id = self.request.session.get('user_id')
            #user is logged in 
            user_orders = getOrdersWithKwargs(filter_by={
                'user_id': user_id
            } , order_by=['-order_date'])
            return Response({
                "orders": user_orders,
                'status':True
            })
        else:
            return Response({
                "oops":"User not logged in" , 
                "status": False
            } , status = status.HTTP_401_UNAUTHORIZED)
        

class UserOrderItems(APIView):
    def get(self, request):
        if(loggedIn(request) or DEBUG):
            user_id = self.request.session.get('user_id')
            get_data = request.GET
            print(get_data)
            order_id= get_data['order_id']
            #user is logged in 
            user_orders = getOrdersWithKwargs(filter_by={
                'id': order_id
            })
            if len(user_orders)==1:
                user_order = user_orders[0]
                if user_id ==user_order['user_id']:
                    orderItems = getorderLineWithKwargs(filter_by={
                        "order_id": order_id
                    })
                    for index , orderItem in enumerate(orderItems):
                        shopping_cart_item = getProductAndProductItemsWithProductItem([orderItem['product_item_id']])[0]
                        orderItems[index] = {
                            "order_item": orderItem , 
                            **shopping_cart_item
                        }
                    return Response({
                        "status": True,
                        "order_items": orderItems,
                        "order": user_order , 
                        "order_id": order_id
                    } , status= status.HTTP_200_OK)
                else:
                    return Response({
                        "status": False,
                        "oops": "looks like ur trying to views others orders , please login with correct credentals to view the order"
                    },  status = status.HTTP_401_UNAUTHORIZED)
            else:
                return Response({
                    "oops":"looks like there is no order with order_id:"+str(order_id),
                    'status':False
                } , status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({
                "oops":"User not logged in" , 
                "status": False
            } , status = status.HTTP_401_UNAUTHORIZED)


class UpdateTransactionHashShopOrder(APIView):
    def post(self, request):
        post_data = request.data
        tx_hash= post_data.get('tx_hash')
        order_id = post_data.get('order_id')
        print(tx_hash , order_id)
        try:
            ShopOrderInstance = ShopOrder.objects.get(id=order_id)
            ShopOrderInstance.transaction_hash = tx_hash
            ShopOrderInstance.save(update_fields=['transaction_hash'])
            return Response({
                "status":True,
                "tx_hash": tx_hash,
                "order_id": order_id
            })
        except:
            return Response({
                "status":False,
                "oops": "something went wrong updating transaction field"
            } , status = status.HTTP_304_NOT_MODIFIED)
        

