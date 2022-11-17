import { Grid, Box, Card, CardMedia, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'

const AboutUs = () => {
  const [communityData, setCommunityData] = useState([]);
  const [aboutUsData, setAboutUsData] = useState([]);
  const [randomIndexCommunity, setRandomIndex] = useState();
  const [randomIndexAbout, setRandomIndexAbout] = useState();

  useEffect(() => {
    changeCommunityImage()
  }, []);

  useEffect(() => {
    changeAboutImage()
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/api/communities`)
    .then(r => r.json())
    .then(data => setCommunityData(data))
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/api/abouts`)
    .then(r => r.json())
    .then(data => setAboutUsData(data))
  }, []);

  function changeAboutImage(){
    const randomNumber = Math.floor(Math.random() * aboutUsData.length);
    setRandomIndexAbout(randomNumber)
  }

  function changeCommunityImage(){
    const randomNumber = Math.floor(Math.random() * communityData.length);
    setRandomIndex(randomNumber)
  }

  return (
    <>
      <Box>
      <br />
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={6}>
            <div style={{
              display: "flex", justifyContent: "center", alignItems: "center", fontSize: 30, fontFamily: "nunito", fontWeight: "bolder"
              }}>
                <p>
                  About Us
                </p>
            </div>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={6}>
            <Box sx={{ml: 4, mr: 4}}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Card sx={{ maxWidth: 400 }}>
                  <CardMedia
                  component="img"
                  height="350"
                  image= {aboutUsData[randomIndexAbout]?.about_img}
                  alt= "about-content"
                  loading="lazy"
                  />
                </Card>
              </div>
            </Box> 
          </Grid>
          <br />
          <Grid item xs={12} md={6}>
            <Box sx={{ml: 4, mr: 4}}>
              <div>
                <Box>
                  <Typography>
                    {aboutUsData[randomIndexAbout]?.about_description}
                  </Typography>
                </Box>
                <br />  
                <Box sx={{display: "flex", justifyContent: "center"}}>
                  <button
                  style={{backgroundColor: "#d1410a", cursor: "pointer", width: "50%", margin: 20, color: "#fff", borderRadius: 10, height: 40, border: "none"}}
                  onClick={changeAboutImage}
                  >
                    See More
                  </button>
                </Box>
              </div>
            </Box> 
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={6}>
            <div style={{
              display: "flex", justifyContent: "center", alignItems: "center", fontSize: 30, fontFamily: "nunito", fontWeight: "bolder"
              }}>
                <p>
                  Community Impact
                </p>
            </div>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={6}>
            <Box sx={{ml: 4, mr: 4}}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Card sx={{ maxWidth: 400 }}>
                  <CardMedia
                  component="img"
                  height="350"
                  image= {communityData[randomIndexCommunity]?.community_img}
                  alt= "community-content"
                  loading="lazy"
                  />
                </Card>
              </div>
            </Box> 
          </Grid>
          <br />
          <Grid item xs={12} md={6}>
            <Box sx={{ml: 4, mr: 4}}>
              <div>
                <Box>
                  <Typography>
                    {communityData[randomIndexCommunity]?.community_description}
                  </Typography>
                </Box>
                <br />  
                <Box sx={{display: "flex", justifyContent: "center"}}>
                  <button
                  style={{backgroundColor: "#d1410a", cursor: "pointer", width: "50%", margin: 20, color: "#fff", borderRadius: 10, height: 40, border: "none"}}
                  onClick={changeCommunityImage}
                  >
                    See More
                  </button>
                </Box>  
              </div>
            </Box> 
          </Grid>
        </Grid>
        <br />
      </Box>
    </>
  )
}

export default AboutUs