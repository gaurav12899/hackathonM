import os
from sklearn import preprocessing
import tensorflow as tf
import tensorflow_hub as hub
import tensorflow_text as text
import pandas as pd
import random
import numpy as np
from tensorflow import keras
from keras.layers import Dense, Dropout


path = 'Dataset'
labelEncoder = preprocessing.LabelEncoder()
bert_preprocess = hub.KerasLayer('gg/bert_en_uncased_preprocess_3')
bert_encoder = hub.KerasLayer('gg/bert_en_uncased_L-12_H-768_A-12_4')

classes = os.listdir(path)
print(classes)

encoded_classes = labelEncoder.fit_transform(classes)
print(encoded_classes)

# oneHotLabels = tf.one_hot(encoded_classes, len(encoded_classes))
# print(oneHotLabels)

def loadData():
    
    ques = []
    path = 'Dataset'
    nc = 0
    for name in os.listdir(path):
        count = 0 
        for i in os.listdir(os.path.join(path, name)):
            df = pd.read_csv(os.path.join(path, f'{name}\{i}'), usecols=['Question'])
            count +=1
            
            for q in df['Question']:
                ques.append((q, encoded_classes[nc]))
                
        print(f'Loaded {name} with number of files {count}')
        nc += 1
    
    
    return ques

def embedd(ques):
    preprocessed_ques = bert_preprocess(ques)
    encodings = bert_encoder(preprocessed_ques)
    return encodings['pooled_output']

print('Loading the Data:')
data = loadData()
print(f'Total number of questions: {len(data)}')
print('Data Loaded successfully\n\n')

random.shuffle(data)

ques = [i[0] for i in data]
labels = [i[1] for i in data]
# ques = ques[887:890]
# embeddings = embedd(ques)
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
print(len(labels))
    
print('Encodings process done\n\n')

embeddings = np.array(embeddings) 
labels = np.array(labels)
# labels = labels.reshape(1, -1, 1)
print(type(embeddings))
print(type(labels))
print(embeddings.shape)
print(labels.shape)
print(labels)
model = keras.Sequential(
    [
        keras.Input(shape=(768)),
        # Dense(768, activation='relu'),
        Dropout(0.1),
        Dense(2)
    ]
)

print(model.summary())

filepath = './Model/'

callback1 = keras.callbacks.ModelCheckpoint(
    filepath=filepath,
    save_weights_only=False,
    monitor='loss',
    mode='min',
    save_best_only=True
)

callback2 = keras.callbacks.ModelCheckpoint(
    filepath=filepath,
    save_weights_only=False,
    monitor='val_accuracy',
    mode='max',
    save_best_only=True
)

callback3 = keras.callbacks.EarlyStopping(
    monitor='val_loss', 
    min_delta=0.001, 
    patience=2,
    mode='min', 
    restore_best_weights=True
)

td = './Tensorboard/'
callback4 = keras.callbacks.TensorBoard(
    log_dir=td, 
    histogram_freq=1, 
    write_graph=True,
    write_images=True, 
    write_steps_per_second=True, 
    update_freq=1
)

model.compile(
    loss=keras.losses.SparseCategoricalCrossentropy(from_logits=True),
    optimizer=keras.optimizers.Adam(learning_rate=0.001),
    metrics = ['accuracy']
)
valX = embeddings[200:800]
valY = labels[200:800]
history = model.fit(embeddings, labels, batch_size=1, epochs=50, callbacks=[callback1, callback2, callback3, callback4], validation_data=(valX, valY))









































# count = 0

# with open('data.txt', 'a') as f:
    
#     print('Encodings process start\n')
#     print(f'Value: {(len(ques)//bsize)-1}')
#     for i in range((len(ques)//bsize)-1):
#         print(f'i = {i}')
#         print(f'{(i*bsize)}:{(bsize*(i+1))}')
#         bques = ques[(i*bsize):(bsize*(i+1))]
#         batchData = embedd(bques)
#         embeddings+=list(batchData)
#         print(len(embeddings))
#         for em in batchData:
#             count += 1
#             f.write(str(em))
#             # print(count)
#         del batchData

#     print(f'{i*bsize:}')
#     bques = ques[i*bsize:]
#     batchData = embedd(bques)
#     embeddings+=list(batchData)
#     print(len(embeddings))
#     for em in batchData:
#         count += 1
#         f.write(str(em))
#         # print(count)
    
#     print('Encodings process done\n\n')
# print(count)

# embeddings = np.array(embeddings)
# labels = np.array(labels)
# print('Before Reshape:\n')
# print(len(embeddings))
# print(len(labels))
# print(embeddings[0])
# print(labels[0])
# print(embeddings.shape)
# print(labels.shape)
# print(embeddings[0].shape)
# print(labels)
# embeddings = embeddings.reshape(embeddings.shape[0], embeddings.shape[1], 1)
# labels = labels.reshape(len(labels), 1)
# print(labels)
# print('After Reshape:\n')
# print(len(embeddings))
# print(len(labels))
# print(embeddings[0])
# print(labels[0])
# print(embeddings.shape)
# print(labels.shape)
# print(embeddings[0].shape)

# model = tf.keras.Sequential([
#     # tf.keras.layers.Dense(embeddings.shape[1], input_shape=(embeddings.shape[1], 1)),
#     tf.keras.layers.Dropout(0.1, input_shape=(embeddings.shape[1])),
#     tf.keras.layers.Dense(1, activation='sigmoid')
# ])

# print(model.summary())
# M = [tf.keras.metrics.BinaryAccuracy(), tf.keras.metrics.Precision(), tf.keras.metrics.Recall()]
# model.compile(optimizer='adam', loss='binary_crossentropy', metrics=M)
# model.fit(embeddings, labels, epochs=10)
# model.save('model')
# print(ques)
# print('Encodings process start\n')
# allData = embedd(ques)
# print('Encodings process done\n\n')

# print(allData)
# print(labels)

# print(len(allData))
# print(len(labels))


# Functional Model

# Bert Layers
# text_input = tf.keras.layers.Input(shape=(), dtype=tf.string, name='text')
# preprocessed_text = bert_preprocess(text_input)
# outputs = bert_encoder(preprocessed_text)

# Neural Network Layers
# l1 = tf.keras.layers.Dropout(0.1, name='dropout')(embeddings)
# l2 = tf.keras.layers.Dense(1, activation='sigmoid', name='output')(l1)

#Model
# model = tf.keras.Model(inputs=[text_input], outputs=[l2])

# print(model.summary())