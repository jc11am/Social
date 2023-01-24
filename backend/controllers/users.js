const Person = require("../models/person")

//getUser
const getUser = async function(req, res){
    try {
        const { id } = req.params
        const user = await Person.findById(id)
        if(!user){
            return res.status(400).json({message: "Not Found"})
        }
        res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
    
}

//get user friends
const getUserFriends = async function(req, res){
    try {
        const { id } = req.params
        const user = await Person.findById(id)
        if(!user){
            return res.status(400).json({message: "Not Found"})
        }
        const friends = await Promise.all(
            user.friends.map((id)=> Person.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }
        ) => {
            return { _id, firstName, lastName, occupation, location, picturePath }
        }
        );
        res.status(200).json(formattedFriends)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

