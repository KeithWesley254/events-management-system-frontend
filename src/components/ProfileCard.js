import { Avatar, Box, Button, Card, Container, Typography } from '@mui/material';
import React from 'react';
import { ThemeState } from '../ThemeContext';

const ProfileCard = ({ userProfile, setIsProfile }) => {
    const { btnColor, btnTextColor, btnHover, cardBg, cardHover, textColor } = ThemeState();

  return (
    <>
        <Card
          sx={{
            height: {xs: "50%", md: "60%"},
            width: {xs: "70%", md: "50%"},
            mt: 15,
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
                width: "100%",
                height: "70%"
            }}>
                <Avatar 
                sx={{
                height: {md:"80%", xs: "80%"}, mt: 2, 
                width: {xs: "90%", md: "80%"},
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
    </>
  )
}

export default ProfileCard