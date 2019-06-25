let mongoose = require('mongoose'),
    Category = require('./moduls/post/category'),
    Admin    = require('./moduls/user/admin');

    let seedDB = function () {
    // connecting to database
    let databaseURL = 'mongodb://127.0.0.1/e-shop'; // change it to your database
    //let databaseURL = 'mongodb://erfan:erfan123@ds115353.mlab.com:15353/e-shop'; // change it to your database

    mongoose.set('useFindAndModify', false);
    mongoose.connect(databaseURL, {useNewUrlParser: true}, function(err) {
        if (err)
            console.log('Unable to Connect to Database');
        else
            console.log('Connected to Database');
    });


    // mongoose.connection.dropDatabase();


    // Category.create({
    //         name: 'root'
    //     }, function (err,createdCategory) {
    //         createdCategory.save(function (err) {
    //             if(err) console.log(err);
    //             else {
    //                 new Admin({
    //                     username: 'erfan',
    //                     password: 'erfan',
    //                     email   : 'erfan@gmail.com'
    //                 }).save(function (err) {
    //                     if(!err) {
    //                         console.log("db seeded.");
    //                     }
    //                 })
    //             }
    //         });
    //     });


};

module.exports = seedDB;
