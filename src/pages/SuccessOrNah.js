import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const SuccessOrNah = () => {
    const { state } = useLocation();
    const [lastFetch, setLastFetch] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

      const data1 = async () => {
        const token = JSON.parse(localStorage.getItem("token"));

        await fetch(`http://localhost:3000/api/recent-payment/${state?.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        .then(res => res.json())
        .then((data) => {
            const token = JSON.parse(localStorage.getItem("token"));

            fetch(`http://localhost:3000/api/transaction-info?CheckoutRequestID=${data.CheckoutRequestID}&MerchantRequestID=${data.MerchantRequestID}`, {
              headers: {
                Authorization: `Bearer ${token}`
              },
            })
            .then(res => res.json())
            .then((res) => {
              if (res) {
                const token = JSON.parse(localStorage.getItem("token"));
                
                fetch(`http://localhost:3000/api/recent-payment/${state?.id}`, {
                    headers: {
                      Authorization: `Bearer ${token}`
                    },
                  })
                  .then(res => res.json())
                  .then((data) => setLastFetch(data))
                }
              }
            )
          })
      }
      data1();

    }, [state])
    
    console.log(lastFetch)

    if (lastFetch?.code === null){
      return (
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={12}>
            <Box sx={{ borderRadius: 20, display: "inline-flex", position: "relative", width: "100%", justifyContent: "center", flexDirection: 'row' }}>
              <Typography>
                Response Received. If successful, the event will be added to your profile
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )
    } else if (lastFetch?.code === "Request cancelled by user") {
      return(
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={12}>
            <Box>
              Payment Failed!
            </Box>
          </Grid>
        </Grid>
      )
    } else if (lastFetch?.code === "DS timeout user cannot be reached") {
      return (
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={12}>
            <Box>
              Request Timed Out!
            </Box>
          </Grid>
        </Grid>
      )
    } else if (lastFetch?.state === true) {
      return (
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={12}>
            <Box>
                <Box>
                  Payment Successful!
                </Box>
            </Box>
          </Grid>
        </Grid>
      )
    } else if (lastFetch?.code === "The initiator information is invalid.") {
      return (
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={12}>
            <Box>
                <Box>
                  Payment Details are invalid!
                </Box>
            </Box>
          </Grid>
        </Grid>
      )
    }
    else {
      return(
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={12}>
            <Box sx={{ borderRadius: 20, display: "inline-flex", position: "relative", width: "100%", justifyContent: "center", flexDirection: 'row' }}>
              <Typography>
                Response Received. If successful, the event will be added to your profile
              </Typography>
            </Box>
          </Grid>
        </Grid>
      ) 
    }
}

export default SuccessOrNah;