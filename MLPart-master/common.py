
# import tensorflow_hub as hub
# import tensorflow_text as text
import os
from sklearn import preprocessing
from sklearn.metrics.pairwise import cosine_similarity

# bert_preprocess = hub.KerasLayer('gg/bert_en_uncased_preprocess_3')
# bert_encoder = hub.KerasLayer('gg/bert_en_uncased_L-12_H-768_A-12_4')

# def embedd(ques):
#     preprocessed_ques = bert_preprocess(ques)
#     # print(preprocessed_ques)
#     encodings = bert_encoder(preprocessed_ques)
#     # print(encodings)
#     # print(type(encodings))
#     # print(encodings.keys())
#     return encodings['pooled_output']


path = 'Dataset'
labelEncoder = preprocessing.LabelEncoder()
classes = os.listdir(path)
print(classes)

encoded_classes = labelEncoder.fit_transform(classes)
print(encoded_classes)

def calSimilarity(encodings, query_vector):
    
    simScore = []
    
    for i in encodings:
        value = cosine_similarity([i], query_vector)
        simScore.append(value[0][0])
        
    return simScore
