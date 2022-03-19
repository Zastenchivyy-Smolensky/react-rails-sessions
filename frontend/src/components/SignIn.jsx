import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { signIn } from "../api/auth";
import { AuthContext } from "../App";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import AlertMessage from "./urils/AlertMessage";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(6),
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
  },
  header: {
    textAlign: "center",
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 400,
  },
  box: {
    marginTop: "2rem",
  },
  link: {
    textDecoration: "none",
  },
}));
function SignIn() {
  const classes = useStyles();
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);

  const history = useHistory();
  const generateParams = () => {
    const SignInParams = {
      email: email,
      password: password,
    };
    return SignInParams;
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const params = generateParams();
    try {
      const res = await signIn(params);
      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);
        setIsSignedIn(true);
        setCurrentUser(res.data.data);
        history.push("/");
        console.log("sign in successfully");
      } else {
        setAlertMessageOpen(true);
      }
    } catch (e) {
      console.log(e);
      setAlertMessageOpen(true);
    }
  };
  return (
    <div>
      <form noValidate autoCapitalize="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="sign in" />
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="email"
              value={email}
              margin="dense"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="default"
              disabled={!email || !password ? true : false}
              className={classes.submitBtn}
              onClick={(e) => handleSignInSubmit(e)}
            >
              Submit
            </Button>
            <Box textAlign="center" className={classes.box}>
              <Typography variant="body2">
                Don`t have an account? &nbsp;
                <Link to="/signup" className={classes.link}>
                  Sign up now!
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </form>
      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid emai or password"
      />
    </div>
  );
}

export default SignIn;
