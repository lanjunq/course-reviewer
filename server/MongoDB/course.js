const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    course: String,
    comments: [ {
        content: String,
        source: String,
        time: String,
        upvotes: Number
    } ] ,
    word_cloud: [
        [ String, Number ]
    ]
})

module.exports = mongoose.model('Course', courseSchema);


// {
//     'course': String,
//     'comments': [
//         {
//             'content': '',
//             'source': '',
//             'time': ''
//         },
//         {
            
//         },
//     ]
//     'word_cloud': [
//         [ 'word', frequency ],
//         [                   ],
//     ]
// },
// {

// }