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

    fetchComments() {   //send request to api fetch 
        
    } 

    componentDidUpdate() {
        
    }
    
    render() {
        var pcrLink = `https://penncoursereview.com/course/${this.props.curCourse}`;
        return (
            <div>
                <div class = "external_link">External Resources of {this.props.curCourse}</div>
                <a target="_blank" href = {pcrLink}>
                    <img id = "pcr" src={penn_course_review} ></img>
                </a>
                <a target="_blank" href="https://www.cis.upenn.edu/course-information/#500">
                    <img id = "pi" src={penn_icon}></img>
                </a>
            </div>
        )
    }
}

export default ExternalLink;
