import React, {Component}from 'react'
import '../App.css';
import Course from './Course';
import searchIcon from "../arrowup.png";

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
        this.myFunction = this.myFunction.bind(this);
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
            this.buildCoursesList(allCoursesData.courses);
          })
          .catch((error) => {
          }); 
    }
 
    handleCourseChange(e){     //current search bar input 
        this.setState({
            course: e.target.value
        });
        console.log(this.state.course);
    }

    updateMainCourse(course) {    //pass this.state.course to parent component 
        this.props.onClick(course);
    }

    updateCurCourse = (course) => {
        this.setState({
            curCourse: course
        });
        
        //console.log("Main.js" + course);
        this.updateMainCourse(course);
    }

    buildCoursesList(courseArray) {
        let div_course_list = courseArray.map((obj, i) => (
            <Course id = {i} data = {courseArray[i]} onClick = {this.updateCurCourse}></Course>
        ));
        this.setState({
            course_list: div_course_list
        });
    }

    myFunction = (e) => {    //filter the output course lists based on the input 
        console.log("myInput", e.target.value);

        var data = allCoursesData.courses;
        var value = e.target.value;
        console.log(value);
        console.log(data);
        console.log(data.length);
        let filteredData = [];
        value = value.toUpperCase();
        
        for(var i = 0; i < data.length; i++) {
            var department = data[i].department.toUpperCase();
            var num = data[i].num;
            var courseToget = data[i].department.toUpperCase() + data[i].num;
            var courseWithDash = data[i].department.toUpperCase() + ' ' + data[i].num;
            var murphy = "murphy";
            console.log("value!" +value );
            if (department.includes(value)) {           //"cis"
                filteredData.push(data[i]);
            }
            else if (num.includes(value)) {             //"550"
                filteredData.push(data[i]);
            }
            else if (courseToget.includes(value)) {     //"cis550"
                filteredData.push(data[i]);
            }
            else if (courseWithDash.includes(value)) {  //"cis 550"
                filteredData.push(data[i]);
            }
        }
        console.log("filteredData", filteredData); 
        this.buildCoursesList(filteredData);            //call buildCoursesList() to render the updated lists  
    }

    render() {
        return (
            <div class="sidenav">
                <div class = "search">
                    <div class = "input-container">
                        <i id = 'searchIcon' src={searchIcon}/>
                        <input type="text" id="myInput" onChange={this.myFunction} placeholder="Type in course number.." title="Type in a name"/>


                    </div>
                </div>

                <div id = "allCourses">
                    {this.state.course_list}
                </div>
            </div>
        )
    }
}

export default SearchBar;