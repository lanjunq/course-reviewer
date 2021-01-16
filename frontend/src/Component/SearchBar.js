import React, {Component}from 'react'
import '../App.css';
import Course from './Course';

class SearchBar extends Component {
    constructor (props) {
        super(props);
        this.state = {
            course: "",
        }
        this.handleCourseChange = this.handleCourseChange.bind(this);
        this.updateMainCourse = this.updateMainCourse.bind(this);
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
                    <Course></Course>
                    <Course></Course>

                </div>
 
            </div>
        )
    }
}

export default SearchBar;