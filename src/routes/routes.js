const express = require("express");

const router = express.Router();

const homepageController = require("../controllers/HomepageController");
const searchPageController = require("../controllers/SearchPageController");   
const commentPageController = require("../controllers/CommentPageController"); 
const authController = require("../controllers/AuthController");
const tourDetailPageController = require("../controllers/TourDetailPageController");
const bookingPageController = require("../controllers/BookingPageController");
const paymentController = require("../controllers/PaymentController");

const middleware = require("../middlewares/authMiddleware");

router.get("/getAllHeritage", homepageController.getAllHeritage);
router.post("/searchTour", searchPageController.searchTour);

router.post("/addComment", middleware, commentPageController.addComment);
router.get("/getComments", middleware, commentPageController.getComments);

router.post("/searchHeritage", tourDetailPageController.getHeritageDetail);


router.post("/getTour", middleware,  bookingPageController.getTourById);
router.post("/getAllBookedTours", middleware,  bookingPageController.getAllBookedTours);
router.get("/getTransport", middleware, bookingPageController.getTransport);
router.get("/getTourGuide", middleware, bookingPageController.getTourGuide);
router.get("/getTourType", middleware,  bookingPageController.getTourType);
router.post("/saveBooking", middleware, bookingPageController.saveBooking);


router.post("/getBookedTourById", middleware, paymentController.getBookedTourById);
router.post("/processPayment", middleware, paymentController.processPayment);

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);

module.exports = router;
