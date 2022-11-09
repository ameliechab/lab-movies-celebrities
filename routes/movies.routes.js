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
    const allMovies = await Movie.find().populate("cast");
    console.log(allMovies);
    res.render("movies/movies", { allMovies });
  } catch (error) {
    next(error);
  }
});

// Movies details
router.get("/movies/:id", async (req, res, next) => {
  try {
    const oneMovie = await Movie.findById(req.params.id).populate("cast");
    res.render("movies/movie-details", { oneMovie });
  } catch (error) {
    next(error);
  }
});

//Delete movies

router.post("/movies/:id/delete", async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

//Update movies

router.get("/movies/:id/update", async (req, res, next) => {
  try {
    const myMovie = await Movie.findById(req.params.id);
    const oneCelebrity = await Celebrity.find();

    res.render("movies/edit-movie", { myMovie, oneCelebrity });
  } catch (error) {
    next(error);
  }
});

router.post("/movies/:id/update", async (req, res, next) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    console.log(updatedMovie);
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
