import React, {Component}from 'react'
import '../App.css';
import anychart from 'anychart';

var chart = anychart.tagCloud();
class WordCloud extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          init: false
        } 
     }
     componentDidMount() {
       this.componentDidUpdate();
     }

    componentDidUpdate() {
      console.log("within componentDidUpdate" + this.props.curCourse);
      fetch(`http://localhost:8081/wordCloud/${this.props.curCourse}`, {
        method: "GET", // The type of HTTP request.
      })
      .then(res =>
        {
         if (res.status === 401)
          {
           throw new Error("401 error");
          } else {
            console.log("fetched");
            return res.json();
          }
        }) // Convert the response data to a JSON.
  
        .then(courseData => {
          console.log(courseData);
          
          if (courseData.length === undefined) {
            console.log(courseData.length);
            //document.getElementById('container').innerText = "no result";
            courseData = [
              [
                  "",
                  "0"
              ]];
          }
          // else{
          //   document.getElementById('container').innerText = "";
          // }

          
          courseData.map((value, i) => {
            value[0] = value[0].toUpperCase();
            value[1] = parseInt(value[1]);
          })
          console.log("length" + courseData.length);
          chart.title(
                `Words mentioned most frequently by students who have taken ${this.props.curCourse.toUpperCase()}`
          )
          // set array of angles, by which words will be placed
          .id('Container')
          .angles([0])
          // additional empty space in all directions from the text, only in pixels
          .textSpacing(3);
        
        console.log(courseData);
        chart.data(courseData, {
          mode: 'by-word',
          // the ignore items used in this sample can be obtained from the CDN
          // https://cdn.anychart.com/samples/tag-cloud/the-old-man-and-the-sea/ignore-items.js
          
          minLength: 1,
          maxItems: 400
        });
        // set container id for the chart
        chart.container('container');
        // initiate chart drawing
        chart.draw();
        })
        .catch((error) => {
        }); 
    }

    render() {
        //var thisIsMyCopy = '<p>copy copy copy <strong>strong copy</strong></p>';
        var thisIsMyCopy = 
        `<body>\
            <div id="container" style="width: 100%; height: 450px;"> </div>\
            <script src="https://cdn.anychart.com/releases/v8/js/anychart-base.min.js" type="text/javascript"></script>\
            <script>\
            </script>\
        </body>`;
    return (
      <div>
        <div class = "wordcloud_content"  dangerouslySetInnerHTML={{__html: thisIsMyCopy}}>

        </div>
        <div>{this.state.init ? "Start search courses using side bar..." : ""}</div>
      </div>
    )}
}

export default WordCloud;