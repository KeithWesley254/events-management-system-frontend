import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, Backdrop, Modal, Fade, Button, Typography, Divider } from '@mui/material';
import { gapi } from 'gapi-script';
import BuyTicketForm from '../components/BuyTicketForm';

const SpecificEvent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setTheUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [eventOne, setEventOne] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const params = useParams();

  const CLIENT_ID =
    "447222188463-85lhlk9i68pmspkinnergh07j228n2i7.apps.googleusercontent.com";
  const API_KEY = "AIzaSyDSu0IfbznPAlKhL8LKY6YZuwItkfLwLvE";
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    fetch("http://localhost:3000/auto_login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((r) => r.json())
      .then((user) => {
        setTheUser(user);
        setLoggedIn(true);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/api/events/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setEventOne(data);
        setIsLoading(false);
      });
  }, [params]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const handleAdd = () => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load("calendar", "v3");

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          var event = {
            summary: eventOne.title,
            location: eventOne.location,
            description: eventOne.description,
            colorId: "6",
            start: {
              dateTime: new Date(eventOne.event_start_date).toJSON(),
              timeZone: "Africa/Nairobi",
            },
            end: {
              dateTime: new Date(eventOne.event_end_date).toJSON(),
              timeZone: "Africa/Nairobi",
            },
          };

          var request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          });

          request.execute((event) => {
            window.open(event.htmlLink);
          });
        });
    });
  };
  const navigate = useNavigate();

  function handleBuyTicket() {
    {"error" in user ? (
      navigate("/login")
    ) : (
      handleOpen()
    )}
  }

  var earlyEnding = new Date(eventOne.early_booking_end_date);
  var datetime =
    earlyEnding.toDateString() +
    " " +
    earlyEnding.getHours() +
    ":" +
    earlyEnding.getMinutes() +
    ":" +
    earlyEnding.getSeconds() +
    "0";

  if(isLoading === true) return (
    <Grid container spacing={2} columns={12}>
      <Grid item xs={12} md={12}>
        <Box sx={{ borderRadius: 20, display: "inline-flex", position: "relative", width: "100%", justifyContent: "center", flexDirection: 'row' }}>
          <div style={{marginTop: "25%", display: "inline-flex", justifyContent: "center"}}>
            <div className="loader"></div>
          </div>
        </Box>
      </Grid>
    </Grid>
  );
  
  return (
   <Grid container spacing={2} columns={12}>
    <Grid item xs={12} md={12}>
      <Box>
        <img 
          src={eventOne.banner_img}
          alt={eventOne.title}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "500px",
          }}
        />
      </Box>
    </Grid>

    <Grid container spacing={2} columns={12}>
      <Grid item xs={12} md={12}>
        <Box sx={{ justifyContent: "center", display: "center", textAlign: "center" }}>
          <div>
            <h1
              style={{
                fontWeight: "bolder",
                fontFamily: "nunito",
                fontSize: 40,
              }}
            >
              {eventOne.title}
            </h1>
          </div>
        </Box>
      </Grid>
    </Grid>

    <Grid container spacing={2} columns={12}>

      <Grid item xs={12} md={6}>
        <Box sx={{ justifyContent: {xs: "center", md: "start"}, textAlign: {xs: "center", md: "start"} }}>
          <Typography sx={{ ml: 4, fontWeight: "bold", fontFamily: "nunito", fontSize: {xs: 25, md: 35},}} variant="h2">
            When and Where
          </Typography>
          <br />

          <Grid container spacing={2} columns={6}>
            <Grid item xs={2} md={2}>
              <Typography sx={{ ml: {xs: 4, md: 4}, fontWeight: "bold", textAlign: {xs: "center", md: "center"}, fontFamily: "nunito", fontSize: {xs: 15, md: 20} }} variant="subtitle1">
                Date
              </Typography>

              <Typography sx={{ ml: {xs: 4, md: 4}, textAlign: {xs: "center", md: "center"}, fontFamily: "nunito", fontSize: {xs: 15, md: 15} }} variant="body1">
                {new Date(eventOne.event_start_date).toDateString()}
              </Typography>
            </Grid>

            <Grid item xs={1} md={1}>
              <Divider style={{height:'100%'}} orientation="vertical" flexItem />
            </Grid>

            <Grid item xs={2} md={2}>
              <Typography sx={{ ml: {xs: 4, md: 4}, fontFamily: "nunito", fontWeight: "bold", textAlign: {xs: "center", md: "center"}, fontSize: {xs: 15, md: 20} }} variant="subtitle1">
                Location
              </Typography>

              <Typography sx={{ ml: {xs: 4, md: 4}, textAlign: {xs: "center", md: "center"}, fontFamily: "nunito", fontSize: {xs: 15, md: 15} }} variant="body1">
                {eventOne.location}
              </Typography>
            </Grid>
          </Grid>

        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box sx={{ justifyContent: {xs: "center", md: "center"}, textAlign: {xs: "center", md: "center"} }}>
          <Typography sx={{fontWeight: "bold", fontFamily: "nunito", fontSize: {xs: 25, md: 35},}} variant="h2">
            Early Booking End Date
          </Typography>

          <Box sx={{width: "100%", display: "inline-flex", justifyContent: "center"}}>
            <Box sx={{border: "1 #fff", backgroundColor: "#d1410a", borderRadius: 10, height: "100px", width: "60%", display: "inline-flex", justifyContent: "center", textAlign: "center"}}>
              <Typography sx={{ fontWeight: "bold", color: "#fff", mt: 3, ml: {md: 4}, textAlign: {xs: "center", md: "center"}, fontFamily: "nunito", fontSize: {xs: 20, md: 20} }} variant="body1">
                {datetime}
              </Typography>
              
              {eventOne.early_timer < 0 ? (
                <Typography sx={{ fontWeight: "bold", color: "#fff", mt: 3, ml: {md: 4}, textAlign: {xs: "center", md: "center"}, fontFamily: "nunito", fontSize: {xs: 20, md: 20} }} variant="body1">
                  Early Booking time has passed
                </Typography>
                ) : (
                  <Typography sx={{ fontWeight: "bold", color: "#fff", mt: 3, ml: {md: 4}, textAlign: {xs: "center", md: "center"}, fontFamily: "nunito", fontSize: {xs: 20, md: 20} }} variant="body1">
                    <i>{eventOne.early_timer + " days remaining"}</i>
                  </Typography>
              )}
              
            </Box>
          </Box>

        </Box>
      </Grid>

    </Grid>

    <Grid container spacing={2} columns={12}>
        
        <Grid item xs={12} md={6}>
          <Box sx={{ justifyContent: {xs: "center", md: "start"}, textAlign: {xs: "center", md: "start"} }}>
            <Typography sx={{ ml: 4, fontWeight: "bold", fontFamily: "nunito", fontSize: {xs: 25, md: 35},}} variant="h2">
              Ticket Prices
            </Typography>
            <br />

            <Grid container spacing={2} columns={6}>
              <Grid item xs={2} md={2}>
                <Box sx={{textAlign: "center"}}>
                  <Typography sx={{ ml: {xs: 4, md: 4}, fontFamily: "nunito", fontWeight: "bold", textAlign: {xs: "center", md: "center"}, fontSize: {xs: 15, md: 20} }} variant="subtitle1">
                    <i>Early Booking Prices</i>
                  </Typography>

                  <Typography sx={{ ml: {xs: 4, md: 4}, textAlign: {xs: "center", md: "center"}, fontFamily: "nunito", fontSize: {xs: 15, md: 15} }} variant="body1">
                    <b>Regular Ticket ($):</b> {eventOne.early_booking_price_regular} 
                  </Typography>

                  <Typography sx={{ ml: {xs: 4, md: 4}, textAlign: {xs: "center", md: "center"}, fontFamily: "nunito", fontSize: {xs: 15, md: 15} }} variant="body1">
                    <b>Vip Tickets Price ($):</b> {eventOne.early_booking_price_vip}
                  </Typography>
                </Box>
                
              </Grid>

              <Grid item xs={1} md={1}>
                <Divider style={{height:'100%'}} orientation="vertical" flexItem />
              </Grid>

              <Grid item xs={2} md={2}>

                <Box sx={{textAlign: "center"}}>
                  <Typography sx={{ ml: {xs: 4, md: 4}, fontFamily: "nunito", fontWeight: "bold", textAlign: {xs: "center", md: "center"}, fontSize: {xs: 15, md: 20} }} variant="subtitle1">
                    <i>Regular Ticket Prices</i>
                  </Typography>

                  <Typography sx={{ ml: {xs: 4, md: 4}, textAlign: {xs: "center", md: "center"}, fontFamily: "nunito", fontSize: {xs: 15, md: 15} }} variant="body1">
                    <b>Regular Ticket ($):</b> {eventOne.regular_price}
                  </Typography>
                  <Typography sx={{ ml: {xs: 4, md: 4}, textAlign: {xs: "center", md: "center"}, fontFamily: "nunito", fontSize: {xs: 15, md: 15} }} variant="body1">
                    <b>Vip Tickets Price ($):</b> {eventOne.vip_price}
                  </Typography>
                </Box>
                
              </Grid>
            </Grid>

          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <br />
          <Box sx={{ justifyContent: {xs: "center", md: "center"}, textAlign: {xs: "center", md: "center"} }}>

            <Box sx={{border: 1, borderRadius: 2, height: "100px", width: "60%", display: "inline-flex", justifyContent: "center", textAlign: "center"}}>
              <Button
              sx={{mt: 3, 
              backgroundColor: "#d1410a", 
              color: "#fff",
              width: "50%",
              height: "50%",
              borderRadius: 2,
              ml: {xs: 2, md: 2}, 
              mr: {xs: 2, md: 2},
              "&:hover": {backgroundColor: "black", }
              }}
              onClick={handleBuyTicket}
              >
                Buy Ticket
              </Button>
              &nbsp;
              <Button
              sx={{mt: 3, 
              backgroundColor: "#d1410a", 
              color: "#fff",
              width: "50%",
              height: "50%",
              borderRadius: 2,
              ml: {xs: 2, md: 2}, 
              mr: {xs: 2, md: 2},
              "&:hover": {backgroundColor: "black", }
              }}
              onClick={handleAdd}
              >
                Add to Calendar
              </Button>

              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <Box sx={style}>

                    <BuyTicketForm />

                  </Box>
                </Fade>
              </Modal>
            </Box>

          </Box>
        </Grid>
    </Grid>

    <Grid container spacing={2} columns={12}>
      <Grid item xs={12} md={12}>
        <br />

        <Box sx={{ justifyContent: {xs: "center", md: "center"}, textAlign: {xs: "center", md: "center"} }}>

          <Typography sx={{ fontWeight: "bold", fontFamily: "nunito", fontSize: {xs: 25, md: 35},}} variant="h2">
            About this event
          </Typography>

          <Typography sx={{ ml: {xs: 4, md: 4}, mr: {xs: 4, md: 4}, textAlign: {xs: "center", md: "center"}, fontFamily: "nunito", fontSize: {xs: 15, md: 15} }} variant="body1">
            {eventOne.description}
          </Typography>
        </Box>
        <br />

      </Grid>
    </Grid>

    <Grid container spacing={2} columns={12}>

      <Grid item xs={12} md={6}>
        <Box sx={{ml: {xs: 4, md: 4}, mr: {xs: 2, md: 2},}}>
          <img 
            src={eventOne?.image_url1}
            alt={eventOne?.title}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "500px",
            }}
          />
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box sx={{ml: {xs: 4, md: 4}, mr: {xs: 2, md: 2},}}>
          <img 
            src={eventOne?.image_url2}
            alt={eventOne?.title}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "500px",
            }}
          />
        </Box>
      </Grid>

    </Grid>

   </Grid>
  )
}

export default SpecificEvent;