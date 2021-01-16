# imports
import nlp
import file_parser
import output_formatter
import os
import nltk
import json
import pprint
from enum import Enum

# named constants
# WORD_CLOUD_SIZE = 20
READ_PATH = './data/raw/'
OUTPUT_PATH = './data/cleaned/toMongoDB.json'

class NLP_PROCESS_MODE(Enum):
    NORMAL = 0,
    ADV_EXCLUSION = 1,
    ADJ_ONLY = 2
WORD_CLOUD_PROCESS_MODE = NLP_PROCESS_MODE.ADV_EXCLUSION

# create objects
uncategorized_parser = file_parser.CommentToCourseMapper()
categorized_parser = file_parser.FileToCourseMapper()
processor = nlp.NaturalLanguageProcessor()
# pp = pprint.PrettyPrinter(indent=4)

# Todo: pass different file to different parser, according to source_data_info.json
# files = glob.glob(READ_PATH + "*.txt")



# helper function
def tuples2lists(tuples):
    # print(tuples)
    return [[x, y] for (x, y) in tuples]

def generate_word_cloud(input_dict):
    course_cloud_dict = dict()
    for course, comments in input_dict.items():
        # clean and aggregate words
        word_cloud = []
        for comment in comments:
            # Change processing method here
            if WORD_CLOUD_PROCESS_MODE is NLP_PROCESS_MODE.NORMAL: 
                word_cloud.extend(processor.process(comment))
            elif WORD_CLOUD_PROCESS_MODE is NLP_PROCESS_MODE.ADJ_ONLY: 
                word_cloud.extend(processor.process_adj_only(comment))
            elif WORD_CLOUD_PROCESS_MODE is NLP_PROCESS_MODE.ADV_EXCLUSION: 
                word_cloud.extend(processor.process_adv_exclusion(comment))
            
        # word_cloud.remove(str(course)) # remove the course number itself
        word_cloud = list(filter((course).__ne__, word_cloud))
        # choose the top common words
        common_words = nltk.FreqDist(word_cloud).most_common()
        common_words = tuples2lists(common_words) # confront format
        course_cloud_dict[course] = common_words

    return course_cloud_dict

# print
def helper_print(data):
    for k, v in data.items():
        print()
        print(k)
        print(v)

# Helper function - save dictionary to JSON
def dict_to_json(input_dict, output_path):
    output = json.dumps(input_dict)
    fd = open(output_path, 'w+')
    fd.write(output)
    print('Successfully save to ', output_path)



# mongoDB target template
'''
{
    'course': String,
    'comments': [
        {
            'content': '',
            'source': '',
            'time': ''
        },
        {
            
        },
    ]
    'word_cloud': [
        [ 'word', frequency ],
        [                   ],
    ]
}
'''

# clear file
# fd = open(OUTPUT_PATH, 'w+')
# fd.close()

def save_json(data, path):
    fd = open(path, 'w+')
    fd.write(data)
    fd.close()
    print('Successfully save to ', path)

# generate word clouds
target = './data/raw/mock_comments.txt'
d = uncategorized_parser.parse(target)
cloud = generate_word_cloud(d)

output_jsons = output_formatter.convert_to_jsons(d, cloud, 'mock_comments.txt')

# 
target = './data/raw/coursera_problem_solving_murphy.txt'
d = categorized_parser.parse(target, 'murphy')
cloud = generate_word_cloud(d)
# pp.pprint(cloud)

output_jsons = output_formatter.convert_to_jsons(
    d, cloud, 'coursera_problem_solving_murphy.txt')

# 
target = './data/raw/coursera_py4e.txt'
d = categorized_parser.parse(target, 'py4e')
cloud = generate_word_cloud(d)

output_jsons = output_formatter.convert_to_jsons(d, cloud, 'coursera_py4e.txt')
