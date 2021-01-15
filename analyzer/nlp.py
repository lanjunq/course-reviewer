'''
Workflow:
    1. tokenize
    2. lower-case
    3. remove punctuations
    4. remove course number itself
    5. most frequent
Considering:
    (choose only adj)
Input:
    { course : [ "review sentence 1", "review sentence 2" ] }
'''

import nltk
from nltk.tokenize import word_tokenize
from nltk.tokenize import RegexpTokenizer

class NaturalLanguageProcessor():

    def __init__(self):
        self.stop_words = set(nltk.corpus.stopwords.words('english'))

    def process(self, line):
        tokenizer = RegexpTokenizer(r'\w+')
        words = tokenizer.tokenize(line)
        words = [word.lower() for word in words]
        words = self.remove_stop_words(words)
        return words
    
    def process_adj_only(self, line):
        words = self.process(line)
        # Todo: implement part-of-speech analysis logic
        
        
    def remove_stop_words(self, tokens):
        return [w for w in tokens if not w in self.stop_words]
