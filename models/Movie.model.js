const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    title: String,
    genre: String,
    plot: String,
    cast: {
      type: Schema.Types.ObjectId,
      ref: "Celebrity",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Movie = model("Movie", movieSchema);

module.exports = Movie;