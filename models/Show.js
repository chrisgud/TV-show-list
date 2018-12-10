const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const showSchema = new Schema({
  usersWhoHaveFavorited: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users"
    }
  ],
  usersWhoHaveOnWatchlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users"
    }
  ],
  imdbID: String,
  title: { type: String, required: true },
  rated: String,
  released: Date,
  runTime: String,
  genre: [
    { type: String, required: true }
  ],
  directors: [
    { type: String }
  ],
  writers: [
    { type: String, required: true }
  ],
  actors: [
    { type: String, required: true }
  ],
  plot: String,
  language: [
    { type: String }
  ],
  country: [
    { type: String }
  ],
  awards: [
    { type: String }
  ],
  poster: String,
  link: String,
  date: { type: Date, default: Date.now },
  ratings: [
    { type: String, required: true }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

const Show = mongoose.model("tvShow", showSchema);

module.exports = Show;
