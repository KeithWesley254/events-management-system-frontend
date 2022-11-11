import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePageEvents = ({ events }) => {
  const filteredDates = events.filter((event) => parseInt(event.time_diff) > 0);
  const navigate = useNavigate();

  return (
    <div
      style={{
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 20,
        gap: 20,
        justifyContent: "center",
        flexWrap: "wrap",
        display: "inline-flex",
        flexDirection: "row",
      }}
    >
      {filteredDates.map((event) => {
        return (
          <div key={event.id}>
            <Card
              className="homeCard"
              sx={{
                textAlign: "left",
                width: 280,
                height: 380,
                cursor: "pointer",
                overflowY: "scroll",
                "&:hover": {boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px", }
              }}
              onClick={() => navigate(`/specific-event/${event.id}`)}
            >
              <CardMedia
                component="img"
                height="150px"
                image={event.banner_img}
                alt={event.title}
              />
              <CardContent>
                
                <Typography variant="h1" sx={{ color: "#1d0a3c", fontFamily: "nunito", fontWeight: "bolder", fontSize: 20 }}>
                  {event.title}
                </Typography>
                <br />
                  
                <Typography variant="body1" sx={{ fontSize: 15, color: "#d1410a"}}>
                  {new Date(event.event_start_date).toDateString()}
                </Typography>
                <br />
                
                <Typography variant="body1" sx={{ fontSize: 15, color: "#707286"}}>
                  {event.location}
                </Typography>
                <br />
                
                <Typography variant="body1" sx={{ fontSize: 15, color: "#5072ff"}}>
                  {event.time_diff < 0 ? (
                    <p>Event has passed</p>
                  ) : (
                    <i>{event.time_diff + " days remaining"}</i>
                  )}
                </Typography>

              </CardContent>
            </Card>
            &nbsp;
          </div>
        );
      })}
    </div>
  );
};

export default HomePageEvents;
