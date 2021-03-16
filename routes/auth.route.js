const express = require("express");
const controller = require("../controllers/auth.controller");

let router = express.Router();

router.get("/signin", controller.signIn);
router.post("/signin", controller.postSignIn);

module.exports = router;
