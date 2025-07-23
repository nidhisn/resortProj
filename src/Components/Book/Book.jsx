import React, { useState } from "react";
import styles from "./Book.module.css";
import header from "../../images/header.jpg";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import dayjs from "dayjs";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#1c5666", // your custom primary color (replaces blue)
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#1c5666",
          fontWeight: 300,
          fontSize: "0.9rem",
          letterSpacing: "2px",
          "&.Mui-focused": {
            color: "#1c5666",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-input": {
            color: "#1c5666",
            fontWeight: 500,
          },
          "& .MuiSvgIcon-root": {
            color: "#1c5666",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1c5666", // default
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1c5666", // hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1c5666", // focused
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          caretColor: "#1c5666", // text cursor color
        },
      },
    },
  },
});

export default function Book() {
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);

  const handleBooking = () => {
    const formattedArrival = arrivalDate?.format("YYYY-MM-DD");
    const formattedDeparture = departureDate?.format("YYYY-MM-DD");

    const message = `Hello! I'd like to book my stay.\n\nArrival Date: ${formattedArrival}\nDeparture Date: ${formattedDeparture}\nAdults: ${adults}\nChildren: ${children}\nBabies: ${babies}`;

    const whatsappUrl = `https://wa.me/91xxxxxxxxxx?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <ThemeProvider theme={customTheme}>
      <div className={styles.bookingContainer}>
        <div className={styles.header}>
          <img src={header} alt="header" />
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.headerSection}>
            <div className={styles.title}>
              <h1>Book my stay</h1>
            </div>

            <div className={styles.noticeBox}>
              <p>
                <span className={styles.warningText}></span> If you have any
                questions about the stay, don't hesitate to{" "}
                <a href="/faq">consult the FAQ</a>.
              </p>
            </div>
          </div>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className={styles.formSection}>
              <h3>DATES OF YOUR STAY AT THE RESORT</h3>
              <div className={styles.dateRow}>
                <div className={styles.formGroup}>
                  <DatePicker
                    label="Arrival Date *"
                    value={arrivalDate}
                    onChange={(newValue) => setArrivalDate(newValue)}
                    format="DD-MM-YYYY"
                    disablePast
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      },
                    }}
                  />
                </div>

                <div className={styles.formGroup}>
                  <DatePicker
                    label="Departure Date *"
                    value={departureDate}
                    onChange={(newValue) => setDepartureDate(newValue)}
                    format="DD-MM-YYYY"
                    disablePast
                    minDate={arrivalDate || dayjs()}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      },
                    }}
                  />
                </div>
              </div>

              <p className={styles.infoText}>
                For more information about the stay, please visit{" "}
                <a href="/resort">THE SANDBANK RESORT</a>
              </p>

              <div className={styles.formGroup}>
                <label>Number of Adults *</label>
                <select
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} adult{i > 0 ? "s" : ""}
                    </option>
                  ))}
                </select>
                <p className={styles.subText}>People aged 12 and over</p>
              </div>

              <div className={styles.formGroup}>
                <label>Number of Children *</label>
                <select
                  value={children}
                  onChange={(e) => setChildren(e.target.value)}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i}>
                      {i} child{i !== 1 ? "ren" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleBooking}
                className={styles.bookNow}
                disabled={!arrivalDate || !departureDate}
              >
                Book via WhatsApp
              </button>
            </div>
          </LocalizationProvider>
        </div>
      </div>
    </ThemeProvider>
  );
}
