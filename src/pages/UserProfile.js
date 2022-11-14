import { Avatar, Box, Card, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { UserState } from '../UserContext';
import ProfileForm from '../components/ProfileForm';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isProfile, setIsProfile] = useState(true);
  const [formData, setFormData] = useState({
    full_name: '',
    gender: '',
    age: '',
    bio: '',
    mobile_no: '',
    image_upload: ''
  });

  const { user } = UserState();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    if(user.email){
      fetch(`http://localhost:3000/api/user_profiles/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      .then(r => r.json())
      .then(data => {
        setUserProfile(data)
        setIsLoading(false);
      })
    }
  }, [user]);

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
    <Box >
      <Grid container spacing={2} alignItems="center" justify="center" sx={{ height: {md: "100vh"}, minHeight: {xs: "100vh", md: "100vh"} }} columns={12}>

        <Grid item sx={{ display:'flex', height: {md: "100%", xs: "100vh"}, justifyContent:'center' }} xs={12} md={6}>
          {isProfile ?
          (
            <ProfileCard setIsProfile={setIsProfile} userProfile={userProfile}/>
          ) : (
            <ProfileForm setUserProfile={setUserProfile} setIsProfile={setIsProfile} userProfile={userProfile}/>
          )
          }
          

        </Grid>

        <Grid item sx={{ height: "100%" }} xs={12} md={6}>
          
        </Grid>

      </Grid>
    </Box>
  )
}

export default UserProfile;