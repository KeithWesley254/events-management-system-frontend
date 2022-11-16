import {
  Button,
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Axios from "axios"
import React, { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { ThemeState } from "../ThemeContext";

const BuyTicketForm = ({ user, event, handleCloseModal }) => {
  const [vipTickets, setVipTickets] = useState(0);
  const [regularTickets, setRegularTickets] = useState(0);
  const [mobileNumber, setPhoneNumber] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");

  const {
    mainHeading,
    bgColor,
    formAccent,
    formTextC,
    accent,
    textColor,
    btnColor,
    btnHover,
    btnTextColor,
  } = ThemeState();

  let currentDate = new Date().getTime();
  let totalAmount = 0;
  const conditionedPricingVIP =
    parseInt(
      (new Date(`${event.early_booking_end_date}`).getTime() - currentDate) /
        (1000 * 60 * 60 * 24)
    ) > 0
      ? event.early_booking_price_vip
      : event.vip_price;

  const conditionedPricingRegular =
    parseInt(
      (new Date(`${event.early_booking_end_date}`).getTime() - currentDate) /
        (1000 * 60 * 60 * 24)
    ) > 0
      ? event.early_booking_price_regular
      : event.regular_price;

  const vipTicketCount = event.tickets.reduce(
    (previousTicketCount, currentTicketCount) =>
      previousTicketCount + currentTicketCount.number_of_vip_tickets,
    0
  );

  const regularTicketCount = event.tickets.reduce(
    (previousTicketCount, currentTicketCount) =>
      previousTicketCount + currentTicketCount.number_of_regular_tickets,
    0
  );

  totalAmount =
    vipTickets * conditionedPricingVIP +
    regularTickets * conditionedPricingRegular;

  let ticketNumber = vipTicketCount + regularTicketCount;

  const eventTicket = event.ticket_format + `${ticketNumber + 1}`;

  function handleSubmit(e) {
    e.preventDefault();

    if (mobileNumber && convertedAmount) {
      const number = mobileNumber.split("+");
      const mobile = number[1];
      console.log(convertedAmount);
      console.log(mobile)
      Axios.post("http://localhost:7000/token",{
        mobile, convertedAmount
      }).then(response => console.log(response)).catch(error => console.log(error));
    } else {
      console.log("Hello guys");
    }

    const formData = {
      ticket_no: eventTicket,
      user_id: user?.id,
      event_id: event?.id,
      number_of_vip_tickets: parseInt(vipTickets),
      number_of_regular_tickets: parseInt(regularTickets),
    };
    
  }

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "aecf993c34mshd3d18f8add32b27p113fa7jsn644341e81e9c",
        "X-RapidAPI-Host": "currency-converter-by-api-ninjas.p.rapidapi.com",
      },
    };

    fetch(
      `https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=USD&want=KES&amount=${totalAmount}`,
      options
    )
      .then((response) => response.json())
      .then((data) => setConvertedAmount(data.new_amount));
  }, [totalAmount]);

  return (
    <Box sx={{ bgcolor: bgColor }}>
      <DialogTitle sx={{ color: mainHeading }}>
        {event.title} | {event.location} |{" "}
        <span style={{ color: accent, fontWeight: 600 }}>Pay with Mpesa</span>
      </DialogTitle>
      <Divider />

      <form>
        <DialogContent>
          <DialogContentText>
            <InputLabel sx={{ color: textColor }}>
              <b>Ticket No:</b> {eventTicket}
            </InputLabel>
          </DialogContentText>
          <br />

          <DialogContentText>
            <InputLabel sx={{ color: textColor }}>
              <b>Vip Tickets Remaining:</b>{" "}
              {event.vip_no_of_tickets - vipTicketCount}
            </InputLabel>
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={`Vip Ticket ${conditionedPricingVIP}($)`}
            placeholder="Book vip seat"
            type="number"
            min="0"
            sx={{
              mb: 2,
              input: { color: formAccent },
              label: { color: formTextC },
            }}
            fullWidth
            variant="standard"
            onChange={(event) => setVipTickets(event.target.value)}
          />

          <DialogContentText sx={{ color: textColor }}>
            <InputLabel sx={{ color: textColor }}>
              <b>Regular Tickets Remaining:</b>{" "}
              {event.regular_no_of_tickets - regularTicketCount}
            </InputLabel>
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={`Regular Ticket ${conditionedPricingRegular}($)`}
            placeholder="Book regular seat"
            type="number"
            min="0"
            sx={{
              mb: 2,
              input: { color: formAccent },
              label: { color: formTextC },
            }}
            fullWidth
            variant="standard"
            onChange={(event) => setRegularTickets(event.target.value)}
          />

          <DialogContentText>
            <InputLabel sx={{ color: textColor }}>
              <b>Mpesa Mobile Number</b>
            </InputLabel>
          </DialogContentText>

          <PhoneInput
            international
            defaultCountry="KE"
            style={{ marginBottom: 2, height: 50, width: "60%" }}
            value={mobileNumber}
            onChange={setPhoneNumber}
          />

          <DialogContentText>
            <InputLabel sx={{ color: textColor }}>
              <b>Total Amount in Kenyan Shilling</b>
            </InputLabel>
          </DialogContentText>

          <OutlinedInput
            type="number"
            min="0"
            sx={{ mb: 2, width: "60%", input: { color: formAccent } }}
            value={convertedAmount}
          />
        </DialogContent>

        <Divider />

        <DialogActions>
          <Button
            sx={{
              mt: 3,
              backgroundColor: btnColor,
              color: btnTextColor,
              "&:hover": { backgroundColor: btnHover },
            }}
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            sx={{
              mt: 3,
              backgroundColor: btnColor,
              color: btnTextColor,
              "&:hover": { backgroundColor: btnHover },
            }}
            onClick={(e) => {
              handleCloseModal();
              handleSubmit(e);
            }}
          >
            Pay with Mpesa
          </Button>
        </DialogActions>
      </form>
    </Box>
  );
};

export default BuyTicketForm;
