from .models import ProductItem , Product , Users
from .serializer import ProductItemSerializer , ProductSerializer;
from functools import reduce


def getProductsWithSimilarNames(query_list , offset=0 , limit = 10):
    # ob_list = ProductItem.objects.get(reduce(lambda x, y: x | y, [Q(name__contains=word) for word in query_list]))
    querySet_product = Product.objects.get(reduce(lambda x, y: x | y, [Q(name__contains=word) for word in query_list]))
    tot_rows=0
    inner_query = "${querySet_product[0].id}"
    for i in range(1 , len(querySet_product)):
        inner_query+=", ${querySet_product[i].id}"
    print(inner_query)
    # select * from api_productItem where id IN ()
    querySet_product_item = ProductItem.objects.raw('select * from api_productItem where id IN ({inner_query})')
    print(querySet_product_item)