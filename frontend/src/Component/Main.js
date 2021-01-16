import React, {Component}from 'react'
import '../App.css';
import { Layout, Menu} from 'antd';
import { UserOutlined} from '@ant-design/icons';
import WordCloud from './WordCloud'
import Comment from './Comment'
import ExternalLink from './ExternalLink';
import SearchBar from './SearchBar.js';

class Main extends Component{

    constructor(props) {
        super(props);
        this.state = {
            curCourse: ""
        }
    }

    updateCurCourse = (course) => {
        this.setState({
            curCourse: course
        });
        
        console.log("Main.js" + this.state.curCourse);
        this.forceUpdate();
    }

    render() {

        return (
            <div class = "all"> 
            
                <SearchBar onClick = {this.updateCurCourse}></SearchBar>
                <div class = "main">
                    <WordCloud curCourse = {this.state.curCourse}></WordCloud>
                    <Comment curCourse = {this.state.curCourse}></Comment>
                    
                    <ExternalLink curCourse = {this.state.curCourse}></ExternalLink>
                </div>
            </div>
        )
    }

}

export default Main;