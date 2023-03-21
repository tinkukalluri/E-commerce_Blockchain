from functools import reduce
from django.shortcuts import render , redirect
from rest_framework import generics, status
# Create your views here.from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response    
from .models import ProductItem , Product , Users , Variation , VariationOption , ProductCategory , ShoppingCart , ShoppingCartItem , ProductConfig , ShopOrder , PaymentStatus , OrderStatus , OrderLine
from .serializer import ProductItemSerializer , ProductSerializer ,VariationSerializer , VariationOptionSerializer, ProductConfigSerializer , ShoppingCartSerializer , ShoppingCartItemSerializer , ShopOrderSerializer_add
import collections
from django.db.models import Q
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
        order_id = shopingOrderInstance
        try:
            for product_item in product_items:
                product_item_id = product_item['productItem']['id']
                product_item_qty = product_item['qty']
                product_item_total_prize = product_item['productItem']['prize'] * product_item_qty
                productItemInstance  = ProductItem.objects.get(id=product_item_id)
                temp_productItemInstance  = OrderLine(product_item_id = productItemInstance ,order_id = order_id , qty = product_item_qty , price = product_item_total_prize)
                temp_productItemInstance.save()
        except:
            return Response({
                "status": False,
                "oops":"something went wrong adding productItems in the orderLine table"
            })
        
        return Response({**post_data , "status":True , "payment_status":2 , "order_status": 5} , status = status.HTTP_200_OK)
        
        
        