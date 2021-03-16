const express = require("express");
const controller = require("../controllers/weather.controller");

let router = express.Router();

router.get("/", controller.getWeather);

module.exports = router;
