import React, {Component}from 'react'
import '../App.css';
import Course from './Course';
import searchIcon from "../arrowup.png";

class SearchBar extends Component {
    constructor (props) {
        super(props);
        this.state = {
            course_data: [],
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
        // fetch(`http://localhost:8081/allCourses`, {
        fetch(`http://34.237.86.113:8081/allCourses`, {
          method: "GET", // The type of HTTP request.
        })
        .then(res =>
          {
           if(res.status===401)
            {
             throw new Error("401 error");
            }else{
              return res.json();
            }
          }) // Convert the response data to a JSON.
    
          .then(coursesData => {
            this.buildCoursesList(coursesData.courses);
            this.setState({
                course_data: coursesData.courses
            });
            
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
            <Course key = {i} data = {courseArray[i]} onClick = {this.updateCurCourse}></Course>
        ));
        this.setState({
  
            course_list: div_course_list
        });
    }

    myFunction = (e) => {    //filter the output course lists based on the input 
        console.log("myInput", e.target.value);

        var data = this.state.course_data;
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
