// Initializing express
const express = require("express")

const router = express.Router()

//importing createToken from the controller
const {createToken} = require("../controller/token")

//specifying the method is a get request that should invoke the createToken function
router.get("/",createToken)

module.exports = router;