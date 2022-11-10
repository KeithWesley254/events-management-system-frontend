import { CardMedia, Grid, Typography, Card, CardContent, Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const SpecificCategory = () => {
  const [categoryData, setCategoryData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  const navigate = useNavigate();

  useEffect(()=>{
  fetch(`http://localhost:3000/api/categories/${params.id}`)
  .then(response => response.json())
  .then((data)=> {
    setCategoryData(data)
    setIsLoading(false)
  })
  },[params])

  if(isLoading === true) return (
    <Grid container spacing={2} columns={12}>
      <Grid xs={12} md={12}>
        <Box sx={{ borderRadius: 20, display: "inline-flex", position: "relative", width: "100%", justifyContent: "center", flexDirection: 'row' }}>
          <div style={{marginTop: "25%", display: "inline-flex", justifyContent: "center"}}>
            <div className="loader"></div>
          </div>
        </Box>
      </Grid>
    </Grid>
  )
  return (
    <main>
      <Grid container columns={12}>
        <Grid item xs={6} md={6}>
            <div>
              <Typography style={{display: "inline-block", paddingTop: 150, color: "#fff", fontWeight: "bolder", fontSize: 60, textAlign: "center", width: "100%", height: "405px", backgroundColor: "#d1410a"}}
              >
                {categoryData?.title}
              </Typography>
            </div>
        </Grid>
        <Grid item xs={6} md={6}>
          <div>
            <img 
              src={categoryData?.banner_img}
              alt={categoryData?.title}
              style={{
                width: "100%",
                height: "405px",
                display: "block"
              }}
              />
            </div>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} md={12}>
          <br />
          <Box sx={{ borderRadius: 20, display: "inline-flex", position: "relative", width: "100%", justifyContent: "center", flexDirection: 'row'  }}>
            <div style={{ marginRight: 10, marginLeft: 10, borderRadius: 20, gap: 20, justifyContent: "center", flexWrap: "wrap", display: "inline-flex", flexDirection: 'row' }}>
            {categoryData.events ?
            (
              categoryData.events.map((event) => {

                return (
                  
                      <div key={event.id}>
                        <Card className="homeCard" style={{ 
                          textAlign: "left", 
                          width: 280, 
                          height: 500, 
                          padding: 2, 
                          cursor: "pointer",
                          overflowY: "scroll"
                          }}
                          onClick={() => navigate(`/specific-event/${event.id}`)}
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
                        &nbsp;
                      </div>
                  );
                })
              ) : (
                  <Grid container spacing={2} columns={12}>
                    <Grid item xs={12} md={12}>
                      <div>
                        <Typography>There are no available events currently</Typography>
                      </div>
                    </Grid>
                  </Grid>
              )
              }
              
            </div>
          </Box>
        </Grid>
      </Grid>
    </main>
  )
}

export default SpecificCategory