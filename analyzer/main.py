# imports
import nlp
import comment_to_course_mapper
import nltk
# named constants
WORD_CLOUD_SIZE = 10

# create objects
mapper = comment_to_course_mapper.CommentToCourseMapper()
processor = nlp.NaturalLanguageProcessor()

# helper function
def generate_word_cloud(input_dict):
    course_cloud_dict = dict()
    for course, comments in input_dict.items():
        # clean and aggregate words
        word_cloud = []
        for comment in comments:
            word_cloud.extend(processor.process(comment))
        word_cloud.remove(str(course)) # remove the course number itself
        # choose the top common words
        common_words = nltk.FreqDist(word_cloud).most_common(WORD_CLOUD_SIZE)
        course_cloud_dict[course] = word_cloud
    return course_cloud_dict

# generate word clouds
course_to_comment_dict = mapper.get_map()
course_cloud_dict = generate_word_cloud(course_to_comment_dict)
print(course_cloud_dict)
