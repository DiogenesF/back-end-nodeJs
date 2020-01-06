const express = require("express");
const bodyParser = require("body-parser");

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route("/")
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
})
.get((req,res,next) => {
    res.end("Will send you all the leaders!")
})
.post((req,res,next) => {
    res.end("Will add the leader: " + req.body.leader);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end("PUT operations not supported on /leaders");
})
.delete((req,res,next) => {
    res.end("Deleting all the leaders!");
});

leaderRouter.route("/:leaderId")
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next()
})
.get((req,res,next) => {
    res.end("Will send leader " + req.params.leaderId + " to you!");
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end("POST operations not supported on /leaders/" + req.params.leaderId);
})
.put((req,res,next) => {
    res.write("You are updating leader " + req.params.leaderId + "\n");
    res.end("Will update the leader to: " + req.body.leader);
})
.delete((req,res,next) => {
    res.end("Deleting leader " + req.params.leaderId);
});

module.exports = leaderRouter;