'''
Use the result of CommentToCourseMapper to select the important word cloud words.

Workflow:
    0. input: course_number : [ lines ] map
    1. nltk filter out insignificant words
    2. td-idf weight word importance
'''

from nltk.tokenize import word_tokenize
import nltk
# nltk.download('punkt')
# nltk.download('stopwords')
import json
import collections

READ_PATH = './data/cleaned/mock_comments_cleaned.json'
DEBUG = False


# 
class WordCloudSelector():

    def __init__(self):
        
        self.load_course_comments_map()  
        self.course_important_words_map = collections.defaultdict(list)
        
        self.word_freqnuency_counter = collections.defaultdict(dict)
        self.nlp = NaturalLanguageProcessor()

        for course_num, comments in self.course_comments_map.items():
            for comment in comments:
                chosen_words = self.choose_words(comment)
                self.course_important_words_map[course_num].append(chosen_words)

                freq_dict = self.get_frequency(chosen_words)
                # print(chosen_words)
                self.word_freqnuency_counter[course_num] = freq_dict
                # print(freq_dict)

        # print_dict(self.course_important_words_map)
        print_dict(self.word_freqnuency_counter)
        # print(self.count_word_frequency)


    def choose_words(self, line):
        word_tokens = nltk.word_tokenize(line)
        # todo: add additional filter conditions
        return self.nlp.remove_stop_words(word_tokens)

    def get_frequency(self, words):
        freq_dict = collections.defaultdict(int)
        for w in words:
            freq_dict[w] += 1
        return freq_dict

    def load_course_comments_map(self):
        fd = open(READ_PATH)
        self.course_comments_map = json.load(fd)

        if DEBUG: print(self.course_comments_map)


# 
class NaturalLanguageProcessor():

    def __init__(self):
        self.stop_words = set(nltk.corpus.stopwords.words('english'))

    def remove_stop_words(self, tokens):
        res = []

        for w in tokens:
            if w not in self.stop_words:
                res.append(w)
        return res


# Helper function
def print_dict(map):
    for k, v in map.items():
        print(k, v)


# run
WordCloudSelector()
