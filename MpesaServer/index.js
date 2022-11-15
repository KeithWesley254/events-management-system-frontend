//requiring express
const express = require("express");

const app = express();

const tokenRoute = require("./routes/token")
//Specifying the port that the node backend will use
app.listen(7000,()=>{
    console.log("Node Server is running");
})

//specifying the request to be sent
app.get("/",(req,res)=> {
    res.send("Mpesa programming testing")
})

app.use("/token", tokenRoute)