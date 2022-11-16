// Initializing express
const express = require("express")

const router = express.Router()

//importing createToken from the controller
const {createToken, stkPush} = require("../controller/token")

//specifying the method is a post request that should invoke the createToken function
router.post("/",createToken,stkPush)

module.exports = router;