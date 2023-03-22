def getProductsWithKwargs( filter_by=False ,order_by=[] , offset=0  , limit=10):
    product_hash= collections.defaultdict(lambda : None)
    products_=[]
    if len(order_by):
        if filter_by:
            querySet_items = ProductItem.objects.filter(**filter_by).order_by(*order_by)[offset:limit]
        else:
            querySet_items = ProductItem.objects.all().order_by(*order_by)[offset:limit]
    else:
        if filter_by:
            querySet_items = ProductItem.objects.filter(**filter_by)[offset:limit]
        else:
            querySet_items = ProductItem.objects.all()[offset:limit]
    print(len(querySet_items))
    for row in querySet_items:
        temp_productItem = ProductItemSerializer(row).data
        productID= int(row.product_id.id)
        print('-------------productID-------------------')
        print(productID)
        print(type(productID))
        if(product_hash[productID]):
            temp_product = ProductSerializer(product_hash[productID]).data
        else:
            product_details = Product.objects.filter(id = productID)[0]
            product_hash[productID]=product_details
            print(product_details)
            print(type(product_details))
            temp_product = ProductSerializer(product_details).data
        #  we are doing this to avoid the id id , added_on-added_on coliision when peprforming dict spread operator
        temp_productItem['added_on_item']=temp_productItem['added_on']
        temp_productItem['product_image_item']=temp_productItem['product_image']
        temp_productItem['id_item']=temp_productItem['id']
        temp_product_= { **temp_productItem , **temp_product   }
        print(temp_product_['product_id'])
        products_.append(temp_product_)
        print(type(products_))
        print(products_)
    return products_










def getProductsWithSimilarNames(query_list , offset=0 , limit = 10):
    # ob_list = ProductItem.objects.get(reduce(lambda x, y: x | y, [Q(name__contains=word) for word in query_list]))
    querySet_product = Product.objects.filter(reduce(lambda x, y: x | y, [Q(name__contains=word.lower()) | Q(description__contains=word.lower()) for word in query_list]))
    print(type(querySet_product))
    # tot_rows=0
    products_=[]
    if querySet_product.exists():
        inner_query = f"{querySet_product[0].id}"
        print("print querySet" , inner_query)
        for i in range(1 , len(querySet_product)):
            print("print querySet" , inner_query)
            id = querySet_product[i].id
            inner_query+=f", {id}"
    # select * from api_productItem where id IN ()
        print(f'select * from api_productItem where id IN ({inner_query});')
        querySet_product_item = ProductItem.objects.raw(f'select * from api_productitem where product_id_id IN ({inner_query});')
        print(list(querySet_product_item))
        product_hash= collections.defaultdict(lambda : None)
        for row in querySet_product_item:
            temp_productItem = ProductItemSerializer(row).data
            productID= int(row.product_id.id)
            print('-------------productID-------------------')
            print(productID)
            print(type(productID))
            if(product_hash[productID]):
                temp_product = ProductSerializer(product_hash[productID]).data
            else:
                product_details = Product.objects.filter(id = productID)[0]
                product_hash[productID]=product_details
                print(product_details)
                print(type(product_details))
                temp_product = ProductSerializer(product_details).data
            #  we are doing this to avoid the id id , added_on-added_on coliision when peprforming dict spread operator
            temp_productItem['added_on_item']=temp_productItem['added_on']
            temp_productItem['product_image_item']=temp_productItem['product_image']
            temp_productItem['id_item']=temp_productItem['id']
            temp_product_= { **temp_productItem , **temp_product   }
            print(temp_product_['product_id'])
            products_.append(temp_product_)
            print(type(products_))
            print(products_)
    return products_