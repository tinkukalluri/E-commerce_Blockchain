from rest_framework import serializers
from .models import Product , ProductItem


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id' , 'category_id', 'name', 'description', 'product_image' , 'added_on')


class ProductItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductItem
        fields = ('id' , 'product_id', 'SKU' , 'qty_in_stock' , 'product_image' , 'prize' , 'IPFS_hash' ,'img_url' ,  'prize' , 'added_on')
        
