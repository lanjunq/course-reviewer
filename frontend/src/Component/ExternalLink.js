import React, {Component}from 'react'
import '../App.css';
import penn_course_review from '../penn_course_review.png'
import penn_icon from '../penn_icon.png'
class ExternalLink extends Component {    //cur course is passed as props to External link 
    constructor(props) {
        super(props);
        this.state = {
            curCourse : ""
        }
    }

    render() {
        var course = this.props.curCourse;
        course = course.toUpperCase();
        var courseGap = course.substr(0,3) + ' ' + course.substr(3,6);
        var courseDash = course.substr(0,3) + '-' + course.substr(3,6);
        var pcrLink = `https://penncoursereview.com/course/${courseDash}`;
        var piLink = `https://www.cis.upenn.edu/~${course.toLowerCase()}`;
        return (
            <div>
                <div class = "external_link">External Resources of {course.toUpperCase()}</div>
                <a target="_blank" href = {pcrLink}>
                    <img id = "pcr" src={penn_course_review} ></img>
                </a>
                <a target="_blank" href = {piLink}>
                    <img id = "pi" src={penn_icon}></img>
                </a>
            </div>
        )
    }
}

export default ExternalLink;
