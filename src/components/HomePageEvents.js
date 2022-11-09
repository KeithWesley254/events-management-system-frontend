import { Card, CardContent, CardMedia } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

const HomePageEvents = ({events}) => {
    const filteredDates = events.filter((event)=> 
     (parseInt(event.time_diff) > 0)
    )

  return (
        <div style={{ marginRight: 10, marginLeft: 10, borderRadius: 20, gap: 20, justifyContent: "center", flexWrap: "wrap", display: "inline-flex", flexDirection: 'row' }}>
          {filteredDates.map((event) => {
              return (
                <div key={event.id}>
                
                  <Link style={{textDecoration: "none"}} href={`/specificevent/${event.id}`}>
                      
                        <Card className="homeCard" style={{ 
                          textAlign: "left", 
                          width: 280, 
                          height: 500, 
                          padding: 2, 
                          cursor: "pointer",
                          overflowY: "scroll"
                          }}
                        >
                            <CardMedia
                                component="img"
                                height="200px"
                                image={event.banner_img}
                                alt={event.title}
                            />
                            <CardContent>
                                <div style={{fontFamily: "nunito"}}>
                                    <h1 style={{fontWeight: "bolder", fontSize: "15"}}>{event.title}</h1>
                                    <p style={{fontSize: 15}}><b><i>Date</i></b></p>
                                    <p>{new Date(event.event_start_date).toDateString()}</p>
                                    <p style={{color: "#d1410a"}}>{event.time_diff < 0 ?
                                    (<p>Event has passed</p>)
                                    : (
                                        <i>{event.time_diff + " days remaining"}</i>
                                    )
                                    }
                                    </p>
                                    <p style={{fontSize: 15}}><b><i>Location</i></b></p>
                                    <p>{event.location}</p>
                                </div>
                            </CardContent>
                            
                        </Card>
                  </Link>
                  &nbsp;
                  
                </div>
              );
          })}
        </div>
  )
}

export default HomePageEvents;