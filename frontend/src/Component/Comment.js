import React, {Component} from 'react'
import '../App.css';
import SingleComment from './SingleComment';

class Comment extends Component {

    constructor (props) {
        super(props);
        this.state = {
            comment_data: "",
            comment_list: []
        }

    }
       //send api request based on the course used clicked 
       //should retrive a json array similar to the fake_json 

    componentDidMount() {
        // let div_comment_list = fake_json.map((obj, i) => (
        //     <SingleComment data = {fake_json[i]}></SingleComment>
        // ));
        // this.setState({
        //     comment_list: div_comment_list
        // });
        this.fetchCommentList();
            
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.curCourse === this.props.curCourse) {
            return;
        }
        this.fetchCommentList();
        
      }

    fetchCommentList = () => {
        fetch(`http://34.237.86.113:8081/reviews/${this.props.curCourse}`, {
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
    
          .then(reviewData => {

            if (reviewData.length === undefined) {
                this.setState({
                    comment_list: "",
                    comment_data: []
                });
                return;
            }
            let div_comment_list = reviewData.map((obj, i) => (

                <SingleComment key = {i} data = {obj}></SingleComment>
            ));
            this.setState({
                comment_data: reviewData,
                comment_list: div_comment_list
            });
            
          })
          .catch((error) => {
          }); 
    }
    
    handleSortByTime = (e) => {
        var data = this.state.comment_data;
        data.sort((a, b) => (a.time > b.time) ? -1 : 1);
        this.renderCommentLists(data);
    }

    handleSortByUpvote = (e) => {
        var data = this.state.comment_data;
        data.sort((a, b) => (a.upvotes > b.upvotes) ? -1 : 1);
        this.renderCommentLists(data);
    }

    renderCommentLists = () => {
        let div_comment_list = this.state.comment_data.map((obj, i) => (
            <SingleComment key = {i} data = {obj}></SingleComment>
        ));
        this.setState({
            comment_list: div_comment_list
        });
    }




    render () {
      return( 
        <div class = "comment_all">
           
            <div class = "filter-all">
                <div class = "filter-bar">Filter by</div>
                <button class = "filter-bar" onClick = {this.handleSortByTime}>Time</button>
                <button class = "filter-bar" onClick = {this.handleSortByUpvote}>Upvotes</button>
             </div>
             <div id = "no-result"></div> 
            {this.state.comment_list}
        </div>

        
      )
    }
}

export default Comment;
