import React, { useEffect, useState } from 'react'
import { Box, Grid, LinearProgress } from '@mui/material';
import Carousel from "react-material-ui-carousel";
import Categories from '../components/Categories';
import HomePageEvents from '../components/HomePageEvents';

const Hero = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [homeBanners, setHomeBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/events").then(r => r.json()).then(data => setEvents(data));
    fetch("http://localhost:3000/api/categories").then(r => r.json()).then(data => setCategories(data));
    fetch("http://localhost:3000/api/home_banners").then(r => r.json()).then(data => setHomeBanners(data));
    setIsLoading(false)
  }, []);

  if(isLoading === true) return <LinearProgress style={{backgroundColor: "#d1410a"}} />

  return (
    <main>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} md={12}>
          <Box>
            <Carousel
              autoPlay={true}
              interval={6000}
              animation="slide"
              duration={1000}
              indicators={false}
              swipe={true}
            >
                {(Array.isArray(homeBanners) ? homeBanners : []).map((banner) => {
                  return(
                    <div key={banner.id}>
                      <img 
                        src={banner.image_url}
                        alt={banner.title}
                        style={{
                          width: "100%",
                          height: "auto",
                          maxHeight: "405px",
                        }}
                      />
                    </div>
                  )
                })}
                
            </Carousel>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} md={12}>
          <Box>
            <div style={{fontWeight: "bolder", marginLeft: 40, fontSize: "30px"}}>
              <p>Check out trending categories</p>
            </div>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} md={12}>
          <Box>
            <Categories categories={categories}/>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} md={12}>
          <div style={{fontWeight: "bolder", marginLeft: 40, fontSize: "30px"}}>
            <p>Events available</p>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} md={12}>
          <Box sx={{ borderRadius: 20, display: "inline-flex", position: "relative", width: "100%", justifyContent: "center", flexDirection: 'row'  }}>
            <HomePageEvents events={events}/>
          </Box>
        </Grid>
      </Grid>

    </main>
  )
}

export default Hero