'''
workflow:
    1. choose courses of interest
    2. find keywords of the interested course
    3. loop through the raw data line-by-line
    4. output to file (or mongoDB)
'''

import glob
import os
import collections
import json

# Global variables
COURSES_OF_INTEREST = ['505', '519', '520', '545', '550', '555', '557']
READ_PATH = './data/raw/'
WRITE_PATH = './data/cleaned/mock_comments_cleaned.json'
DEBUG = False

# class
class CommentToCourseMapper:

    def __init__(self):
        # init
        self.course_comments_map = collections.defaultdict(list)
        self.course_numbers = COURSES_OF_INTEREST
        self.findFiles()

        # read files one-by-one
        for file in self.files:
            fd = open(file, 'r')

            # read lines one-by-one
            for line in fd:
                self.add_line_to_corresponding_course(line)
            fd.close()
        # self.save_as_json()

    def findFiles(self):
        self.files = glob.glob( READ_PATH + "*.txt")

    def add_line_to_corresponding_course(self, line):
        # sanity check
        if self.is_invalid(line): pass
        # 
        for number in self.course_numbers:
            if number in line:
                self.course_comments_map[number].append(line)
    
    def save_as_json(self):
        course_comments_map_json = json.dumps(self.course_comments_map)
        fd = open(WRITE_PATH, 'w+')
        fd.write( course_comments_map_json )
        fd.close()
    
    def get_map(self):
        return dict(self.course_comments_map)

    # Helper functions
    def is_invalid(self, line):
        if not line: return True

CommentToCourseMapper()