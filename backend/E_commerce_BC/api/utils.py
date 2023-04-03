import base64
import uuid

DEBUG = True

import re

from .firebase.firebase import uploadFileToFirebase



# file = 'api\iphone.jpg'
# image = open(file, 'rb')
# image_read = image.read()
# image_64_encode = base64.encodebytes(image_read) #encodestring also works aswell as decodestring

# print('This is the image in base64: ' + str(image_64_encode))



def base64_to_image(base64_img):
    image_64_decode = base64.decodebytes(base64_img) 
    image_result = open(r'api\temp_images\temp.jpg', 'wb') # create a writable image and write the decoding result
    image_result.write(image_64_decode)

def send_base64_to_firebase_storage(base64_img):
    # removing the headers from imageurl data:*/*;base64,==> data:image/jpeg;base64,
    regixx_pattern = 'data:.*?;base64' # this is the reix pattern to search patter that starts with "data:" and end with ";base64"
    # re.sub(pattern, replacement, string, count=0, flags=0)
    base64_img = re.sub(regixx_pattern , '' , base64_img)
    random_str= uuid.uuid4()
    image_path = r'api\temp_images'+'\{}.png'.format(random_str)
    print('image path' ,image_path ) # image path api\temp_images\df785fc7-2cc2-4445-97a8-abc3e
    with open(image_path, 'wb') as file_to_save: # create a writable image and write the decoding result
        image_64_decode = base64.b64decode((base64_img))
        file_to_save.write(image_64_decode)
        return uploadFileToFirebase(image_path ,str(random_str ))
    return "couldn't open the file"
        
    
    
