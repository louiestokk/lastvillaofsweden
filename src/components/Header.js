import React from "react";
import {
  AppBar,
  Toolbar,
  Container,
  makeStyles,
  Typography,
  Button
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
            {/* <Link to="/checkout" className={classes.links}>
              <Payment />
              <Typography style={{ marginLeft: "0.2rem", fontSize: "0.8rem" }}>
                Pay
              </Typography>
            </Link> */}
          </Container>
          <Container>
            <a href="https://www.airbnb.com/rooms/735818531398338078?guests=1&adults=1&s=67&unique_share_id=ffed0cea-709a-41eb-af99-07b2016edb0d&source_impression_id=p3_1668074785_SqxjyIus8r%2B0aSQ0">
              <Button variant="contained" color="secondary">
                Book
              </Button>
            </a>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
