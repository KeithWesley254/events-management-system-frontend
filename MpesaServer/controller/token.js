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

const stkPush = async(req,res) => {
    const shortCode = 174379;
    const mobile = req.body.mobile;
    const convertedAmount = req.body.convertedAmount;
     const passkey =
       "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
     const url =
       "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
     const date = new Date();
     const timeStamp =
       date.getFullYear() +
       ("0" + (date.getMonth() + 1)).slice(-2) +
       ("0" + date.getDate()).slice(-2) +
       ("0" + date.getHours()).slice(-2) +
       ("0" + date.getMinutes()).slice(-2) +
       ("0" + date.getSeconds()).slice(-2);

     const password = new Buffer.from(shortCode + passkey + timeStamp).toString(
       "base64"
     );

     const data = {
       BusinessShortCode: shortCode,
       Password: password,
       Timestamp: timeStamp,
       TransactionType: "CustomerPayBillOnline",
       Amount: convertedAmount,
       PartyA: `${mobile}`,
       PartyB: "174379",
       PhoneNumber: `${mobile}`,
       CallBackURL: "http://localhost:7000/token",
       AccountReference: "E.BomboClat",
       TransactionDesc: "Test",
     };
        await axios
          .post(url, data, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
          .then((data) => {
            console.log(data);
            res.status(200).json(data.data);
          })
          .catch((error) => {
            console.log(error);
            res.status(400).json(error.message);
          });

}

//exporting the createToken function
module.exports = { createToken, stkPush };
