import React, { useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  Grid,
  StepLabel,
  Button,
  Typography,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";

const steps = ["Main Event Details", "Pricing", "Miscellaneous"];

export default function CreateAnEvent() {
  const [activeStep, setActiveStep] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [skipped, setSkipped] = useState(new Set());

  useEffect(() => {
    fetch(`http://localhost:3000/api/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategoryData(data);
      });
  }, []);
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleSubmit = () => {
    console.log("Yet to Submit");
  };
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontWeight: "bolder", fontSize: 15 }}>
          <i>Register your Event</i>
        </h1>
      </div>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === 0 && (
          <React.Fragment>
            <Box sx={{ mt: 2, mb: 1, width: "50%" }}>
              <Stack>
                <Typography variant="subtitle1">Event Category</Typography>
                <TextField select sx={{ mb: 1.5 }} variant="filled" required>
                  {categoryData.map((category) => {
                    return (
                      <MenuItem key={category.id} value={category.id}>
                        {category.title}
                      </MenuItem>
                    );
                  })}
                </TextField>
                <Typography variant="subtitle1">Event Title </Typography>
                <TextField
                  sx={{ mb: 1.5 }}
                  variant="filled"
                  placeholder="eg. BDO tournament"
                  required
                />
                <Typography variant="subtitle1">Location </Typography>
                <TextField
                  sx={{ mb: 1.5 }}
                  variant="filled"
                  placeholder="eg. Canivore grounds Nairobi"
                  required
                />
                <Typography variant="subtitle1">Event Starting Date</Typography>
                <TextField
                  id="datetime-local"
                  required
                  type="datetime-local"
                  defaultValue="yyyy-mm-ddT--:--"
                  sx={{ width: 250, mb: 1.5 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Typography variant="subtitle1">Event Ending Date</Typography>
                <TextField
                  id="datetime-local"
                  required
                  type="datetime-local"
                  defaultValue="yyyy-mm-ddT--:--"
                  sx={{ width: 250, mb: 1.5 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Typography variant="subtitle1">
                  Early Booking End Date
                </Typography>
                <TextField
                  id="datetime-local"
                  required
                  type="datetime-local"
                  defaultValue="yyyy-mm-ddT--:--"
                  sx={{ width: 250, mb: 1.5 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Stack>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
        {activeStep === 1 && (
          <React.Fragment>
            <Box sx={{ mt: 2, mb: 1, width: "50%" }}>
              <Stack>
                <Typography variant="subtitle1">
                  Early Regular Booking Ticket Price ($)
                </Typography>
                <TextField
                  type="number"
                  min="0"
                  sx={{ mb: 1.5 }}
                  variant="filled"
                  required
                />
                <Typography variant="subtitle1">
                  Early Vip Booking Ticket Price ($)
                </Typography>
                <TextField
                  type="number"
                  min="0"
                  sx={{ mb: 1.5 }}
                  variant="filled"
                  required
                />
                <Typography variant="subtitle1">
                  Vip Booking Ticket Price ($)
                </Typography>
                <TextField
                  type="number"
                  min="0"
                  sx={{ mb: 1.5 }}
                  variant="filled"
                  required
                />
                <Typography variant="subtitle1">
                  Regular Booking Ticket Price ($)
                </Typography>
                <TextField
                  type="number"
                  min="0"
                  sx={{ mb: 1.5 }}
                  variant="filled"
                  required
                />
                <Typography variant="subtitle1">
                  Number of Vip Tickets($)
                </Typography>
                <TextField
                  type="number"
                  min="0"
                  sx={{ mb: 1.5 }}
                  variant="filled"
                  required
                />
                <Typography variant="subtitle1">
                  Number of Regular Tickets($)
                </Typography>
                <TextField
                  type="number"
                  min="0"
                  sx={{ mb: 1.5 }}
                  variant="filled"
                  required
                />
              </Stack>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
        {activeStep === 2 && (
          <React.Fragment>
            <Box sx={{ mt: 2, mb: 1, width: "50%" }}>
              <Stack>
                <Typography variant="subtitle1">Ticket Format</Typography>
                <TextField sx={{ mb: 1.5 }} variant="filled" required />

                <Typography variant="subtitle1">Description</Typography>
                <TextField multiline rows={4} />

                <Typography variant="subtitle1">Banner Image</Typography>
                <TextField sx={{ mb: 1.5 }} variant="filled" required />

                <Typography variant="subtitle1">First Image url</Typography>
                <TextField sx={{ mb: 1.5 }} variant="filled" required />

                <Typography variant="subtitle1">Second Image url</Typography>
                <TextField sx={{ mb: 1.5 }} variant="filled" required />
              </Stack>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Typography sx={{ mt: 2, mb: 1, justifyContent: "center" }}>
                All steps completed
              </Typography>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleSubmit}>Submit</Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </>
  );
}
