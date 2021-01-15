// imports
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Course = require('./course');
const db = require('./mongodb_connection');

// constants
const input_path = '../data/cleaned/';

// 
// db();

var files = fs.readdirSync(input_path);
for (file of files) {
    if (file.endsWith('.json')) {
        console.log(file);
        var rawdata = fs.readFileSync(input_path + file);
        var course = JSON.parse(rawdata);
        console.log(course);
        var course = new Course(course);
        course._id = new mongoose.Types.ObjectId();
        course.save().then((data) => {
            console.log('Data successfully saved to mongoDB!');
        }).catch(error => {
            console.log(error);
            resizeBy.status(500).json(error);
        })
    }
}

// let files = // find files at path
// let rawdata = fs.readFileSync(file);