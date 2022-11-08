const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// Create new movies
router.get("/movies/create", async (req, res, next) => {
  const myCelebrity = await Celebrity.find();
  res.render("movies/new-movie", { myCelebrity });
});

router.post("/movies/create", async (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  try {
    await Movie.create({ title, genre, plot, cast });
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

// Listing movies
router.get("/movies", async (req, res, next) => {
  try {
    const allMovies = await Movie.find();
    res.render("movies/movies", { allMovies });
  } catch (error) {
    next(error);
  }
});

// Movies details
router.get("/movies/:id", async (req, res, next) => {
  try {
    const myCast = await Celebrity.find().populate;
    const oneMovie = await Movie.findById(req.params.id);
    res.render("oneMovie", { oneMovie });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
