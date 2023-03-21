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

from web3 import Web3


def index(request):
    web3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))
    contract = open(r"C:/Users/tinku/Desktop/major_project/E-commerce_Blockchain/client/src/contracts/TinToken.json")
    contract_dict = json.load(contract)
    network_id =  web3.net.version
    contract_address = contract_dict['networks'][network_id]['address']
    contract_abi = contract_dict['abi']
    contract = web3.eth.contract(address=contract_address, abi=contract_abi)
    transaction_hash = ''
    tx_receipt = web3.eth.get_transaction_receipt()
    return HttpResponse('tinnu')