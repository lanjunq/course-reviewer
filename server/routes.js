/* ------ imports ------ */
const mongoose = require('mongoose')
const Comment = require('./MongoDB/comment.js')
const mongoDB = require('./MongoDB/atlas_connector.js')


/* ------ GET Handlers ------ */
function getReviews(req, res) {
  let courseNum = req.params.courseNum;

  // Todo: add choose by course number here

  Comment.find()
    .then(data => {
      res.json(data)
    })
    .catch(error => {
      console.log(error);
      res.json(error);
    })
}

function getWordCloud(req, res) {
  res.end()
}

/* ------ POST Handlers ------ */
function postReview(req, res) {
  console.log('postReview() running');
  const review = new Comment({
    _id : new mongoose.Types.ObjectId(),
    content : req.body.content
  });

  review.save().then( (data) => {
    res.json({
      message: 'Data successfully saved to MongoDB!',
      data : data
    })
  }).catch( error => {
    console.log(error);
    res.status(500).json(error);
  })
}


/* ------ exports to index.js ----- */
module.exports = {
  getReviews: getReviews,
  getWordCloud: getWordCloud,
  postReview: postReview,
}
