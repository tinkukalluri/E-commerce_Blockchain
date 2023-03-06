from django.db import models
from django.utils import timezone

# Create your models here.

# model is just a table 

import string
import random


# def generate_unique_code():
#     length = 6
#     while True:
#         code = ''.join(random.choices(string.ascii_uppercase, k=length))
#         if Room.objects.filter(code=code).count() == 0:
#             break
#     return code

class Users(models.Model):
    google_uid=models.CharField(max_length=255 , null=True , unique=True)
    email_uid=models.CharField(max_length=255 , null=True, unique=True)
    username=models.CharField(max_length=255 , null=True, unique=True )
    password=models.CharField(max_length=255 , null=True)
    photoURL=models.CharField(max_length=1000 , null=True)
    role = models.BooleanField(default=False , null=True)
    phone =  models.IntegerField()
    
#           shirt
#           /   \
#    half hands full hands
#      /    \
# slim fit  baggy
class ProductCategory(models.Model):
    parent_category_id = models.ForeignKey('ProductCategory' , on_delete=models.SET_NULL , null=True)
    category_name = models.CharField(max_length=255)

class Product(models.Model):
    category_id = models.ForeignKey(ProductCategory , on_delete=models.SET_NULL , null=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    # this a generall image
    product_image= models.URLField()


# SKU stands for Stock Keeping Unit, which is a unique identifier used in retail and manufacturing to keep track of inventory. It is a number or code that is associated with a particular product or item in order to help identify and track it.
class ProductItem(models.Model):
    product_id = models.ForeignKey(Product , on_delete=models.CASCADE)
    SKU = models.CharField(max_length=255)
    qty_in_stock = models.IntegerField(null=True)
    # this img represents a particular variation of product of image
    product_image = models.URLField(null=True)
    IPFS_hash = models.URLField()
    prize = models.IntegerField()

# this will give all the variations possible in product like mobile will have variation like storage , color
class Variation(models.Model):
    category_id = models.ForeignKey(ProductCategory , on_delete=models.SET_NULL , null=True)
    name  =  models.CharField(max_length=255)

# this will give the value of each of the variation like storage will have 2 variation_optiions like 64gb or 128gb
class VariationOption(models.Model):
    variation_id = models.ForeignKey(Variation , on_delete=models.CASCADE)
    value = models.CharField(max_length=255)


# many-to-many relationship btw ProductItem and VariationOption
class ProductConfig(models.Model):
    product_item_id= models.ForeignKey(ProductItem  , on_delete=models.CASCADE)
    variation_option = models.ForeignKey(VariationOption ,  on_delete=models.CASCADE)

# ----------------------------------cart------------------------------------------

class ShoppingCart(models.Model):
    user_id = models.ForeignKey(Users , on_delete=models.CASCADE)

class ShoppingCartItem(models.Model):
    cart_id = models.ForeignKey(ShoppingCart , on_delete=models.CASCADE)
    product_item_id = models.ForeignKey(ProductItem , on_delete=models.CASCADE)
    qty = models.IntegerField()


# ---------------------------------address----------------------------------------
class Country(models.Model):
    name = models.CharField(max_length=255)

class Address(models.Model):
    street_number = models.CharField(max_length=255)
    address_line1 = models.CharField(max_length=512)
    address_line2 = models.CharField(max_length=512)
    city = models.CharField(max_length=255)
    region = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=255)
    country_id = models.ForeignKey(Country , on_delete=models.CASCADE)

class UserAddress(models.Model):
    user_id = models.ForeignKey(Users , on_delete=models.CASCADE)
    address_id = models.ForeignKey(Address , on_delete=models.CASCADE)
    is_default = models.BooleanField(default=True)

# --------------------------------shopping orders----------------------------------

class OrderStatus(models.Model):
    status = models.CharField(max_length=255)

# this will give details about value of card address , user who ordered etc
class ShopOrder(models.Model):
    user_id = models.ForeignKey(Users , on_delete=models.SET_NULL , null=True)
    order_date = models.DateField()
    # payment_method_id=models.ForeignKey(PaymentMethod)
    shipping_address_id = models.ForeignKey(Address , on_delete=models.SET_NULL , null=True)
    # methods like prime , express delivery
    # shipping_method_id = models.ForeignKey(ShippingMethod)
    order_total = models.IntegerField()
    order_status= models.ForeignKey(OrderStatus , on_delete=models.SET_NULL , null=True)

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        # converting utc to itc , the gap is 5.5 hours
        self.order_date=timezone.now() + timezone.timedelta(hours=5.5)
        #print("timezome.now()::", self.send_on)
        #     self.created = timezone.now()
        # self.modified = timezone.now()
        return super(ShopOrder , self).save(*args, **kwargs)


# this will give u the items in the order represented by order_id and their respective qty
class OrderLine(models.Model):
    product_item_id = models.ForeignKey(ProductItem , on_delete=models.SET_NULL , null=True)
    order_id = models.ForeignKey(ShopOrder , on_delete=models.CASCADE)
    qty = models.IntegerField()
    price = models.IntegerField()
    
    






