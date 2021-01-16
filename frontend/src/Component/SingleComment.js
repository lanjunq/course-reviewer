import React, {Component}from 'react'
import '../App.css';

function SingleComment(props) {
    const {data} = props;     //deconstruct the content 
    console.log(data);
    console.log(props);

    console.log(data.content);
    

    return (
        
        <div class = "comment-line-box">
            <p class = "comment-content">
                {data.content}
            </p>
            <p class = "comment-content source-and-time">
                From {data.source} {data.time}
            </p>


        </div>
    )
}

export default SingleComment;