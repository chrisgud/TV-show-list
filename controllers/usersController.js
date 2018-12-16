// controllers.usersController.js

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

    //  Control for adding to Watchlist
    addToWatchlist: function (req, res) {
        const userID = req.user.id;

        // See if the show exists in the Show Collection
        db.Show.findOne({ show: req.body.show })
            .then(show => {
                // If the show exists, stringify the list of users who have included
                if (show) {
                    const showID = show._id;

                    showWatchlistUsers = JSON.stringify(show.usersWhoHaveOnWatchlist);

                    // If the user has included it already send back message.
                    if (showWatchlistUsers.includes(userID)) {
                        const alreadyOnWatchlistResponse = "User is already on Watch list";

                        // Then check the show's _id is on their watchlist
                        db.User.findById(userID)
                            .then(foundUser => {
                                // Save user's watchlist as an array
                                usersWatchlist = JSON.stringify(foundUser.watchList);

                                // If the show is in the user's watchlist send back basic response
                                if (usersWatchlist.includes(showID)) {
                                    // console.log("Step 1")
                                    res.send(
                                        {
                                            showsWatchlist: alreadyOnWatchlistResponse,
                                            usersWatchList: "User has on watchlist too."
                                        });
                                } else {
                                    // If user does not have on watchlist, add it
                                    db.User
                                        .findByIdAndUpdate(userID,
                                            { $push: { watchList: showID } },
                                            { new: true }
                                        )
                                        .then(userWithShow => {
                                            // console.log("Step 2")
                                            res.send({
                                                showsWatchlist: alreadyOnWatchlistResponse,
                                                usersWatchList: "Show was not on user's watchlist but was added."
                                            })
                                        })
                                        .catch(error => {
                                            // console.log("Step 3")
                                            res.json(error)
                                        })
                                }
                            })
                            .catch(error => {
                                // console.log("Step 4")
                                res.send(error)
                            })

                    } else {
                        // If user is not already on show's user Watchlist
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
                                // Then check the show's _id is on their watchlist
                                db.User.findById(userID)
                                    .then(foundUser => {
                                        // Save user's watchlist as an array
                                        usersWatchlist = JSON.stringify(foundUser.watchList);

                                        // If the show is in the user's watchlist send back basic response
                                        if (usersWatchlist.includes(showID)) {
                                            // console.log("Step 5")
                                            res.send(
                                                {
                                                    showsWatchlist: "User was not on watchlist",
                                                    usersWatchList: "User has on their watchlist already."
                                                }
                                            );
                                        } else {
                                            // Else update user's watchlist to include show
                                            db.User
                                                .findByIdAndUpdate(userID,
                                                    { $push: { watchList: showID } },
                                                    { new: true }
                                                )
                                                .then(userWithShow => {
                                                    // console.log("Step 6")
                                                    res.send(
                                                        {
                                                            showsWatchlist: "Added user to show's watchlist",
                                                            usersWatchList: "Added show to user's watchlist"
                                                        }
                                                    )
                                                })
                                                .catch(error => {
                                                    // console.log("Step 7")
                                                    res.json(error)
                                                })
                                        }
                                    })
                                    .catch(error => {
                                        // console.log("Step 8")
                                        res.json(error)
                                    })
                            })
                            .catch(error => {
                                // console.log("Step 9")
                                res.json(error)
                            })
                    }
                    // If the show does not exist, add to the database with and update user's watchlist
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
                        .catch(error => {
                            // console.log("Step 10");
                            res.json(error)
                        })
                        .then(updatedUser => {
                            // console.log("Step 11");
                            res.json(updatedUser);
                        })
                        .catch(error => {
                            // console.log("Step 12");
                            res.json(error);
                        })
                }
            })
    },

    //Control for adding to favorites
    addToFavorites: function (req, res) {
        const userID = req.user.id;

        // See if the show exists in the Show Collection
        db.Show.findOne({ show: req.body.show })
            .then(show => {
                // If the show exists, stringify the list of users who have included
                if (show) {
                    const showID = show._id;

                    showFavoritesUsers = JSON.stringify(show.usersWhoHaveFavorited);

                    // If the user has included it already send back message.
                    if (showFavoritesUsers.includes(userID)) {
                        const alreadyOnFavoritesResponse = "User is already on favorited list";

                        // Then check the show's _id is on their Favorited
                        db.User.findById(userID)
                            .then(foundUser => {
                                // Save user's favorites as an array
                                usersFavorites = JSON.stringify(foundUser.favoritedShows);

                                // If the show is in the user's Favorites send back basic response
                                if (usersFavorites.includes(showID)) {
                                    // console.log("Step 1")
                                    res.send(
                                        {
                                            showsFavorites: alreadyOnFavoritesResponse,
                                            usersFavorites: "User has Favorited too."
                                        });
                                } else {
                                    // If user does not have on Favorites, add it
                                    db.User
                                        .findByIdAndUpdate(userID,
                                            { $push: { favoritedShows: showID } },
                                            { new: true }
                                        )
                                        .then(userWithShow => {
                                            // console.log("Step 2")
                                            res.send({
                                                showsFavorites: alreadyOnFavoritesResponse,
                                                usersFavorites: "Show was not on user's favorites but was added."
                                            })
                                        })
                                        .catch(error => {
                                            // console.log("Step 3")
                                            res.json(error)
                                        })
                                }
                            })
                            .catch(error => {
                                // console.log("Step 4")
                                res.send(error)
                            })

                    } else {
                        // If user is not already on show's user favorites
                        db.Show.findOneAndUpdate(
                            // Search for the show object being pushed
                            //TODO: search only for the show.id value
                            {
                                "show.id": req.body.show.id
                            },
                            // Push the user's ID to the "Has on favorites" array
                            { $push: { usersWhoHaveFavorited: userID } }
                        )
                            .then(initialSearchRes => {
                                // Then check the show's _id is on their favorites
                                db.User.findById(userID)
                                    .then(foundUser => {
                                        // Save user's favorites as an array
                                        usersFavorites = JSON.stringify(foundUser.favoritedShows);

                                        // If the show is in the user's favorites send back basic response
                                        if (usersFavorites.includes(showID)) {
                                            // console.log("Step 5")
                                            res.send(
                                                {
                                                    showsFavorites: "User was not on Favorites",
                                                    usersFavorites: "User has on their Favorites already."
                                                }
                                            );
                                        } else {
                                            // Else update user's favorites to include show
                                            db.User
                                                .findByIdAndUpdate(userID,
                                                    { $push: { favoritedShows: showID } },
                                                    { new: true }
                                                )
                                                .then(userWithShow => {
                                                    // console.log("Step 6")
                                                    res.send(
                                                        {
                                                            showsFavorites: "Added user to show's favorites",
                                                            usersFavorites: "Added show to user's favorites"
                                                        }
                                                    )
                                                })
                                                .catch(error => {
                                                    // console.log("Step 7")
                                                    res.json(error)
                                                })
                                        }
                                    })
                                    .catch(error => {
                                        // console.log("Step 8")
                                        res.json(error)
                                    })
                            })
                            .catch(error => {
                                // console.log("Step 9")
                                res.json(error)
                            })
                    }
                    // If the show does not exist, add to the database with and update user's Favorites
                } else {
                    db.Show
                        .create({
                            usersWhoHaveOnFavorites: userID,
                            show: req.body.show
                        })
                        // After it is added, add the show's ID to the user's Favorites
                        .then(dbShow => db.User.findByIdAndUpdate(userID,
                            { $push: { favoritedShows: dbShow._id } },
                            { new: true })
                        )
                        .catch(error => {
                            // console.log("Step 10");
                            res.json(error)
                        })
                        .then(updatedUser => {
                            // console.log("Step 11");
                            res.json(updatedUser);
                        })
                        .catch(error => {
                            // console.log("Step 12");
                            res.json(error);
                        })
                }
            })
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

    // Control for removing from a user's watchlist
    currentUserRemoveFromWatchlist: function (req, res) {
        const userID = req.user.id;

        // Find show and pull the user's ID from the show's watchlist
        db.Show.findOneAndUpdate(
            {
                "show.id": req.body.show.id

            },
            { $pull: { usersWhoHaveOnWatchlist: userID } },
            { new: true }
        )
            .then(show => {
                // Then find user and pull the show's ID from the 
                db.User
                    .findByIdAndUpdate(
                        userID,
                        { $pull: { watchList: show._id } },
                        { new: true }
                    )
                    .then(
                        res.json({
                            watchlist: "User Removed from Watchlist",
                            user: "Show removed from user watchlist"
                        })
                    )
                    .catch(err => res.status(422).json(err));
            })
            .catch(err => res.status(422).json(err))
    },

    // Control for pulling a user's needed data for the search function
    currentUserSearchResponse: function (req, res) {
        const userID = req.user.id;

        db.User
            .findById(userID)
            // .populate("favoritedShows", "show")
            .populate("watchList", "show")
            .then(populatedUser => {
                watchlistShowIdArray = [];

                const usersWatchlist = populatedUser.watchList;
                // res.json(typeof usersWatchlist[0]);

                for (i of usersWatchlist) {
                    // console.log(usersWatchlist[i])
                    watchlistShowIdArray.push(i.show.id);
                }

                res.send(watchlistShowIdArray)
            })
    }
}
