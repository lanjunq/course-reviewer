/* ------ imports ------ */
const mongoose = require('mongoose')
const Review = require('./MongoDB/review.js')
const mongoDB = require('./MongoDB/mongodb_connection.js')


/* ------ GET Handlers ------ */
function getReviews(req, res) {
  let courseNum = req.params.courseNum;

  // Todo: add choose by course number here

  Review.find()
    .then(data => {
      res.json(data)
    })
    .catch(error => {
      console.log(error);
      res.json(error);
    })
}

function getWordCloud(req, res) {

  // Todo: implement the logic here

  res.end()
}

/* ------ POST Handlers ------ */
function postReview(req, res) {
  console.log('postReview() running');
  const review = new Review({
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
