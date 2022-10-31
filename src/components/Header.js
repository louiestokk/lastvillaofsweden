import React from "react";
import {
  AppBar,
  Toolbar,
  Container,
  makeStyles,
  Typography
} from "@material-ui/core";
import { BarChart, Hotel, Payment } from "@material-ui/icons";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  toolbar: {
    background: "#4338ca",
    color: "white",
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
  },
  logo: {
    display: "flex",
    alignItems: "center"
  },
  hotel: {
    marginRight: "0.5rem"
  },
  menu: {
    color: "white"
  },
  links: {
    color: "white",
    alignItems: "center",
    display: "flex"
  }
});
const Header = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Container className={classes.logo}>
            <Typography>Villa of Sweden</Typography>
          </Container>
          <Container className={classes.menu}>
            <Link to="/checkout" className={classes.links}>
              <Payment />
              <Typography style={{ marginLeft: "0.2rem" }}>Pay</Typography>
            </Link>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
