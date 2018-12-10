const axios = require("axios");
const router = require("express").Router();
const externalController = require("../../controllers/externalController");

router.get("/omdb/:title", (req, res) => {
    axios
      .get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${req.params.title}`)
      .then(({ data: result }) => res.json(result))
      .catch(err => res.status(422).json(err));
  });

  module.exports = router;