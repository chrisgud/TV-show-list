const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

module.exports = {

    // Control for registering a new user
    registerUser: function (req, res) {

        // Form validation
        const { errors, isValid } = validateRegisterInput(req.body);

        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        db.User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    return res.status(400).json(
                        {
                            email: "Email already exists"
                        }
                    );
                }
                const newUser = new db.User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                // Hash password before saving in database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            })
    },

    // Control for logging in a user
    loginUser: function (req, res) {

        // Form validation
        const { errors, isValid } = validateLoginInput(req.body);

        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const email = req.body.email;
        const password = req.body.password;

        // Find user by email
        db.User.findOne({ email }).then(user => {

            // Check if user exists
            if (!user) {
                return res.status(404).json({ emailnotfound: "Email not found" });
            }

            // Check password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {

                    // User matched
                    // Create JWT Payload
                    const payload = {
                        id: user.id,
                        name: user.name
                    };

                    // Sign token
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {
                            expiresIn: 31556926 // 1 year in seconds
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        }
                    );
                } else {
                    return res
                        .status(400)
                        .json({ passwordincorrect: "Password incorrect" });
                }
            });
        });
    },

    //Control for adding to Watchlist
    addToWatchlist: function (req, res) {
        const userID = req.user.id;

        // See if the show exists in the Show Collection
        db.Show.findOne({ show: req.body.show })
            .then(show => {
                console.log(show._id)
                // If the show exists, stringify the list of users who have included
                if (show) {
                    showWatchlistUsers = JSON.stringify(show.usersWhoHaveOnWatchlist);

                    // If the user has included it already send back message.
                    if (showWatchlistUsers.includes(userID)) {
                        res.send("User already has on Watch list")
                        // The check the show's _id is on their watchlist
                        db.User.findByIdAndUpdate(userID,

                        )
                    } else {
                        // If user is not already on 
                        db.Show.findOneAndUpdate(
                            // Search for the show object being pushed
                            //TODO: search only for the show.id value
                            {
                                show: req.body.show
                            },
                            // Push the user's ID to the "Has on watchlist" array
                            { $push: { usersWhoHaveOnWatchlist: userID } }
                        )
                            .then(initialSearchRes => {
                                console.log(initialSearchRes);
                                res.send(initialSearchRes);
                            })
                    }
                    // If the show does not exist, add to the database
                } else {
                    db.Show
                        .create({
                            usersWhoHaveOnWatchlist: userID,
                            show: req.body.show
                        })
                        // After it is added, add the show's ID to the user's watchlist
                        .then(dbShow => db.User.findByIdAndUpdate(userID,
                            { $push: { watchList: dbShow._id } },
                            { new: true })
                        )
                        .then(updatedUser => {
                            res.json(updatedUser);
                        })
                        .catch(error => {
                            res.json(error);
                        })
                }
            })
    },


    //First find if the show is in the database
    // db.Show.findOneAndUpdate(
    //     // Search for the show object being pushed
    //     //TODO: search only for the show.id value
    //     {
    //         show: req.body.show
    //     },
    //     // Push the user's ID to the 
    //     { $push: { usersWhoHaveOnWatchlist: userID } }
    // )
    //     .then(initialSearchRes => {

    //         if (!initialSearchRes) {
    //             // res.send("BLAH")
    //             db.Show
    //                 .create({
    //                     usersWhoHaveOnWatchlist: userID,
    //                     show: req.body.show
    //                 })
    //                 .then(dbShow => db.User.findByIdAndUpdate(req.user.id,
    //                     { $push: { watchList: dbShow._id } },
    //                     { new: true })
    //                 )
    //                 .then(updatedUser => {
    //                     res.json(updatedUser);
    //                 })
    //                 .catch(error => {
    //                     res.json(error);
    //                 })
    //         }
    //         else {

    //             res.send(initialSearchRes);

    //         }
    //     }
    //     )

    //Control for adding to favorites
    addToFavorites: function (req, res) {
        const userID = req.user.id;
        console.log(req.body.show)
        // db.Show
        //     .create({
        //         usersWhoHaveFavorited: userID,
        //         show: req.body.show
        //     })
        //     .then(dbShow => db.User.findByIdAndUpdate(req.user.id,
        //         { $push: { favoritedShows: dbShow._id } },
        //         { new: true })
        //     )
        //     .then(updatedUser => {
        //         res.json(updatedUser);
        //     })
        //     .catch(error => {
        //         res.json(error);
        //     })
    },

    //Control for pulling the current user
    currentUser: function (req, res) {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
        });
    },

    //Control for pulling in a user's Watchlist
    currentUserWatchlist: function (req, res) {
        db.User
            .findById(req.user.id)
            .populate("watchList", "show")
            .then(populatedUser => {

                res.json({
                    watchList: populatedUser.watchList,
                    name: populatedUser.name,
                    // email: populatedUser.email
                });
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    },

    //Control for pulling in a user's favorites
    currentUserFavoritedShows: function (req, res) {
        db.User
            .findById(req.user.id)
            .populate("favoritedShows", "show")
            .then(populatedUser => {

                res.json({
                    watchList: populatedUser.favoritedShows,
                    name: populatedUser.name,
                    // email: populatedUser.email
                });
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    },
}
