import React, { useState } from "react";
import "./Landing.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@material-ui/core/Grid";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useHistory } from "react-router-dom";

const Landing = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIN = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((res) => {
        setLoading(false);
        // console.log(res);
        history.push("/");
        // return (
        //   <>

        //   </>
        // );
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="login-page">
      <Card
        sx={{
          minWidth: 275,
          backgroundColor: "#fff",
          padding: "50px",
          boxShadow: 5,
          borderRadius: 3,
        }}
        className="login-card "
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 30, color: "#000000" }}
            variant="h5"
            component="div"
          >
            Welcome
          </Typography>
          <Typography
            sx={{ mb: 0, mt: 1.5, fontSize: 18 }}
            color="text.secondary"
            className="text-wel"
          >
            Welcome to new age of Community Based Networking Platform
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container justify="center">
            <Button className="login-btn" onClick={handleGoogleSignIN} disabled={loading}>Login with Google</Button>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
};
export default Landing;
