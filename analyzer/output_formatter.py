'''
input: dictionary, data_source_info.json
output: json on disk

Workflow:
    1. read data_source_info.json
    2. given a input dictionary, convert to the desired output format
'''

# imports
import json
import pprint
import random
import datetime

# Constants
CONFIG_FILE_PATH = './data/raw/data_source_info.json'

# Read config file
fd = open(CONFIG_FILE_PATH, 'r')
config = json.load(fd)
configs = (config['files'])
# print(configs)
# print(configs)
fd.close()

# target format
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
},
{

}
'''

def convert_to_jsons(comments_dict, word_cloud_dict, source_file):
    res = []
    courses = comments_dict.keys()
    for course in courses:

        # find config
        config = False
        for config_candidate in configs:
            # print(config_candidate['name'], '\t', course)
            if config_candidate['name'] == source_file:
                config = config_candidate
                break

        # init
        course_all_comments = dict()
        course_all_comments['course'] = course
        course_all_comments['comments'] = []
        # construct individual comments
        for comment in comments_dict[course]:
            comment_info = { 'content': comment }
            fake_date = (datetime.datetime.utcnow() - datetime.timedelta(days=random.randrange(100))).date()
            comment_info['time'] = str(fake_date)
            if config and config['source']: 
                comment_info['source'] = config['source']
            else:
                comment_info['source'] = 'unknown'
            comment_info['upvotes'] = str(random.randint(0, 20))

            course_all_comments['comments'].append(comment_info)
        # construct word cloud
        if course in word_cloud_dict:
            course_all_comments['word_cloud'] = word_cloud_dict[course]
        else:
            course_all_comments['word_cloud'] = dict()

        # print
        # pp = pprint.prettyprinter(indent=4)
        # pp.pprint(course_all_comments)

        # save to disk
        filepath = './data/cleaned/' + course + '-' + str(random.random()) + '.json'
        fd = open(filepath, 'w+')
        fd.write(json.dumps(course_all_comments))
        fd.close()

        res.append(course_all_comments)
    return res

