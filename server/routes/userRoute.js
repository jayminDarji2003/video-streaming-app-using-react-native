const express = require('express');
const { signup, login } = require('../controllers/userController');
const videoFileUpload = require("../controllers/videoController");
const { getAllVideos, getLatestVideos, getSingleUserVideos, searchVideo } = require('../controllers/dataControllers');

const router = express.Router();
router.post("/signup", signup)
router.post("/login", login)

router.post("/video-upload", videoFileUpload)

// get all videos
router.get("/videos", getAllVideos)

// get latest video
router.get("/latest-video", getLatestVideos)

// get Single User Videos
router.get("/user/:id", getSingleUserVideos)

// search for videos
router.get("/search", searchVideo)

module.exports = router;