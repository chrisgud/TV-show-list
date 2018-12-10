const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const passport = require("passport");

// @route POST api/users/register
// @desc Register user
// @access Public
router
    .route("/register")
    .post(usersController.registerUser)

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router
    .route("/login")
    .post(usersController.loginUser);

// @route GET api/users/currentuser
// @desc Return current user
// @access Private
router
    .route("/currentUser")
    .get(
        passport.authenticate("jwt", { session: false }),
        usersController.currentUser
    )

router
    .route("/currentUserWatchlist")
    .get(
        passport.authenticate("jwt", { session: false }),
        usersController.currentUserWatchlist
    )

router
    .route("/currentUserFavortiedShows")
    .get(
        passport.authenticate("jwt", { session: false }),
        usersController.currentUserFavoritedShows
    )

module.exports = router;

