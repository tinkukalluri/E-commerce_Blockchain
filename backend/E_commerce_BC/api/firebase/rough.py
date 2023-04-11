



import uuid

print(uuid.uuid4())

random_str= uuid.uuid4()
image_path = r'api\temp_images'+'\{}'.format(random_str)
print('image path' ,image_path)

