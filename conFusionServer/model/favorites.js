const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new mongoose.Schema(
  {
    dish: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish"
    }
  },
  {
    timestamps: true
  }
);

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    dishes: [dishSchema]
  },
  {
    timestamps: true
  }
);

var Favorites = mongoose.model("Favorites", favoriteSchema);

module.exports = Favorites;
