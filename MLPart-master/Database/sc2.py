import pandas as pd
import os
import connection
from pymongo import MongoClient
import details

path = '../DATA'
answer = ['Answer-1', 'Answer-2', 'Answer-3', 'Answer-4', 'Answer-5']


if connection.getConnectionStatus() == 0:
    print('Connection failed')
else:
    conn = MongoClient(host='localhost')
    db = conn[details.dbname]

    for fileName in os.listdir(path):
        ques = []
        answ = []
        data = []
        ansArray = []
        df = pd.read_csv(os.path.join(path, fileName))
        # print(df)
        
        for q in df['Question']:
            ques.append(q)
        
        for ans in answer:
            ta = []
            for a in df[ans]:
                ta.append(a)
            ansArray.append(ta)
        
        for i in range(len(ques)):
            temp = []
            for j in range(len(answer)):
                if str(ansArray[j][i]) != 'nan':
                    temp.append(ansArray[j][i])
            answ.append(temp)
        
        for qa in range(len(ques)):
            data.append({'question':ques[qa], 'answers':answ[qa]})
    
        try:
            result = db[fileName[:-4]].insert_many(data)
            print(f'Inserted {len(data)} Q/A of {fileName[:-4]} category')
            print('Inserted Successfully\n')
        except:
            print('Some error occurred while inserting')
        
