const express = require("express");

const router = express.Router();

const homepageController = require("../controllers/HomepageController");

router.get("/getAllHeritage", homepageController.getAllHeritage);

module.exports = router;
