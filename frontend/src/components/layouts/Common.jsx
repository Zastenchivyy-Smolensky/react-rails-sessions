import React from "react";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "3rem",
  },
}));
function Common({ children }) {
  const classes = useStyles();
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container justifyContent="center">
            <Grid item>{children}</Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default Common;
