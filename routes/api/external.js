const axios = require("axios");
const router = require("express").Router();
const externalController = require("../../controllers/externalController");

router
    .route("/tvMaze/:title")
    .get(externalController.searchShows);

module.exports = router;