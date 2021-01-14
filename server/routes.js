/* ------ imports ------ */
const mongoose = require('mongoose')
const Comment = require('./MongoDB/comment.js')
const mongoDB = require('./MongoDB/atlas_connector.js')


/* ------ Handlers ------ */
async function getReviews(req, res) {
  let courseNum = req.params.courseNum;
  // Todo: add choose by course number here

  var comments = await Comment.find({})
  res.json(comments)
}

function getWordCloud(req, res) {
  res.end()
}


/* ------ exports to index.js ----- */
module.exports = {
  getReviews : getReviews,
  getWordCloud : getWordCloud,
}
