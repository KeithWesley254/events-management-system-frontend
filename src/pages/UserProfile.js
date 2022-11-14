import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { UserState } from '../UserContext';
import ProfileForm from '../components/ProfileForm';
import UserEvents from './UserEvents';
import OrganizerEvents from './OrganizerEvents';

const UserProfile = () => {
  const [isProfile, setIsProfile] = useState(true);

  const { user, userProfile, setUserProfile } = UserState();

  if (userProfile){
    return (
      <Box >
        <Grid container spacing={2} alignItems="center" justify="center" sx={{ height: {md: "100vh"}, minHeight: {xs: "100vh", md: "100vh"} }} columns={12}>

          <Grid item sx={{ display:'flex', height: {md: "100%", xs: "100vh"}, justifyContent:'center' }} xs={12} md={6}>
            {isProfile ?
            (
              <ProfileCard setIsProfile={setIsProfile} userProfile={userProfile}/>
            ) : (
              <ProfileForm user={user} setUserProfile={setUserProfile} setIsProfile={setIsProfile} userProfile={userProfile}/>
            )
            }
            

          </Grid>

          <Grid item sx={{ height: "100%" }} xs={12} md={6}>

            {user?.role === ('admin' || 'organizer') &&
            (
              <Box sx={{width: "100%"}}>
                <OrganizerEvents userProfile={userProfile}/>
              </Box> 
            ) 
            }
            <Box>
              <UserEvents userProfile={userProfile}/>
            </Box>

          </Grid>

        </Grid>
    </Box>
    )
  }
}

export default UserProfile;