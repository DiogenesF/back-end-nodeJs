const express = require("express");
const bodyParser = require("body-parser");

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route("/")
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
})
.get((req,res,next) => {
    res.end("Will send you all the promotions!")
})
.post((req,res,next) => {
    res.end("Will add the promotion: " + req.body.promotion);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end("PUT operations not supported on /promotions");
})
.delete((req,res,next) => {
    res.end("Deleting all the promotions!");
});

promoRouter.route("/:promoId")
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next()
})
.get((req,res,next) => {
    res.end("Will send promotion " + req.params.promoId + " to you!");
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end("POST operations not supported on /promotions/" + req.params.promoId);
})
.put((req,res,next) => {
    res.write("You are updating promotion " + req.params.promoId + "\n");
    res.end("Will update the promotion to: " + req.body.promotion);
})
.delete((req,res,next) => {
    res.end("Deleting promotion " + req.params.promoId);
});

module.exports = promoRouter;