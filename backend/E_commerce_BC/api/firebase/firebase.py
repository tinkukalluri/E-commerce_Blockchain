import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage

from .firebase_utils import firebase_cred_path

# from .rough2 import blob_file



cred = credentials.Certificate(firebase_cred_path)

firebase_admin.initialize_app(cred, {
    'storageBucket': 'ecommerce-blockchain-1fb3d.appspot.com'
})

bucket = storage.bucket()
print('firebase_storage_bucket_instance' , bucket)

def uploadFileToFirebase(filepath , filename):
    blob = bucket.blob(filename)
    blob.upload_from_filename(filepath)
    blob.make_public()
    print("your file url", blob.public_url)
    return blob.public_url

# fileName = 'tinkukalluri.png'

# blob_data = ''

# blob = bucket.blob('bugatti-2.jpg')
# blob.upload_from_filename(r'api\firebase\bugatti.jpg')

# # Opt : if you want to make public access from the URL
# blob.make_public()

# print("your file url", blob.public_url)

