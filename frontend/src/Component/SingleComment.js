import React, {Component}from 'react'
import '../App.css';
import upvoteIcon from '../arrowup.png'

function SingleComment(props) {
    const {data} = props;     //deconstruct the content 

    return (
        
        <div class = "comment-line-box">
            
            <p class = "comment-content">
                {data.content}
            </p>
            <p class = "comment-content source-and-time">
                From {data.source}  {data.time}  
            </p>
            <img id = "upvote" src={upvoteIcon}/>  
            <p id = "upvote_count" class = "comment-content source-and-time">
                {data.upvotes}
            </p>


        </div>
    )
}

export default SingleComment;