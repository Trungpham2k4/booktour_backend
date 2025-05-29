const express = require("express");

const router = express.Router();

const homepageController = require("../controllers/HomepageController");
const searchPageController = require("../controllers/SearchPageController");   
const commentPageController = require("../controllers/CommentPageController"); 
const authController = require("../controllers/AuthController");
const tourDetailPageController = require("../controllers/TourDetailPageController");

const middleware = require("../middlewares/authMiddleware");

router.get("/getAllHeritage", homepageController.getAllHeritage);
router.post("/searchTour", searchPageController.searchTour);
router.post("/addComment", middleware, commentPageController.addComment);
router.get("/getComments",commentPageController.getComments);
router.post("/searchHeritage", tourDetailPageController.getHeritageDetail);

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);

module.exports = router;
