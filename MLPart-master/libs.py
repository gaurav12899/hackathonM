import nltk
from gensim.models import Word2Vec
from nltk.corpus import stopwords
import re
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from gensim import corpora
from sklearn.metrics.pairwise import cosine_similarity
import os
import pandas as pd
import tensorflow_hub as hub
import tensorflow_text as text
