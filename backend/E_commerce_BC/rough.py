# import uuid

# print(uuid.uuid4())
import json

contract = open("C:/Users/tinku/Desktop/major_project/E-commerce_Blockchain/client/src/contracts/TinToken.json")
    
contract_dict = json.load(contract)
print(contract_dict)