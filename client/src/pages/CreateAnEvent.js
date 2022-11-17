import React, { useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  Button,
  Typography,
  TextField,
  MenuItem,
  StepButton,
  Stack,
  Input,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  OutlinedInput,
} from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from "react-router-dom";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const steps = ["Main Event Details", "Pricing", "Miscellaneous"];

export default function CreateAnEvent() {
  const [categoryData, setCategoryData] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [formData, setFormData] = useState({
    category_id: '',
    title: '',
    event_start_date: '',
    event_end_date: '',
    ticket_format: '',
    early_booking_end_date: '',
    early_booking_price_regular: '',
    early_booking_price_vip: '',
    location: '',
    regular_price: '',
    vip_price: '',
    vip_no_of_tickets: '',
    regular_no_of_tickets: '',
    description: '',
    banner_img: '',
    image_url1: '',
    image_url2: ''
  });
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  useEffect(() => {
    fetch(`http://localhost:3000/api/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategoryData(data);
      });
  }, []);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? 
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  function handleChange(e){
    setFormData({
        ...formData, [e.target.name]: e.target.value,
    });
  }
  
  const navigate = useNavigate();
  
  function handleSubmit(e, newState){
    e.preventDefault();
    const data = new FormData();
    
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key])
    });

    submitToApi(data, newState);
  }

  function submitToApi(data, newState){
    const token = JSON.parse(localStorage.getItem("token"));

    fetch(`http://localhost:3000/api/events`,{
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: "POST",
        body: data
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setState({ open: true, ...newState });
          navigate("/");
        });
      }}) 
  }

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontWeight: "bolder", fontSize: 15 }}>
          <i>Register your Event</i>
        </h1>
      </div>

      
        <Box sx={{ width: "100%" }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>

          {allStepsCompleted() ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleNext} sx={{ mr: 1 }}>
                    Next
                  </Button>
                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Typography variant="caption" sx={{ display: 'inline-block' }}>
                        Step {activeStep + 1} already completed
                      </Typography>
                    ) : (
                      <Button onClick={handleComplete}>
                        {completedSteps() === totalSteps() - 1
                          ? 'Finish'
                          : 'Complete Step'}
                      </Button>
                    ))}
                </Box>

                <form>

                  <Box sx={{justifyContent: "center", display: "inline-flex", width: "100%", textAlign: "center"}}>
                  {activeStep === 0 && (
                      <React.Fragment>
                        <Box sx={{ width: "35%" }}>
                          <Stack>

                            <FormControl fullWidth sx={{ m: 1}}>
                              <InputLabel id="outlined-required"><span style={{color: "red"}}>*</span> Event Category</InputLabel>
                              <Select 
                              labelId="EventCategory"
                              name='category_id'
                              onChange={handleChange}
                              required
                              label="Event Category"
                              >
                                <MenuItem value="">--Please choose a category--</MenuItem>
                                {categoryData.map((category) => {
                                  return (
                                    <MenuItem key={category.id} value={category.id}>
                                      {category.title}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                              <FormHelperText id="my-helper-text">Please select a category</FormHelperText>
                            </FormControl>
                            
                            <FormControl fullWidth sx={{ m: 1}}>
                              <InputLabel><span style={{color: "red"}}>*</span> Event Title</InputLabel>
                              <OutlinedInput onChange={handleChange} value={formData.title} name="title" label="Event Title" required placeholder="eg. BDO tournament"/>
                              <FormHelperText id="my-helper-text">Please enter the title of the event</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1}}>
                              <InputLabel><span style={{color: "red"}}>*</span> Location</InputLabel>
                              <OutlinedInput name="location" onChange={handleChange} value={formData.location} label="Location" required placeholder="eg. Westlands, Nairobi"/>
                              <FormHelperText id="my-helper-text">Please enter the location of the event</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1}}>
                              <Typography><span style={{color: "red"}}>*</span> Event Start Date</Typography>
                              <Input required type='datetime-local' name="event_start_date" onChange={handleChange} value={formData.event_start_date}/>
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1}}>
                              <Typography><span style={{color: "red"}}>*</span> Event End Date</Typography>
                              <Input required type='datetime-local' name="event_end_date" onChange={handleChange} value={formData.event_end_date}/>
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1}}>
                              <Typography><span style={{color: "red"}}>*</span> Early Booking End Date</Typography>
                              <Input required type='datetime-local' name="early_booking_end_date" onChange={handleChange} value={formData.early_booking_end_date}/>
                            </FormControl>

                          </Stack>
                        </Box>
                      </React.Fragment>
                    )}
                    {activeStep === 1 && (
                      <React.Fragment>
                        <Box sx={{ width: "35%" }}>
                          <Stack>

                            <FormControl fullWidth sx={{ m: 1}}>
                              <InputLabel><span style={{color: "red"}}>*</span> Early Regular Booking Ticket Price ($)</InputLabel>
                              <OutlinedInput label="Early Regular Booking Ticket Price ($)" required min={0} name="early_booking_price_regular" onChange={handleChange} value={formData.early_booking_price_regular} type='number'/>
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1}}>
                              <InputLabel><span style={{color: "red"}}>*</span> Early Vip Booking Ticket Price ($)</InputLabel>
                              <OutlinedInput label="Early Vip Booking Ticket Price ($)" required min={0} name="early_booking_price_vip" onChange={handleChange} value={formData.early_booking_price_vip} type='number'/>
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1}}>
                              <InputLabel><span style={{color: "red"}}>*</span> Regular Price ($)</InputLabel>
                              <OutlinedInput label="Regular Price ($)" required min={0} name="regular_price" onChange={handleChange} value={formData.regular_price} type='number'/>
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1}}>
                              <InputLabel><span style={{color: "red"}}>*</span> Vip Price ($)</InputLabel>
                              <OutlinedInput label="Vip Price ($)" required min={0} name="vip_price" onChange={handleChange} value={formData.vip_price} type='number'/>
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1}}>
                              <InputLabel><span style={{color: "red"}}>*</span> Number of Vip Tickets</InputLabel>
                              <OutlinedInput label="Number of Vip Tickets" required min={0} name="vip_no_of_tickets" onChange={handleChange} value={formData.vip_no_of_tickets} type='number'/>
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1}}>
                              <InputLabel><span style={{color: "red"}}>*</span> Number of Regular Tickets</InputLabel>
                              <OutlinedInput label="Number of Regular Tickets" required min={0} name="regular_no_of_tickets" onChange={handleChange} value={formData.regular_no_of_tickets} type='number'/>
                            </FormControl>

                          </Stack>
                        </Box>

                      </React.Fragment>
                    )}
                    {activeStep === 2 && (
                      <React.Fragment>
                        <Box sx={{ width: "35%" }}>
                          <Stack>

                            <FormControl fullWidth sx={{ m: 1}}>
                              <InputLabel><span style={{color: "red"}}>*</span> Ticket Format</InputLabel>
                              <OutlinedInput label="Ticket Format" required name="ticket_format" onChange={handleChange} value={formData.ticket_format} placeholder='eg. BDOTourney' type='text'/>
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1}}>
                              <TextField label="Description" required name="description" onChange={handleChange} value={formData.description} multiline rows={4} />
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1}}>
                              <InputLabel><span style={{color: "red"}}>*</span> Banner Image Url</InputLabel>
                              <OutlinedInput label="Banner Image Url" required name="banner_img" onChange={handleChange} value={formData.banner_img} type='text'/>
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1}}>
                              <InputLabel><span style={{color: "red"}}>*</span> First Event Image Url</InputLabel>
                              <OutlinedInput label="First Event Image Url" required name="image_url1" onChange={handleChange} value={formData.image_url1} type='text'/>
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1}}>
                              <InputLabel><span style={{color: "red"}}>*</span> Second Event Image Url</InputLabel>
                              <OutlinedInput label="Second Event Image Url" required name="image_url2" onChange={handleChange} value={formData.image_url2} type='text'/>
                            </FormControl>

                            <Box >
                              <FormControl sx={{ m: 1, width: "70%"}}>
                                <Button
                                type='submit'
                                onClick={(e) => {
                                  handleSubmit(e, {
                                    vertical: 'top',
                                    horizontal: 'center',
                                  })
                                }}
                                style={{ 
                                backgroundColor: "#d1410a", 
                                color: "#fff",
                                width: "100%"
                                }}
                                >
                                  Submit
                                </Button>
                              </FormControl>
                            </Box>
                                
                          </Stack>
                        </Box>

                      </React.Fragment>
                      )}
                  </Box>
                </form>
                <Snackbar
                  anchorOrigin={{ vertical, horizontal }}
                  open={open}
                  autoHideDuration={6000}
                  key={vertical + horizontal}
                >
                  <Alert severity="success" sx={{ width: '100%' }}>
                    Event Registered Successfully!
                  </Alert>
                </Snackbar>
              </React.Fragment>
              )}
        </Box>
      
    </>
  );
}
