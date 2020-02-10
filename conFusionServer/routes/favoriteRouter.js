const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("../authenticate");
const favoriteRouter = express.Router();
const Favorite = require("../model/favorites");
const cors = require("./cors");

favoriteRouter.use(bodyParser.json());

favoriteRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.find({})
      .populate("dishes.dish")
      .populate("user")
      .then(
        fav => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(fav);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({
      user: req.user._id
    })
      .then(favorites => {
        if (favorites === null) {
          return Favorite.create({
            user: req.user._id,
            dishes: req.body.map(each => ({ dish: each._id }))
          });
        } else {
          req.body.forEach(each => {
            addDishToFavorites(favorites, each._id);
          });
          return favorites.save();
        }
      })
      .then(
        favorites => {
          Favorite.findById(favorites._id)
            .populate("user")
            .populate("dishes.dish")
            .then(pop => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(pop);
            });
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operations not supported on /favorite");
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.deleteOne({})
      .then(
        resp => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

favoriteRouter
  .route("/:dishId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
      .then(
        favorites => {
          if (!favorites) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            return res.json({ exists: false, favorites: favorites });
          } else {
            if (favorites.dishes.indexOf(req.params.dishId) < 0) {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              return res.json({ exists: false, favorites: favorites });
            } else {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              return res.json({ exists: true, favorites: favorites });
            }
          }
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({
      user: req.user._id
    })
      .then(favorites => {
        if (favorites === null) {
          return Favorite.create({
            user: req.user._id,
            dishes: { dish: req.params.dishId }
          });
        }
        return favorites;
      })
      .then(
        favorites => {
          const dishId = req.params.dishId;
          addDishToFavorites(favorites, dishId);
          favorites.save().then(
            saved => {
              Favorite.findById(saved._id)
                .populate("user")
                .populate("dishes.dish")
                .then(pop => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(pop);
                });
            },
            err => next(err)
          );
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operations not supported on /favorite/" + req.params.dishId);
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({
      user: req.user._id
    })
      .then(
        favorites => {
          if (favorites === null) {
            err = new Error("Dish " + req.params.dishId + " not found!");
            err.status = 404;
            return next(err);
          }
          const dishId = req.params.dishId;
          for (var i = favorites.dishes.length - 1; i >= 0; i--) {
            if (favorites.dishes[i].dish.equals(dishId)) {
              favorites.dishes.id(favorites.dishes[i]._id).remove();
            }
          }
          favorites.save().then(
            saved => {
              Favorite.findById(saved._id)
                .populate("user")
                .populate("dishes.dish")
                .then(pop => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(pop);
                });
            },
            err => next(err)
          );
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

function addDishToFavorites(favorites, dishId) {
  let found = false;
  favorites.dishes.forEach(each => {
    if (each.dish.equals(dishId)) {
      found = true;
    }
  });
  if (!found) {
    favorites.dishes.push({
      dish: dishId
    });
  }
}

module.exports = favoriteRouter;
