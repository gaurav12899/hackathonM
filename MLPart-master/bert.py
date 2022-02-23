from common import calSimilarity
import tensorflow_hub as hub
import tensorflow_text as text
from pymongo import MongoClient
import details
import numpy as np

# bert_preprocess = hub.KerasLayer('bert_en_cased_preprocess_3')
# bert_encoder = hub.KerasLayer('bert_en_wwm_cased_L-24_H-1024_A-16_4')

bert_preprocess = hub.KerasLayer('gg/bert_en_uncased_preprocess_3')
bert_encoder = hub.KerasLayer('gg/bert_en_uncased_L-12_H-768_A-12_4')

def embedd(ques):
    preprocessed_ques = bert_preprocess(ques)
    # print(preprocessed_ques)
    encodings = bert_encoder(preprocessed_ques)
    # print(encodings)
    # print(type(encodings))
    # print(encodings.keys())
    return encodings['pooled_output']

def nembedd(ques):
    embeddings = []
    bsize = 100
    print('Encodings process start\n')
    val = (len(ques)//bsize)
    print(val)

    for i in range(val):
        print(f'i = {i}')
        sr = i*bsize
        er = bsize*(i+1)
        print(f'{sr}:{er}')
        bques = ques[sr:er]
        batchData = embedd(bques)
        embeddings+=list(batchData)
        print(len(embeddings))
        del batchData

    sr = (i+1)*bsize
    print(f'{sr}')
    bques = ques[sr:]
    print(len(bques))
    batchData = embedd(bques)
    embeddings+=list(batchData)
    print(len(embeddings))
        
    print('Encodings process done\n\n')
    embeddings = np.array(embeddings)
    return embeddings


def runBert(ques, encodings, query, cname):
    
    print('***********Runnung BERT MODEL****************')
    
    # print('Loading the Data:')
    # ques, ans = loadData()
    # print(f'Total number of questions: {len(ques)}')
    # print(f'Total number of answers: {len(ans)}')
    # print('Data Loaded successfully\n\n')
    
    # ques = ques[:300]
    # print('Encodings process start\n')
    # encodings = embedd(ques)
    # print('Encodings process done\n\n')
    
    # print('Printing encodings: \n', encodings)
    print('Encodings Shape: \n', encodings.shape)
    
    # print('Embedding Query Vector\n')
    query_vector = embedd([query])
    # print('Done\n\n')
    
    # print('Query Vector: \n', query_vector)
    print('Query Vector Shape: \n', query_vector.shape)
    
    # simScore = []
    # for i in encodings:
    #     value = cosine_similarity([i], query_vector)
    #     print('Similarity Score: \n', value)
    #     simScore.append(value[0][0])

    simScore = calSimilarity(encodings, query_vector)
    # print(len(simScore))
    # mvalue = max(simScore)
    # index = simScore.index(mvalue)
    # print('\n\nUser Query : \n\n', query)
    # print('Retrieved Ques. : \n\n', ques[index])
    # print('Retrieved Ans. : \n', ans[index])

    conn = MongoClient(host='localhost')
    db = conn[details.dbname]
    col = db[cname]
    simQuesAns = []
    nques = 5
    result = {'result':{}}
    temp_simScore = sorted(simScore)
    tempMvalue = temp_simScore[:nques]
    print(len(tempMvalue))
    for i in tempMvalue:
        index = simScore.index(i)
        res = col.find({'question':ques[index]}, {'_id':0})
        for r in res:
            simQuesAns.append(r)
        # result['result'][ques[index]] = [ans[index]]
        # result['result'][ques[index]] = col.find({'question': ques[index]}, {'_id':0, 'question':0})        
    
    # result['result'][ques[index]] = ans[index]
    print(len(simQuesAns))
    result['result'] = simQuesAns
    return result
    
    # print(simScore)
