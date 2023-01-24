const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");
const Person = require ("../models/person");

const createToken = function(_id){
    return jwt.sign({ _id }, process.env.Secret, { expiresIn: "3d" })
}

//Register User
const register = async function(req, res){
    try {
    const {
        firstName,
        lastName, 
        email, 
        password, 
        picturePath,
        location, 
        occupation
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    
        const user = new Person({
            firstName,
            lastName, 
            email, 
            password: passwordHash, 
            picturePath,
            location, 
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });
        const savedUser = await user.save();
        res.status(200).json(savedUser)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//Login
const login = async function(req, res){
    try {
        const { email, password } = req.body;
        const user = await Person.findOne({email})
        if(!user){
            return res.status(400).json({ message: "Invalid Email" })
        }
        const compare = await bcrypt.compare(password, user.password)
        if(!compare){
            return res.status(400).json({ message: "Invalid Password" })
        }
        const token = createToken(user._id)
        delete user.password;
        res.status(200).json({ user, token })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    register,
    login
}