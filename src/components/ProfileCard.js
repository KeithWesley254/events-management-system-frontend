import { Avatar, Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { ThemeState } from '../ThemeContext';

const ProfileCard = ({ userProfile, setIsProfile }) => {
    const { btnColor, btnTextColor, btnHover, cardBg, cardHover, textColor } = ThemeState();

  return (
    <Grid container spacing={2} columns={12}>
        <Grid item xs={12} md={12}>
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <Card
                className="homeCard"
                sx={{
                    mt: 15,
                    width: {md: "60%", xs: "90%"},
                    height: 500,
                    textAlign: "center",
                    bgcolor: cardBg,
                    cursor: "pointer",
                    overflowY: "scroll",
                    "&:hover": {boxShadow: cardHover, }
                }}
                >
                    <Box sx={{
                        display:'flex', 
                        justifyContent:'center',
                        width: {xs:"100%", md: "100%"},
                        height: {xs:"75%", md: "70%"}
                    }}>
                        <Avatar 
                        sx={{
                        height: {xs:"80%", md: "80%"},
                        mt: 2,
                        width: {xs: "80%", md: "75%"},
                        }}
                        src={userProfile?.image_upload}
                        alt={userProfile?.full_name}
                        />
                    </Box>

                    <Container>
                        <Typography sx={{color: textColor, fontSize: {xs: 25, md: 30}, fontWeight: "bolder"}}>
                            {userProfile?.full_name}
                        </Typography>
                    </Container>

                    <Container sx={{mt: 2}}>
                        <Button
                        sx={{
                            color: btnTextColor,
                            backgroundColor: btnColor,
                            "&:hover": {backgroundColor: btnHover, }
                        }}
                        onClick={() => {
                            setIsProfile(false)
                        }}
                        >
                            Edit Profile
                        </Button>
                    </Container>
                </Card>
            </Box>
        </Grid>
    </Grid>
        
  )
}

export default ProfileCard