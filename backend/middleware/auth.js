const jwt = require("jsonwebtoken")
const Person = require ("../models/person");

const authUser = async function( req, res, next ){
    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({ message: "Not Authenticated" })
    }

    const token = authorization.split(" ")[1]

    try {
        const verified = jwt.verify(token, process.env.Secret)
        req.user = verified;

        next()
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

module.exports = authUser