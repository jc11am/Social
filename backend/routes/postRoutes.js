const express = require("express")
const router = express.Router()
const authUser  = require("../middleware/auth")
const { 
    getFeedPost,
    getUserPost,
    likePost
 } = require("../controllers/post")

//Get
router.get("/", authUser, getFeedPost);
router.get("/:userId/posts", authUser, getUserPost);

//Patch
router.patch("/:id/like", authUser, likePost);



module.exports = router