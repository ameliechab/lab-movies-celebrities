const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

// Create new celebrities
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  try {
    await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect("/celebrities");
  } catch (error) {
    next(error);
  }
});

// Listing celebrities
router.get("/celebrities", async (req, res, next) => {
  try {
    const allCelebrities = await Celebrity.find();
    res.render("celebrities/celebrities", { allCelebrities });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
