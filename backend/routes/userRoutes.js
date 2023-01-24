const express = require("express")
const router = express.Router()
const { authUser } = require("../middleware/auth")
const {
    getUser,
    getUserFriends,
    addRemoveFriend
} = require("../controllers/users")

router.get("/:id", authUser, getUser)
router.get("/:id/friends", authUser, getUserFriends)
router.patch("/:id/:friendId", authUser, addRemoveFriend)

module.exports = router

