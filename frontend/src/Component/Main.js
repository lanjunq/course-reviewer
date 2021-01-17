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
            curCourse: "cis555"
        }
    }

    updateCurCourse = (course) => {
        this.setState({
            curCourse: course
        });
        this.forceUpdate();
    }

    render() {

        return (
            
            <div class = "all"> 
            
                <SearchBar onClick = {this.updateCurCourse}></SearchBar>
                {this.state.curCourse == "" ? <div class = "before-main">start searching</div> : 
                <div class = "main">
                    <WordCloud curCourse = {this.state.curCourse}></WordCloud>
                    <Comment curCourse = {this.state.curCourse}></Comment>
                    
                    <ExternalLink curCourse = {this.state.curCourse}></ExternalLink>
                </div>}
            </div>
        )
    }

}

export default Main;