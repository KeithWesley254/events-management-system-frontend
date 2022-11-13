import { Alert, Box, Button, FormControl, FormHelperText, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeState } from '../ThemeContext';

const LoginForm = ({ setCurrentUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { btnHover, btnColor, subTitles, btnTextColor, mainHeading, formAccent, formTextC, } = ThemeState();

  const navigate = useNavigate();
  const { state } = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch('http://localhost:3000/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          window.localStorage.setItem("token", JSON.stringify(user.jwt));
          setCurrentUser(user.user);
          navigate(state)
          window.location.reload()
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <>
      <Box>
        <main>
        <form onSubmit = {handleSubmit}>
          <p style={{fontWeight: "bolder", color: mainHeading, fontSize: 60}}>Login</p>
          <p style={{fontWeight: "bold", color: subTitles, fontSize: 14}}>Sign in with the data you entered during your registration</p>
          <Box sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },
          '& fieldset.MuiOutlinedInput-notchedOutline': {
            borderColor: formAccent,
           }, color: formTextC
          }}>
          
            <div>
              
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
            </div>
          </Box>
          
          <br />
          <br />
          <div>
            <FormControl sx={{width: "50%"}}>
              <Button 
              sx={{ 
                width: "100%",
                height: "50%",
                backgroundColor: btnColor,
                color: btnTextColor,
                "&:hover": {backgroundColor: btnHover, }
              }}
              type="submit"
              >
                {isLoading ? "Loading..." : "Login"}
              </Button>
              <br />
            </FormControl>  
            <div>
              {errors.map((err) => (
              <>
                <Alert key={err} severity="error" sx={{ width: '100%' }}>
                  {err}
                </Alert>
              </>
              ))}
            </div>       
          </div>
          </form>
        </main>
      </Box>
    </>
  )
}

export default LoginForm;