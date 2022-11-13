import React, { useState } from 'react';
import { Grid, Box, FormControl, FormHelperText, TextField, Alert, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThemeState } from '../ThemeContext';

const SignUpForm = ({ setCurrentUser }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { btnHover, btnColor, subTitles, btnTextColor, mainHeading, formAccent, formTextC, } = ThemeState();
  
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        password_confirmation: passwordConfirmation,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          window.localStorage.setItem("token", JSON.stringify(user.jwt));
          setCurrentUser(user.user);
          navigate('/')
          window.location.reload()
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
   <Box>
    <p style={{fontWeight: "bolder", color: mainHeading, fontSize: 50}}>Sign Up</p>
    <p style={{fontWeight: "bold", color: subTitles, fontSize: 14}}>Join us to add your own events and participate</p>
      <Box sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },
      '& fieldset.MuiOutlinedInput-notchedOutline': {
        borderColor: formAccent,
       }, color: formTextC
      }}>
        <form  onSubmit={handleSubmit}>
          <Box>
            <Grid container spacing={2} columns={12}>
               <Grid item xs={12} md={6}>

              <FormControl>
                <TextField 
                type="email"
                variant="outlined"
                label="Email"
                id="email"
                autoComplete="on"
                value={email}
                sx={{ input: { color: formAccent }, "label": {color: formTextC} }}
                onChange={(e) => setEmail(e.target.value)} 
                />
                <FormHelperText sx={{color: formTextC}} id="my-helper-text">name@example.com</FormHelperText>
              </FormControl>
              <br />
              <FormControl>
                <TextField 
                type="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                value={password}
                sx={{ input: { color: formAccent }, "label": {color: formTextC} }}
                onChange={(e) => setPassword(e.target.value)}
                />
                <FormHelperText sx={{color: formTextC}} id="my-helper-text">min. 8 characters</FormHelperText>
              </FormControl>
              <br />
              <FormControl>
                <TextField 
                type="password"
                label="Password Confirmation"
                id="passwordConfirmation"
                autoComplete="current-password"
                value={passwordConfirmation}
                sx={{ input: { color: formAccent }, "label": {color: formTextC} }}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                <FormHelperText sx={{color: formTextC}} id="my-helper-text">Please Confirm Your Password</FormHelperText>
              </FormControl>
               </Grid>
            </Grid>
            <div>
              <div>
                <FormControl sx={{width: "50%"}}>
                  <Button 
                  sx={{ 
                    width: "100%",
                    height: "50%",
                    my: 2,
                    backgroundColor: btnColor,
                    color: btnTextColor,
                    "&:hover": {backgroundColor: btnHover, }
                  }}
                  type='submit'
                  >
                    {isLoading ? "Loading..." : "Sign Up"}
                  </Button>
                </FormControl>
                <div>
                  {errors.map((err) => (
                  <>
                      <Alert severity="error" sx={{ width: '100%' }}>
                        {err}
                      </Alert>
                  </>
                  ))}
                </div>
              </div>
            </div>
            </Box>
          </form>
      </Box>
   </Box>
  )
}

export default SignUpForm;