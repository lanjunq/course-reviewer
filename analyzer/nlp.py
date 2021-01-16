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
from nltk.stem import WordNetLemmatizer

class NaturalLanguageProcessor():

    def __init__(self):
        self.stop_words = set(nltk.corpus.stopwords.words('english'))
        self.tokenizer = RegexpTokenizer(r'\w+')
        self.lemmatizer = WordNetLemmatizer()

    def process(self, line):
        if not line: return []
        words = self.tokenizer.tokenize(line)
        words = [word.lower() for word in words]
        words = self.remove_stop_words(words)
        words = self.lemmatize(words)
        return words
    
    # Todo: implement part-of-speech analysis logic
    def process_adj_only(self, line):
        words = self.process(line)
        words = self.keep_adj_helper(words)
        return words
    
    def process_adv_exclusion(self, line):
        words = self.process(line)
        words = self.remove_adv_helper(words)
        return words
        
    # Helper function
    def remove_stop_words(self, tokens):
        return [w for w in tokens if not w in self.stop_words]
    
    def keep_adj_helper(self, words):
        tagged = nltk.pos_tag(words)
        adjs = [ word for (word, tag) in tagged if tag.startswith('JJ') ] # include adjectives only
        return adjs

    def remove_adv_helper(self, words):
        tagged = nltk.pos_tag(words)
        filtered_words = [ word for (word, tag) in tagged if not tag.startswith('RB') ] # exclusde adverbs
        # print('Removed advs: \n', set(words) - set(filtered_words))
        return filtered_words

    def stem(self, words):
        return [ self.stemmer.stem(w) for w in words ]
    
    def lemmatize(self, words):
        return [ self.lemmatizer.lemmatize(w) for w in words ]


