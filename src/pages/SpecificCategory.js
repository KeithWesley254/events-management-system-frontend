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
      <Grid item xs={12} md={12}>
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
            
            <Box sx={{textAlign: {xs: "center", md: "center" } }}>
              <Box sx={{height: {xs: "200px", md: "450px"}, backgroundColor: "#d1410a", width: "100%", display: "inline-flex", justifyContent: "center", textAlign: "center" }}>
                <Typography sx={{ pt: {xs: 8, md: 20}, color: "#fff", fontWeight: "bolder", fontSize: {xs: 40, md: 60} }}>
                  {categoryData?.title}
                </Typography>
              </Box>
              
            </Box>
            
          </Grid>

          <Grid item xs={6} md={6}>

            <Box sx={{textAlign: {xs: "center", md: "center" } }}>
              <Box sx={{height: {xs: "200px", md: "450px"}, width: "100%", display: "inline-flex", justifyContent: "center", textAlign: "center" }}>
                <Typography>
                    <CardMedia
                      component="img"
                      alt={categoryData?.title}
                      sx={{height: {xs: "200px", md: "450px"} }}
                      image={categoryData?.banner_img}
                    />
                </Typography>
              </Box>
              
            </Box>
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
                            
                            <Typography variant="body1" sx={{ fontSize: 15, color: "#0724ea"}}>
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