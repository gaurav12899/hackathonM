from pymongo import MongoClient

flag = 0

try:
    connection = MongoClient(host='localhost')
    print('Connection established')
    flag = 1
except:
    print('Connection failed')

def getConnectionStatus():
    return flag