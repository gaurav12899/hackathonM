import connection
from pymongo import MongoClient
import os
import pandas as pd
import details

import sys

path = '../Dataset'

if connection.getConnectionStatus() == 0:
    print('Connection failed')
else:
    conn = MongoClient(host='localhost')
    db = conn[details.dbname]
    
    for dirName in os.listdir(path):
        count = 0 
        data = []
        ques = []
        ans = []
        for i in os.listdir(os.path.join(path, dirName)):
            df = pd.read_csv(os.path.join(path, f'{dirName}\{i}'), usecols=['Question', 'Answer'])
            count +=1
            for q in df['Question']:
                ques.append(q)
            for a in df['Answer']:
                ans.append(a)
        for qa in range(len(ques)):
            data.append({'question':ques[qa], 'answers':[ans[qa]]})
        print(f'Loaded {dirName} with number of files {count}')
        print(len(data))
        try:
            result = db[dirName].insert_many(data)
            # print(result.inserted_ids)
            print(f'Inserted {len(data)} Q/A of {dirName} category')
            print('Inserted Successfully')
        except:
            print('Some error occurred while inserting')
        
            
    
            