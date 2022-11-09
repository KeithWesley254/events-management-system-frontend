import * as React from 'react';
import {AppBar, Box, Toolbar, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, LinearProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import { useNavigate } from 'react-router-dom';

const Header = ({ logOut }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setTheUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    fetch('http://localhost:3000/auto_login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
    .then((r) => r.json())
    .then((user) => {
        setTheUser(user)
        setLoggedIn(true)
        setIsLoading(false)
    });

  }, [])

  function handleLogoutClick() {
    setTheUser({})
    logOut();
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  
  const navigate = useNavigate();

  if(isLoading === true) return <LinearProgress style={{backgroundColor: "#d1410a"}} />
  
  return (
    <AppBar position="static" sx={{ bgcolor: "#fff"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <div className='headerLogo' onClick={() => navigate('/')}>
                <p style={{fontWeight: "bolder", fontSize: 14, color: 'black', cursor: "pointer"}}>
                  Events
                  <br />
                  <span style={{ color: "#d1410a", cursor: "pointer" }}>Bomboclat</span>
                </p>
            </div>

          <Box sx={{ flexGrow: 1, alignItems: "center", display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{color: 'black'}}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
                <MenuItem onClick={() => {
                  handleCloseNavMenu()
                  navigate('/')
                  }}>
                  <Typography sx={{ my: 1, display: 'block', fontSize: 14, fontWeight: "bolder", color: 'black' }} textAlign="center">Home</Typography>
                </MenuItem>

                {user?.role === ("admin" || "organizer") ? (
                    <MenuItem  onClick={() => {
                        handleCloseNavMenu()
                        navigate('/create-an-event')
                        }}>
                        <Typography sx={{ my: 1, display: 'block', fontSize: 14, fontWeight: "bolder", color: 'black' }} textAlign="center">Create An Event</Typography>
                    </MenuItem>
                ): (
                    " "
                )}
                
                <MenuItem onClick={() => {
                  handleCloseNavMenu()
                  navigate('/about-us')
                  }}>
                  <Typography sx={{ my: 1, display: 'block', fontSize: 14, fontWeight: "bolder", color: 'black' }} textAlign="center">About Us</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                  handleCloseNavMenu()
                  navigate('/login')
                  }}>
                  <Typography sx={{ my: 1, display: 'block', fontSize: 14, fontWeight: "bolder", color: 'black' }} textAlign="center">LogIn</Typography>
                </MenuItem>
                
            </Menu>
          </Box>
          <TheaterComedyIcon sx={{ display: { xs: 'flex', md: 'none' }, color: "#d1410a", mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'nunito',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'black',
              textDecoration: 'none',
              flexWrap: "wrap"
            }}
          >
            Events 
            <br />
            <span style={{ color: "#d1410a" }}>Bomboclat</span>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: "end" } }}>
            
              <Button
                onClick={() => {
                  handleCloseNavMenu()
                  navigate('/')
                  }}
                sx={{ my: 2, textTransform: "none", display: 'block', fontSize: 14, fontWeight: "bolder", color: 'black' }}
              >
                Home
              </Button>
              &nbsp;
              &nbsp;
              &nbsp;

              {user?.role === ("admin" || "organizer") ? (
                <Button
                    onClick={() => {
                    handleCloseNavMenu()
                    navigate('/create-an-event')
                    }}
                    sx={{ my: 2, textTransform: "none", display: 'block', fontSize: 14, fontWeight: "bolder", color: 'black' }}
                >
                    Create An Event
                </Button>
              ): (
                " "
              )}
              
              &nbsp;
              &nbsp;
              &nbsp;
              <Button
                onClick={() => {
                  handleCloseNavMenu()
                  navigate('/about-us')
                  }}
                sx={{ my: 2, textTransform: "none", display: 'block', fontSize: 14, fontWeight: "bolder", color: 'black' }}
              >
                About Us
              </Button>
              &nbsp;
              &nbsp;
              &nbsp;
              <Button
                onClick={() => {
                  handleCloseNavMenu()
                  navigate('/login')
                  }}
                sx={{ my: 2, textTransform: "none", display: 'block', fontSize: 14, fontWeight: "bolder", color: 'black' }}
              >
                LogIn
              </Button>
            
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">

                {loggedIn ? (
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: {md: 15}}}>
                        <Avatar />
                    </IconButton>
                ): (
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: {md: 15}}}>
                        <Avatar alt={user?.user_profile.full_name} src={user?.user_profile.image_upload} />
                    </IconButton>
                )}

            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" 
                  onClick={() => navigate(`/user-profiles/${user?.id}`)}
                  sx={{ my: 1, display: 'block', fontSize: 14, fontWeight: "bolder", color: 'black' }}
                  >
                    Profile
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" 
                  onClick = {handleLogoutClick}
                  sx={{ my: 1, display: 'block', fontSize: 14, fontWeight: "bolder", color: 'black' }}
                  >
                    Logout
                  </Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;