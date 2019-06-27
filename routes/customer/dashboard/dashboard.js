let express = require('express'),
    router = express.Router(),
    Customer = require('../../../moduls/user/customer'),
    Address = require('../../../moduls/user/address'),
    Order   = require('../../../moduls/user/order');

router.get('/', (req, res) => {
    if (!req.user) {
        res.redirect('/');
    } else {
        Order.find({customer: req.user._id})
        .populate('products.productId')
        .exec(function(err, orders) {
            Customer.findOne({_id: req.user._id}).populate('favorites').exec((err, foundCustomer) => {
                if(!err) {
                    res.render('user/userDashboard', {orders: orders, favorites: foundCustomer.favorites});
                }
            })
        });
    }
});

router.delete('/order/:id', function (req, res) {
    Order.findOneAndDelete({_id: req.params.id}, function (err) {
        if(!err) {
            res.redirect('back');
        } else {
            // failed to delete
            res.redirect('back');
        }
    })
});

router.put('/info', (req, res) => {
    let details = req.body;
    // console.log(details.firstname);
    if(details.firstname && details.lastname && details.username
        && details.password && details.email && details.phone && details.idNumber) {
        Customer.findOneAndUpdate({_id: req.session.user._id}, {
            firstname: details.firstname,
            lastname : details.lastname,
            username : details.username,
            password : details.password,
            email    : details.email,
            phone    : details.phone,
            idNumber : details.idNumber
        }, function (err) {
            if(!err) {
                res.status(201).json({
                    message: 'Post created successfully!',
                });
            } else {
                // error in update
            }
        })
    } else {
        // incomplete details
        res.redirect('back');
    }
});

router.post('/address', (req, res) => {
    let details = req.body;
    if(details.province && details.city && details.postalCode
        && details.homePhone && details.address) {
        new Address({
            province   : details.province,
            city       : details.city,
            postalCode : details.postalCode,
            homePhone  : details.homePhone,
            address    : details.address
        }).save(function (err, savedAddress) {
            if(!err) {
                res.status(201).json({
                    message: "Address added successfully!"
                });
                // res.redirect('back')
            } else {
                // error in saving address.
                res.redirect('back')
            }
        })
    } else {
        // incomplete details
        res.redirect('back');
    }
});

router.put('/fav/edit', (req, res)=> {
    Customer.findOne({_id: req.user._id}, (err, foundCustomer) => {
        if(!err) {
            console.log(req.body.favorites);
            foundCustomer.favorites = req.body.favorites;
            foundCustomer.save((err, savedCustomer) => {
                if(!err) {
                    res.redirect('back');
                }
            })
        } else {
            res.redirect('back');
        }
    });
});

router.put('/address/:id', (req, res) => {
    let details = req.body;
    if(details.province && details.city && details.postalCode
        && details.homePhone && details.address) {
        Address.findOneAndUpdate({_id: req.params.id}, {
            province   : details.province,
            city       : details.city,
            postalCode : details.postalCode,
            homePhone  : details.homePhone,
            address    : details.address
        }, function (err) {
            if(!err) {
                res.status(201).json({
                    message: "Address changed successfully!"
                });
                // res.redirect('back')
            } else {
                // error in update
                res.redirect('back')
            }
        })
    } else {
        // incomplete details
        res.redirect('back');
    }
});

router.delete('/address/:id', (req, res) => {
    Address.findOneAndDelete({_id: req.params.id}, function (err) {
        if(!err) {
            res.status(201).json({
                message: "Address deleted successfully!"
            });
        } else {
            // couldn't delete
            res.redirect('back')
        }
    })
});

module.exports = router;
