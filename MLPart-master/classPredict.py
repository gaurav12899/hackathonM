import bert
from tensorflow import keras
import numpy as np
model = keras.models.load_model('./Model/')
import common
# import Database.connection
# from Database.connection import getConnectionStatus
from pymongo import MongoClient
import sys
import details


sys.path.insert(0, './Database')

def predict(query):
    
    queryVector = bert.embedd([query])
    # print(queryVector)
    # queryVector = np.array(queryVector)
    # print(queryVector.shape)
    pred = model.predict(queryVector)
    print(pred)
    tempIndex = np.where(pred[0] == np.amax(pred))
    index = tempIndex[0][0]
    # print(index)
    label = common.labelEncoder.inverse_transform([index])    
    print(label)
    # print(label[0])
    # print(type(label[0]))
    # print(str(label[0]))
    # print(type(str(label[0])))
    conn = MongoClient(host='localhost')
    db = conn[details.dbname]
    # print('success')
    # if getConnectionStatus() == 1:
    #     print('con')
    cname = str(label[0])
    # print(cname)
    col = db[cname]
    # print(col)
    try:
        data = col.find({},{'_id':0, 'answers':0})
        # time.sleep(60)
    except Exception as e:
        print(e)
    # print(len(data))
    ques = []
    for i in data:
        ques.append(i['question'])
    print(len(ques))
    flag = 0
    if query in ques:
        result = {'result':{}}
        res = list(col.find({'question': query},{'_id':0}))
        result['result'] = res
        flag = 1
        return result, flag

    return ques, cname
    
    # print(type(data))
    # for d in data:
    #     print(d)
    # if getConnectionStatus() == 1:
        
        
    # if index == 0:
    #     print('Cancer')
    # else:
    #     print('Covid19')
    


