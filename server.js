const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const URI =
  "mongodb+srv://ajibade:beowulfa@cluster0.w7dpq.mongodb.net/sampleMern?retryWrites=true&w=majority";
//Mongoose
mongoose
  .connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected"));

const movieSchema = mongoose.Schema({
  title: String,
  genre: String,
  year: String,
});

const Movie = mongoose.model("Movie", movieSchema);

//Api route
app.get("/movies", (req, res) => {
  Movie.find().then((movie) => res.json(movie));
});

app.post("/newmovie", (req, res) => {
  const movieUser = new Movie({
    title: req.body.title,
    genre: req.body.genre,
    year: req.body.year,
  });
  movieUser
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Movie.findByIdAndDelete({ _id: id }, (err) => {
    if (!err) {
      console.log("Movie Deleed");
    } else {
      console.log(err);
    }
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log("Listening on Port:" + PORT));
