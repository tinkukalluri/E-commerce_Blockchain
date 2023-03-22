from rest_framework import serializers
from .models import Product , ProductItem  , Variation , VariationOption , ProductConfig , ShoppingCart, ShoppingCartItem
from .models import ShopOrder , OrderStatus , PaymentStatus , OrderLine


# suffix `_add` means this serializer is used to add data into table
# basically it will not have fileds like id , added_on

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id' , 'category_id', 'name', 'description', 'product_image' , 'added_on')


class ProductItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductItem
        fields = ('id' , 'product_id', 'SKU' , 'qty_in_stock' , 'product_image' , 'prize' , 'IPFS_hash' ,'img_url' ,  'prize' , 'added_on')

class VariationSerializer(serializers.ModelSerializer):
    class Meta:
        model= Variation
        fields=("id" , "category_id" , "name")
        
class VariationOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = VariationOption
        fields =("id" , "variation_id" , "value")


class ProductConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model=ProductConfig
        fields=('id' ,'product_item_id' , 'variation_option')
        
        
class ShoppingCartSerializer(serializers.ModelSerializer):
    class Meta:
        model=ShoppingCart
        fields = ('id' , 'user_id')

class ShoppingCartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingCartItem
        fields = ('id' ,'cart_id' ,'product_item_id' , 'qty' , 'added_on' )


class ShopOrderSerializer_add(serializers.ModelSerializer):
    class Meta:
        model = ShopOrder
        fields = ('user_id' , "payment_status" , "shipping_address_id" ,'order_total' , "order_status" )


class ShopOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopOrder
        fields = ('id' ,'transaction_hash', 'order_status' , 'order_total' , 'shipping_address_id' , "payment_status" , "order_date" , "user_id")


class OrderLineSeializer(serializers.ModelSerializer):
    class Meta:
        model = OrderLine
        fields = ('id' , 'product_item_id' ,'order_id' , 'qty' ,  'qty')
