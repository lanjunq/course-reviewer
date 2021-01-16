import DrawerWrapper from 'antd/lib/drawer';
import React, {Component} from 'react'
import '../App.css'

class Course extends Component {
    constructor (props) {
        super(props);
        this.state = {
            comment_list: []
        }
    }

    render() {
        console.log(this.props.data.department);

        return (
            <a href="#" class="myButton" > {this.props.data.department} {this.props.data.num}</a>
        )
    }
}


export default Course;