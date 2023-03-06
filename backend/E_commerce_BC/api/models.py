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
    contact = models.CharField(max_length=255 , null=True)


class ProductCategory(models.Model):
    parent_category_id = models.ForeignKey(ProductCategory)
    category_name = models.CharField(max_length=255)

class Product(models.Model):
    category_id = models.ForeignKey(ProductCategory)
    name = models.CharField(max_length=255)
    description = models.TextField()
    # this a generall image
    product_image= models.URLField()


# SKU stands for Stock Keeping Unit, which is a unique identifier used in retail and manufacturing to keep track of inventory. It is a number or code that is associated with a particular product or item in order to help identify and track it.
class ProductItem(models.Model):
    product_id = models.ForeignKey(Product)
    SKU = models.CharField(max_length=255)
    qty_in_stock = models.IntegerField(null=True)
    # this img represents a particular variation of product of image
    product_image = models.URLField(null=True)
    IPFS_hash = models.URLField()
    prize = models.IntegerField()

# this will give all the variations possible in product like mobile will have variation like storage , color
class Variation(models.Model):
    category_id = models.ForeignKey(ProductCategory)
    name  =  models.CharField(max_length=255)

# this will give the value of each of the variation
class variation_option(models.Model):
    variation_id = models.ForeignKey(Variation)




