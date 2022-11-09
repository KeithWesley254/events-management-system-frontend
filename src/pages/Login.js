import React, { useEffect, useState } from 'react'
import { Grid, Box, Button } from '@mui/material';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

const Login = ({ setCurrentUser }) => {

  const [showLogin, setShowLogin] = useState(true);
  
  return (
    <>
      <main>
        <Box >
          <Grid container spacing={2} columns={12}>
            <Grid item xs={12} md={6}>

              {showLogin ? (
                <>
                <div className='loginForm'>
                  <LoginForm setCurrentUser={setCurrentUser} />
                </div>
                <div className='loginForm'>
                  <p>
                    Don't have an account? &nbsp;
                    <Button sx={{bgcolor: "transparent", color: "#d1410a", fontFamily: "Nunito", fontWeight: "bold", fontSize: 14, textTransform: "none" }} onClick={() => setShowLogin(false)}>
                      Sign Up
                    </Button>
                  </p>
                </div>
                </>
              ): (
                <>
                <div className='loginForm'>
                  <SignUpForm setCurrentUser={setCurrentUser} />
                </div>
               
                <div className='loginForm'>
                  <p>
                    Already have an account? &nbsp;
                    <Button sx={{bgcolor: "transparent", color: "#d1410a", fontFamily: "Nunito", fontWeight: "bold", fontSize: 14, textTransform: "none" }} onClick={() => setShowLogin(true)}>
                      Log In
                    </Button>
                  </p>
                </div>
                </>
              )}

            </Grid>
            <Grid item xs={12} md={6}>
              <>
              <Box sx={{bgcolor: "#d1410a", pt: 10 }}>
                <h1>Image Section</h1>
              </Box>
              </>
            </Grid>
          </Grid>
        </Box>
      </main>
    </>
  )
}

export default Login;