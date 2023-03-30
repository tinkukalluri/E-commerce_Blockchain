DEBUG = True


# import base64

# file = 'api\iphone.jpg'
# image = open(file, 'rb')
# image_read = image.read()
# image_64_encode = base64.encodebytes(image_read) #encodestring also works aswell as decodestring

# print('This is the image in base64: ' + str(image_64_encode))

# image_64_decode = base64.decodebytes(image_64_encode) 
# image_result = open(r'api\temp_images\temp.jpg', 'wb') # create a writable image and write the decoding result
# image_result.write(image_64_decode)