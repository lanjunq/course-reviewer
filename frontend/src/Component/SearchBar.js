import React, {Component}from 'react'
import '../App.css';
import Course from './Course';

const allCoursesData = {
    "courses": [
        {
            "department": "cis",
            "num": "511",
            "name": "unknown"
        },
        {
            "department": "cis",
            "num": "515",
            "name": "unknown"
        },
        {
            "department": "cis",
            "num": "519",
            "name": "unknown"
        },
        {
            "department": "cis",
            "num": "520",
            "name": "unknown"
        },
        {
            "department": "cis",
            "num": "522",
            "name": "unknown"
        },
        {
            "department": "cis",
            "num": "530",
            "name": "unknown"
        },
        {
            "department": "cis",
            "num": "535",
            "name": "unknown"
        },
        {
            "department": "cis",
            "num": "545",
            "name": "unknown"
        },
        {
            "department": "cis",
            "num": "548",
            "name": "unknown"
        },
        {
            "department": "cis",
            "num": "550",
            "name": "unknown"
        },
        {
            "department": "cis",
            "num": "553",
            "name": "unknown"
        },
        {
            "department": "cis",
            "num": "555",
            "name": "unknown"
        },
        {
            "department": "cis",
            "num": "557",
            "name": "unknown"
        },
        {
            "department": "cis",
            "num": "559",
            "name": "unknown"
        },
        {
            "department": "cis",
            "num": "560",
            "name": "unknown"
        },
        {
            "department": "cis",
            "num": "561",
            "name": "unknown"
        },
        {
            "department": "cis",
            "num": "568",
            "name": "unknown"
        },
        {
            "department": "cis",
            "num": "571",
            "name": "unknown"
        },
        {
            "department": "cis",
            "num": "580",
            "name": "unknown"
        },
        {
            "department": "cis",
            "num": "581",
            "name": "unknown"
        },
        {
            "department": "",
            "num": "murphy",
            "name": "unknown"
        },
        {
            "department": "",
            "num": "py4e",
            "name": "unknown"
        }
    ]
}

class SearchBar extends Component {
    constructor (props) {
        super(props);
        this.state = {
            course_list: [],
            course: ""
        }
        this.handleCourseChange = this.handleCourseChange.bind(this);
        this.updateMainCourse = this.updateMainCourse.bind(this);
        this.getAllCourses = this.getAllCourses.bind(this);
    }

    componentDidMount() {
        this.getAllCourses();
    }

    getAllCourses() {
        fetch(`http://localhost:8081/allCourses`, {
          method: "GET", // The type of HTTP request.
        })
        .then(res =>
          {
            console.log(res.status);
           if(res.status===401)
            {
             throw new Error("401 error");
            }else{
              return res.json();
            }
          }) // Convert the response data to a JSON.
    
          .then(coursesData => {
            const courseArray = allCoursesData.courses;
            let div_course_list = courseArray.map((obj, i) => (
                <Course data = {courseArray[i]}></Course>
            ));

            this.setState({
                course_list: div_course_list
            });
            
          })
          .catch((error) => {
          }); 
    }

    handleCourseChange(e){
        this.setState({
            course: e.target.value
        });
        console.log(this.state.course);
    }

    updateMainCourse() {
        console.log("inside updateMainCourse" + this.state.jobTitle);
        this.props.onClick(this.state.course);
    }

    render() {
        return (
            
            <div class="sidenav">
                <div class = "search">
                    <div class = "input-container">
                        <input type="text" placeholder="Enter course number" value={this.state.course} onChange={this.handleCourseChange} id="jobTitle"/>
                        <button onClick={this.updateMainCourse}>Submit</button>
                    </div>
                    <button>View All Courses</button> 
                </div>
                <div class = "allCourses">
              
                    {this.state.course_list}

                </div>
 
            </div>
        )
    }
}

export default SearchBar;