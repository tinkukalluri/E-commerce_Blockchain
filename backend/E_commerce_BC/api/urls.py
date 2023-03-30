from django.contrib import admin
from django.urls import path, include

from . import views
from . import order_views


urlpatterns = [
    path('get_new_products' , views.getNewProducts.as_view()),
    path('loginwithgoogle' , views.LoginWithGoogle.as_view()),
    path('authenticate' , views.Authenticate.as_view()),
    path('logout' , views.Logout.as_view()),
    path('product_search' , views.ProductSearch.as_view()),
    path('product_detials' , views.getProductDetails.as_view()),
    path('add_to_cart' , views.AddToCart.as_view()),
    path('remove_from_cart' , views.RemoveFromCart.as_view()),
    path('cart_products' , views.CartProducts.as_view()),
    path('empty_cart' ,  views.EmptyCart.as_view()),
    path('add_products' ,  views.AddProductItem.as_view()),
    path('get_variations' ,  views.getVariations.as_view()),
    path('get_variation_options' ,  views.getVariationValue.as_view()),
    path('create_order' ,  order_views.MakeOrder.as_view()),
    path('get_user_orders' ,  order_views.UserOrders.as_view()),
    path('update_tx_hash' ,  order_views.UpdateTransactionHashShopOrder.as_view()),
    path('user_order_items' ,  order_views.UserOrderItems.as_view()),
    path('get_product_category' ,  views.getProductCategory.as_view()),
]