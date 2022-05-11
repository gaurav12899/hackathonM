import React, { useState } from "react";
import "./Landing.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useHistory } from "react-router-dom";

const Landing = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIN = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then(async (res) => {
        setLoading(false);
        console.log("Login", res);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        await axios
          .get(`/api/user/getUserWithUid/${res?.user?.uid}`, {}, config)
          .then(async (result) => {
            if (result?.data) {
              history.push("/");
            } else {
              const payload = {
                uid: res?.user?.uid,
                email: res?.user?.email,
                profile: res?.user?.photoURL,
              };
              await axios({
                method: "post",
                url: "/api/user",
                data: payload, // you are sending body instead
                headers: { "Content-Type": "application/json" },
              })
                .then((response) => {
                  debugger
                  if (response) 
                    history.push({
                      pathname: "/registration",
                      state: { details: response?.data || {} },
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
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
            <Button
              className="login-btn"
              onClick={handleGoogleSignIN}
              disabled={loading}
            >
              Login with Google
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
};
export default Landing;
