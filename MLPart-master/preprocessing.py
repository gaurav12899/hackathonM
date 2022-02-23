# from nltk.corpus import stopwords
# import re
# from nltk.tokenize import word_tokenize
# from nltk.corpus import stopwords
from sklearn.metrics.pairwise import cosine_similarity
import os
import pandas as pd


# stopWords = set(stopwords.words('english'))

# def quesClean(ques):
#     clean_ques = [] 
#     for i in ques:
#         try:
#             i = i.lower().strip()
#             i = re.sub(r'[^a-z0-9\s]', '', i)
#             clean_ques.append(' '.join([i for i in word_tokenize(i) if i not in stopWords]))
#         except:
#             continue
#     return clean_ques

# def cleanWords(clean_ques):
#     clean_qwords = [word_tokenize(i) for i in clean_ques]
#     return clean_qwords

def loadData():
    
    ques = []
    ans = []
    path = 'Dataset'
    
    for name in os.listdir(path):
        count = 0 
        for i in os.listdir(os.path.join(path, name)):
            df = pd.read_csv(os.path.join(path, f'{name}\{i}'), usecols=['Question', 'Answer'])
            count +=1
            # print(df)
            # ques = [i for i in df['Question']]
            # ans = [i for i in df['Answer']]
            for q in df['Question']:
                ques.append(q)
            for a in df['Answer']:
                ans.append(a)
        print(f'Loaded {name} with number of files {count}')
        
    return ques, ans

# def BOW(clean_qwords):
#     dictionary = corpora.Dictionary(clean_qwords)
#     print('\n\nDictionary : \n', dictionary)
#     print('\n\nComplete Dictionary : \n')
#     for key, value in dictionary.items():
#         print(key, ': ', value)
#     return dictionary

# def embedd(dictionary, ques, clean_ques):
#     embeddings = []
#     for i in range(len(ques)):
#         print('Original Ques --> ', ques[i])
#         print('Clean Ques --> ', clean_ques[i])
#         vector = dictionary.doc2bow(clean_ques[i].split(' '))
#         print('Clean Vector --> ', vector)
#         embeddings.append(vector)
#         print()
#     return embeddings

def calSimilarity(encodings, query_vector):
    
    simScore = []
    
    for i in encodings:
        value = cosine_similarity([i], query_vector)
        # print('Similarity Score: \n', value)
        simScore.append(value[0][0])

    # mvalue = max(simScore)
    # index = simScore.index(mvalue)
    # print('\n\nUser Query : \n', query)
    # print('Retrieved Ques : \n', ques[index])

    # print(simScore)
    return simScore
