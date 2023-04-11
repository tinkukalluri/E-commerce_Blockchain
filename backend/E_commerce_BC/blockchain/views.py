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
import asyncio
import json
import os
from api import views as api_views
from api import order_views as api_order_views
from api import models as api_models
from .utils import TINTOKEN_path

from web3 import Web3

web3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))

# url- verify_payment
class VerifyPaymentRequest(APIView):
    def post(self, request):
        post_data = request.data
        # transaction_hash = post_data['transaction_hash']
        # transaction_hash = ''
        order_id = post_data['order_id']
        cur_directory = os.getcwd()
        # src\contracts\TinToken.json
        # C:\Users\sintin\Desktop\Major_project\e_commerce\react-box-master\client\src\contracts\TinToken.json
        print(cur_directory)
        contract = open(TINTOKEN_path)
        contract_dict = json.load(contract)
        network_id =  web3.net.version
        contract_address = contract_dict['networks'][network_id]['address']
        contract_abi = contract_dict['abi']
        contract = web3.eth.contract(address=contract_address, abi=contract_abi)
        # tx_receipt = web3.eth.get_transaction_receipt(transaction_hash)
        # events = contract.events.PaymentDone().process_receipt(tx_receipt)
        events = contract.events.PaymentDone().get_logs()
        print(events)
        order = api_order_views.getOrdersWithKwargs(filter_by={
            "id": order_id
        })
        if len(order)==0:
            return Response({
                "status": False , 
                "oops": "couldn't find order with the order_id:"+str(order_id)
            })
        order = order[0]

        order_line = api_order_views.getorderLineWithKwargs(filter_by={
            "order_id": order['id']
        })

        if len(order_line)==0:
            return Response({
                "status": False ,
                "oops": "no items in the order"
            })



        # (AttributeDict({'args': AttributeDict({'payer': '0xDFeb088754c16A2657ee3a78F702016eBB5d1C15', 'amount': 333, 'paymentId': 6614633839, 'orderId': 25, 'date': 1679494948}), 'event': 'PaymentDone', 'logIndex': 1, 'transactionIndex': 0, 'transactionHash': HexBytes('0xd3b5a4cd45f34901f9587bdd1cffd97ab149aaf8c4f3d2f58310ed5befdf2f13'), 'address': '0x0b3FD59B26Ce37DEd4FD48918098d879D539bA4c', 'blockHash': HexBytes('0x9da67d1a718ef49d7f8fe3ad856853a28921eeadf27cd0120d16d6b1a45361e0'), 'blockNumber': 23}),)
        ShopOrderInstance = api_models.ShopOrder.objects.get(id=order_id)
        for event in events:
            order_id_ = event.get('args').get('orderId')
            to_address = event.get('address')
            amount = event.get('args').get('amount')
            paymentId = event.get('args').get('paymentId')
            payer = event.get('args').get('payer')
            event_name = event.get('event')
            # HexBytes('0x5e580dcaffb3f119c7a07ca9db560b7e5e09fb8314ca52ea3ae129ddf7d1514b') ===> 0x5e580dcaffb3f119c7a07ca9db560b7e5e09fb8314ca52ea3ae129ddf7d1514b
            tx_hash = event.get('transactionHash').hex()
            if(order_id_ == order['id'] and to_address==contract_address and amount==order['order_total']):
                print('looks like genuine transaction goahead and verify')
                try:
                    ShopOrderInstance.transaction_hash = tx_hash
                    ShopOrderInstance.payment_status = api_models.PaymentStatus.objects.get(id=1)
                    ShopOrderInstance.save(update_fields=['transaction_hash' , 'payment_status'])
                    # transaction went through now lets decrement the qty of the productItem
                    for orderline in order_line:
                        productItemId = orderline['product_item_id']
                        qty_purchased = orderline['qty']
                        productItemInstance = api_views.getProductItemsWithKwargs(filter_by={
                            'id':int(productItemId)
                        } , instance=True)
                        if len(productItemInstance)==0:
                            return Response({
                                'status':False , 
                                'oops': 'looks like the productItem your looking for is not available in database'
                            })
                        productItemInstance = productItemInstance[0]
                        productItemInstance.qty_in_stock=productItemInstance.qty_in_stock-int(qty_purchased)
                        
                        try:
                            productItemInstance.save(update_fields=['qty_in_stock'])
                            print('---------------new-product-quantity----------------')
                            print("productItem" , productItemInstance.id)
                            print('qty_in_stock' , productItemInstance.qty_in_stock)
                        except:
                            return Response({'status':False , 'oops' : "looks like something went wrong with decrementing productItem quantity"}
                                            , status=status.HTTP_400_BAD_REQUEST
                                            )
                    return Response({
                        "status":True,
                        "transaction_hash": ShopOrderInstance.transaction_hash , 
                        "payment_status":1
                    } , status=status.HTTP_200_OK)
                except:
                    return Response({
                        "status":False,
                        "transaction_hash": ShopOrderInstance.transaction_hash , 
                        "payment_status":2 ,
                        "oops":"something went wrong when making order_status successsful, check with db connection"
                    } , status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({
                    'status': False,
                    'oops': "looks like some parameters are false"
                } , status=status.HTTP_400_BAD_REQUEST)
        ShopOrderInstance.transaction_hash = ""
        ShopOrderInstance.payment_status = api_models.PaymentStatus.objects.get(id=3)
        ShopOrderInstance.save(update_fields=['transaction_hash' , 'payment_status'])
        return Response({
                "status":False,
                "transaction_hash": ShopOrderInstance.transaction_hash , 
                "payment_status":3 ,
                "oops":"looks like your payment failed, try placing the order again"
            } , status=status.HTTP_400_BAD_REQUEST)
