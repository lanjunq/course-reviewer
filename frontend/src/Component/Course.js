import DrawerWrapper from 'antd/lib/drawer';
import React, {Component} from 'react'
import '../App.css'

class Course extends Component {
    constructor (props) {
        super(props);
    }

    updateMainCourse = () => {    //pass this.state.course to parent component 
        var course = this.props.data.department + this.props.data.num;
        console.log("updateMainCourse within Course " + course);
        this.props.onClick(course);
    }

    render() {
        //console.log(this.props.data.department);
        return (
            <a href="#" class="myButton" onClick={this.updateMainCourse}> {this.props.data.department} {this.props.data.num}</a>
        )
    }
}

export default Course;