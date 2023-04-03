import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage

from firebase_utils import firebase_cred_path



cred = credentials.Certificate(firebase_cred_path)
app = firebase_admin.initialize_app(cred)

firebase_storage = storage.bucket(name="ecommerce-blockchain-1fb3d", app=app)
print(firebase_storage)

firebase_storage.blob()
