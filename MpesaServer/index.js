//requiring express
const express = require("express");

const app = express();

const cors = require("cors")

const tokenRoute = require("./routes/token")
//Specifying the port that the node backend will use
app.listen(7000,()=>{
    console.log("Node Server is running");
})

app.use(express.json())

app.use(cors())
//specifying the request to be sent
app.get("/",(req,res)=> {
    res.send("Mpesa programming testing")
})

app.use("/token", tokenRoute)