const Post = require("../models/Post")

//Create Post
const createPost = async function(req, res){
    try {
        const { userId, discription, picturePath } = req.body;

        const user = await Post.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            userPcturePath: user.picturePath,
            discription,
            location: user.location,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save();

        const post = await Post.find();
        res.status(200).json(post);

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//Get feed post
const getFeedPost = async function(req, res) {
    try {
        const post = await Post.find()
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Get user post
const getUserPost = async function(req, res){
    try {
        const { userId } = req.params;
        const post = await Post.find({userId})
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//Like Post
const likePost = async function(req, res){
    try {
        const { id } = req.params;
        const { userId } = req.body;

        const post = await Post.find(id);
        const isLiked = post.likes.get(userId)

        if(isLiked){
            post.likes.delete(userId)
        }else{
            post.likes.set(userId)
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
            )
        res.status(200).json(updatedPost);    
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    createPost,
    getFeedPost,
    getUserPost,
    likePost
}