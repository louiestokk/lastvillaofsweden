import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MuiThemeProvider, createTheme, Typography } from "@material-ui/core";
import Home from "./pages/Home";
import Confirmation from "./pages/Confirmation";
import Payment from "./pages/Payment";
const fontRight = "'Righteous', cursive";
const fontOpen = "'Open Sans', sans-serif";
const theme = createTheme({
  typography: {
    fontFamily: fontRight
  }
});
const App = () => {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/checkout" element={<Payment />} />
          </Routes>
        </div>
      </MuiThemeProvider>
    </Router>
  );
};

export default App;
