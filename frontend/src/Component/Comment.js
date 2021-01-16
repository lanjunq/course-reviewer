import React, {Component} from 'react'
import '../App.css';
import SingleComment from './SingleComment';

const fake_json = [
        {
            "content": "Racing car sprays burning fuel into crowd.",
            "source": "Slack",
            "time": "2019-12-03"
        }, 
        {
            "content": "Japanese princess to wed commoner.",
            "source": "Facebook",
            "time": "2020-10-05"
        },
        {
            "content": "Man charged over missing wedding girl.",
            "source": "Facebook",
            "time": "2020-3-25"
        },
    
        {
            "content": "Man charged over missing wedding girl.",
            "source": "Facebook",
            "time": "2020-3-25"
        }
    ];

class Comment extends Component {

    constructor (props) {
        super(props);
        this.state = {
            comment_list: []
        }
    }
       //send api request based on the course used clicked 
       //should retrive a json array similar to the fake_json 

    componentDidMount() {
        let div_comment_list = fake_json.map((obj, i) => (
            <SingleComment data = {fake_json[i]}></SingleComment>
        ));
        this.setState({
            comment_list: div_comment_list
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.curCourse === this.props.curCourse) {
                
            console.log("same");
            return;
        }
        console.log("curCourse" + this.props.curCourse);
        fetch(`http://localhost:8081/reviews/${this.props.curCourse}`, {
          method: "GET", // The type of HTTP request.
        })
        .then(res =>
          {
            console.log(res.status);
           if(res.status===401)
            {
             throw new Error("401 error");
            }else{
              return res.json();
            }
          }) // Convert the response data to a JSON.
    
          .then(reviewData => {
            console.log(reviewData);
            let div_comment_list = reviewData.map((obj, i) => (

                <SingleComment data = {obj}></SingleComment>
            ));
            this.setState({
                comment_list: div_comment_list
            });
            
          })
          .catch((error) => {
          }); 
      }





    render () {
      return( 
        <div class = "comment_all">
            
            <div class = "filter-all">
                <div class = "filter-bar">Filter by</div>
                <div class = "filter-bar">Time</div>
                <div class = "filter-bar">Upvotes</div>
             </div>
            {this.state.comment_list}
        </div>

        
      )
    }
}

export default Comment;