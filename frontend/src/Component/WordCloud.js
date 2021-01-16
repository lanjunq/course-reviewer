import React, {Component}from 'react'
import '../App.css';
import anychart from 'anychart';

var chart = anychart.tagCloud();
class WordCloud extends Component {
    
    constructor(props) {
        super(props);
        this.state = {

        }
        
        
     }
    componentDidMount() {
        
    }

    componentDidUpdate() {

      fetch(`http://localhost:8081/wordCloud/${this.props.curCourse}`, {
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
  
        .then(courseData => {
          courseData.map((value, i) => {
            value[0] = value[0].toUpperCase();
            value[1] = parseInt(value[1]);
          })
          // map to anyChart 
          
            var data = [
                [
                  "fish",
                  271
                ],[
                  "with",
                  205
                ]
                ];
            
          chart.title(
                `Words mentioned most frequently by students who have taken this course`
          )
          // set array of angles, by which words will be placed
          .id('Container')
          .angles([0])
          // additional empty space in all directions from the text, only in pixels
          .textSpacing(3);
        // set data with settings
        chart.data(courseData, {
          mode: 'by-word',
          // the ignore items used in this sample can be obtained from the CDN
          // https://cdn.anychart.com/samples/tag-cloud/the-old-man-and-the-sea/ignore-items.js
          
          minLength: 1,
          maxItems: 150
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
            <div id="container" style="width: 100%; height: 450px;"></div>\
            <script src="https://cdn.anychart.com/releases/v8/js/anychart-base.min.js" type="text/javascript"></script>\
            <script>\
                );\
            </script>\
        </body>`;
    return (
      <div>
        <div class = "wordcloud_content"  dangerouslySetInnerHTML={{__html: thisIsMyCopy}}>
          </div>
            <div key = {this.props.curCourse}>
          </div>
        </div>
    )}
}

export default WordCloud;