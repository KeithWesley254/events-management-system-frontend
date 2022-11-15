//importing axios
const axios = require("axios");

//creating an async function to generate Token
//next parameter helps us to move to the nest function which a post request for the stkPush
const createToken = async (req, res, next) => {

      const secret = "tZEG07YBJI428PJR";
      const consumer = "4LymgXU3bRPSNGn7Dxe36oUxoWvIKeGt";
      
      //encoding to base 64 
      const auth = new Buffer.from(`${consumer}:${secret}`).toString("base64");
      console.log(auth);

      await axios
        .get(
          "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
          {
            headers: {
              authorization: `Basic ${auth}`,
            },
          }
        )
        .then((data) => {
          token = data.data.access_token;
          console.log(data.data);
          next();
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json(error.message);
        });
};

//exporting the createToken function
module.exports = { createToken };
