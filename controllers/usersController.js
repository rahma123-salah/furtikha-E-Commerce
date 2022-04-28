const bcrypt = require("bcrypt");
const User = require('../models/users');

const jwt = require("jsonwebtoken");

require('dotenv').config();

module.exports = {
    signup: (req, res, next) => {
        bcrypt.hash(req.body.password, 10).then(hash => {
            const user = new User({
                Email: req.body.email,
                Password: hash,
                City: req.body.city,
                Name: req.body.name,
                Country: req.body.country,
                Address: req.body.address,
                Phone: req.body.phone,
                IsAdmin: false,
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: "User created!",
                        result: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        })
    },

    login: (req, res, next) => {
        let fetchedUser;
        User.findOne({ Email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                fetchedUser = user;
                return bcrypt.compare(req.body.password, user.Password);
            })
            .then(result => {
                if (!result) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                const token = jwt.sign(
                    { email: fetchedUser.Email, userId: fetchedUser._id, isAdmin: fetchedUser.IsAdmin },
                    "secret_this_should_be_longer",
                    { expiresIn: "1h" }
                );
                res.status(200).json({
                    token: token,
                    expiresIn: 3600,
                    userId: fetchedUser._id,
                    isAdmin: fetchedUser.IsAdmin
                });
            })
            .catch(err => {
                // return res.status(401).json({
                //     message: "Auth failed"
                // });
            });
    },
    addUser: (req, res) => {
        bcrypt.hash(req.body.Password, 10).then(hash => {
            (new User({
                'Name': req.body.Name, 
                'Email' :req.body.Email, 
                'Password': hash, 
                'Address': req.body.Address, 
                'Country': req.body.Country, 
                'City': req.body.City, 
                'Phone': req.body.Phone, 
                'CardNumber': req.body.CardNumber, 
                'Image': req.body.Image,
                'IsAdmin': req.body.IsAdmin})).save()
                .then(result => {
                    res.status(201).json({
                        message: "User created!",
                        result: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        })
    },
    updateUser: (req, res) => {
        User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body })
            .then((user) => { res.send(user) })
            .catch((error) => { console.log(error); })
    },
    deleteUser: (req, res) => {
        User.findByIdAndDelete( req.params.userId )
            .then((user) => user)
            .catch((error) => { console.log(error); })
    },
    getAllUsers: (req, res) =>{
        User.find({})
            .then((users) => { res.send(users) })
            .catch((error) => {{ console.log(error); }})
    },
    getUser: (req, res) => {
        User.findOne({ _id: req.params.userId })
            .then((user) => { res.send(user) })
            .catch((error) => { console.log(error);})
    },
    getUserByName: (req, res) => {
        User.find({ Name: req.params.userName })
            .then((user) => { res.send(user) })
            .catch((error) => { console.log(error); })
    },
    // signup: async (req, res) => {
    //     const { body: { name, email, password, city, country, address, phone } } = req;
    //     console.log(req.body);
    //     const user = await User.findOne({ Email: email });

    //     if (user) {
    //         return res.status(400).send({ error: "Email already exists" });
    //     }
    //     else {
    //         if (!(email && password)) {
    //             return res.status(400).send({ error: "Data not formatted properly" });
    //         }

    //         try {
    //             const data = {
    //                 Email: email,
    //                 Password: password,
    //                 City: city,
    //                 Name: name,
    //                 Country: country,
    //                 Address: address,
    //                 Phone: phone,
    //                 isAdmin: false,
    //             };

    //             const salt = await bcrypt.genSalt(10);

    //             data.Password = await bcrypt.hash(data.Password, salt);

    //             const user = await User.create(data);
    //             const createdUser = await user.save();

    //             // Create token
    //             const token = jwt.sign(
    //                 { email: createdUser.Email, id: createdUser._id, admin: createdUser.IsAdmin }, process.env.TOKEN_KEY, { expiresIn: "2h" }
    //             );
    //             // save user token
    //             createdUser.token = token;

    //             res.send(createdUser);

    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // },

    // login: async (req, res) => {
    //     const body = req.body;
    //     const user = await User.findOne({ email: body.email });
    //     if (user) {
    //         // check user password with hashed password stored in the database
    //         const validPassword = await bcrypt.compare(body.password, user.Password);
    //         if (validPassword) {
    //             // Create token
    //             const token = jwt.sign(
    //                 { email: user.Email, id: user._id, admin: user.IsAdmin }, process.env.TOKEN_KEY, { expiresIn: "2h" }
    //             );

    //             // save user token
    //             user.token = token;

    //             res.status(200).json({ message: "Valid password" });
    //         } else {
    //             res.status(400).json({ error: "Invalid Password" });
    //         }
    //     } else {
    //         res.status(401).json({ error: "There's no User matches this email" });
    //     }
    // },

    // addNewUser: (req, res) => {
    //     User.addNewUser(req.body.Name, req.body.Email, req.body.Password, req.body.Address, req.body.Country, req.body.City, req.body.Phone, req.body.CardNumber, req.body.Image)
    //     .then(() => { 
    //         res.redirect('/login') 
    //     }).catch((error) => {
    //         res.redirect('/signup') 
    //     })
    // },
}

