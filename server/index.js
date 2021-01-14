const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');
const mongoose = require("mongoose");
// const favorites = require("./mongo-routes");

const app = express();

app.use(cors({ credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to mongodb
// const mongoDB = require('./MongoDB/atlas_connector')
// const db = require("./mongodb-config").mongoURI;
// mongoose.connect(db,
//     { useNewUrlParser: true }
// )
//   .then(() => console.log("MongoDB successfully connected"))
//   .catch(err => console.log(err));


/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */
// app.use(favorites);

app.get("/wordCloud/:courseNum", routes.getWordCloud);
app.get("/reviews/:courseNum", routes.getReviews);

app.post("/review", routes.postReview);

app.get('*', (req, res) => res.status(404).send({ msg: `Page ${req.url} not found.` }));
app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});