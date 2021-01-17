
# Course Reviewer

## Problem to solve
[Penn Course Review](https://penncoursereview.com/) is a great resource which assists course selection. It provides ratings of many courses for students to compare.

However, Penn Course Review misses students' comments beyond numbers. Comments are typically more elaborated and therefore provide more detailed information.

The purpose of the Review Hub project is to create a course review system that aggregate students' comments from different sources and present the comments to students through a consistent and beautiful interface. By using the system, students save the manual effort of searching information from various sources, filtering out the relevant comments, and repeating the process every semester.


## Workflow
The basic workflow of the system is the following: 

![Alt text](images/workflow.jpg?raw=true "App Workflow Logic")


## UI
Users primarily interact with the application through a web interface like the following:

![Alt text](images/user_interface.jpg?raw=true "User Interface")

The left-hand area allows user to select the course of interest. The right-hand area will display the comments related to the course. A word cloud will be created by using natural language processing library and generate the keywords. 


## Tech Stack
The following technology will be used to implement the system: 

![Alt text](images/tech_stack.jpg?raw=true "Tech Stack")


### Optional Features
If time permits (or for future development), here is a list of the optional features that can enhance user experience. 
* Login enables user to store personalized information, such as interest list, favorite comments, etc.
* User can upvote comments, which will be ranked higher in the system.
* Classifier can categozie all comments into positive or negative categories.
* Integrate Penn Course Review to the page and display scores and comments side-by-side.
* Keyword search in the entire database.
