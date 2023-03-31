import base64


DEBUG = True



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
    image_64_decode = base64.decodebytes(base64_img) 
    image_result = open(r'api\temp_images\temp.jpg', 'wb') # create a writable image and write the decoding result
    image_result.write(image_64_decode)
    
