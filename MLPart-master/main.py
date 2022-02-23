# from preprocessing import *
# from libs import *
# import BOW
# import word2vec
# import bert
# from preprocessing import *
from bert import *
from classPredict import predict
# from first import *
# from preprocessing import loadData
# ques = []
# ans = []

# df = pd.read_csv('Dataset\\covid19\\f1.csv', usecols=['Question', 'Answer'])
# print(df)

# ques = [i for i in df['Question']]
# ans = [i for i in df['Answer']]

# ques, ans = loadData()
# print(len(ques), len(ans))

# print(len(stopWords))
# print('\n\nQues before cleaning : \n',ques[:5])

# clean_ques = quesClean(ques)
# print('\n\nQues after preprocessing : \n', clean_ques[:5])

# clean_qwords = cleanWords(clean_ques)
# print('\n\nClean Words : \n', clean_qwords[:5])

# print('Loading the Data:')
# ques, ans = loadData()
# print(f'Total number of questions: {len(ques)}')
# print(f'Total number of answers: {len(ans)}')
# print('Data Loaded successfully\n\n')

# query = input('enter your ques: ')
# clean_query = quesClean([query])
# clean_query_words = cleanWords(clean_query)


#BOW Model
# BOW.runBOW(ques, clean_ques, clean_qwords, query, clean_query)

#Word2Vec Model
# word2vec.runWord2Vec(ques, clean_ques, clean_qwords, query, clean_query, clean_query_words)

#Bert Model
# result = bert.runBert(ques, ans, query)
# print(result)

# dictionary = BOW.BOW(clean_qwords)

# embeddings = BOW.embedd(dictionary, ques, clean_ques)

# query_vector = BOW.embedd(dictionary, [query], clean_query)
# print(query_vector)

# simScore = []
# for i in embeddings:
#     value = cosine_similarity(i, query_vector[0])[0][0]
#     simScore.append(value)

# mvalue = max(simScore)
# index = simScore.index(mvalue)
# print('\n\nUser Query : \n', query)
# print('Retrieved Ques : \n', ques[index])

# print(simScore)

# print('Loading the Data:')
# ques, ans = loadData()
# print(f'Total number of questions: {len(ques)}')
# print(f'Total number of answers: {len(ans)}')
# print('Data Loaded successfully\n\n')

# ques = ques[:110]
# print('Encodings process start\n')
# encodings = embedd(ques)
# print('Encodings process done\n\n')



def run(query):
    ques, cname = predict(query)
    if cname == 1:
        return ques
    encodings = nembedd(ques)
    result = runBert(ques, encodings, query, cname)
    return result

# def Model1(query):
#     predict(query)