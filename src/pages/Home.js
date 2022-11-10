import React, { useEffect } from "react";
import CarouselComp from "../components/CarouselComp";
import Header from "../components/Header";
import {
  Box,
  Container,
  Paper,
  Typography,
  makeStyles
} from "@material-ui/core";
import { Email, Phone, WhatsApp } from "@material-ui/icons";
import map from "../assets/villapaje.png";

const useStyles = makeStyles({
  section: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    "@media(max-width: 780px)": {
      flexDirection: "column",
      fontSize: "0.6rem"
    }
  }
});
const Home = () => {
  const classes = useStyles();

  return (
    <div>
      <Header />
      <CarouselComp />
      <Container>
        <Paper style={{ textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            Contact
          </Typography>
          <section className={classes.section}>
            <div style={{ margin: "0.5rem 0" }}>
              <Phone style={{ color: "purple" }} />
              <Typography>Local</Typography>
              <Typography>
                <a href="tel:+255 715168659" style={{ color: "black" }}>
                  Louie: +255 715168659
                </a>
              </Typography>
              <Typography>
                <a href="tel:+255 779 912 498" style={{ color: "black" }}>
                  Gerrard: +255 715168659
                </a>
              </Typography>
            </div>
            <div style={{ margin: "0.5rem 0" }}>
              <WhatsApp style={{ color: "green" }} />
              <Typography>WhatsApp</Typography>
              <Typography>Louie: +46 768670210</Typography>
            </div>
            <div style={{ margin: "0.5rem 0" }}>
              <Email style={{ color: "red" }} />
              <Typography>Email</Typography>
              <Typography>
                <a
                  href="mailto: louiestokk@gmail.com"
                  style={{ color: "black" }}
                >
                  louiestokk@gmail.com
                </a>
              </Typography>
            </div>
          </section>
        </Paper>
      </Container>
      <div
        style={{ margin: "1rem 0", display: "flex", justifyContent: "center" }}
      >
        <img src={map} style={{ width: "80%" }} />
      </div>
      <Header />
    </div>
  );
};

export default Home;
