import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Box, Grid, Backdrop, Modal, Fade, Button, Typography, Divider } from '@mui/material';
import { gapi } from 'gapi-script'

const SpecificEvent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setTheUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [eventOne, setEventOne] = useState({});

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
              <Typography sx={{ fontFamily: "nunito", fontWeight: "bold", textAlign: {xs: "center", md: "center"}, fontSize: {xs: 15, md: 20} }} variant="subtitle1">
                Location
              </Typography>

              <Typography sx={{ ml: {md: 4}, textAlign: {xs: "center", md: "center"}, fontFamily: "nunito", fontSize: {xs: 15, md: 15} }} variant="body1">
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
              <Typography sx={{ color: "#fff", mt: 5, ml: {md: 4}, textAlign: {xs: "center", md: "center"}, fontFamily: "nunito", fontSize: {xs: 20, md: 20} }} variant="body1">
                {datetime}
              </Typography>
            </Box>
          </Box>

        </Box>
      </Grid>

    </Grid>

   </Grid>
  )
}

export default SpecificEvent;