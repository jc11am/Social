const express = require ("express");
const bodyParser = require ("body-parser");
const mongoose = require ("mongoose");
const cors = require ("cors")
const dotenv = require ("dotenv")
const multer = require ("multer");
const helmet = require ("helmet")
const morgan = require ("morgan");
const path = require ("path");
const { fileURLToPath } =  require ("url");
const { register } = require("./controllers/auth")
const authRouter = require("./routes/routes")
const userRoutes = require("./routes/userRoutes")

//middleware
dotenv.config();
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use("/assests", express.static(path.join(__dirname, "public/assets")));

//file storage
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});
const upload = multer({ storage })

//routes
app.post("/api/register", upload.single("picture"), register)
app.use("/api", authRouter)
app.use("/users", userRoutes)

const PORT = process.env.Port

mongoose.set("strictQuery", true)

mongoose.connect(process.env.Database,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(function(){
        app.listen(PORT || 4000, function(){
            console.log("success")
        })
    })
    .catch(function(error){
        console.log(error.message)
    })
