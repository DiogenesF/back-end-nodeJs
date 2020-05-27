const express = require("express");
const cors = require("cors");
const app = express();

const whitelist = [
  "http://localhost:3000",
  "https://localhost:3000",
  "https://localhost:3443",
  "http://localhost:3443",
  "http://localhost:3001",
  "https://localhost:3001",
  "https://localhost:4200",
  "https://localhost:3444",
  "http://localhost:4200",
  "http://localhost:3444",
  "http://DESKTOP-97LNMPP:3001",
  "https://DESKTOP-97LNMPP:3001",
  "https://DESKTOP-97LNMPP:3000",
  "http://DESKTOP-97LNMPP:3000"
];
var corsOptionsDelegate = (req, callback) => {
  var corsOptions;

  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
