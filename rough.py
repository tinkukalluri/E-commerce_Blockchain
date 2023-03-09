dict1= {"tinku" : "kalluri"}

dict2= {"tinku" : "abhinandan"}

list1= [1 ,2 , 3]
list1 = [i+1 for i in list1]
print(list1)

# print({**dict1 , **dict2})
print({**dict2 , **dict1})

str1= 'tinku '

print(str1.split())