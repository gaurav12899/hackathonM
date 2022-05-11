import React from "react";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@mui/material/Avatar";
import "./Cards.css";
import SideBar from "../SideBar/SideBar";

function FreelanceCard({ details }) {
  const history = useHistory();
  return (
    <div className="freelanceCard">
      <Box
        sx={{ flexGrow: 1, margin: 5 }}
        // onClick={() =>history.push({pathname: `/freelancer/view/${details._id}`, state: {details}})}
      >
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Box
            sx={{ flexGrow: 1, margin: 5, width: "100%" }}
            // onClick={() =>history.push({pathname: `/freelancer/view/${details._id}`, state: {details}})}
          >
            <Grid container spacing={2} columns={{ xs: 12, sm: 12, md: 12 }}>
              <div className="page-heading">
                <Typography variant="h6" component="div" className="page-title">
                  Freelancer Details
                </Typography>
              </div>
            </Grid>
          </Box>
          {[1, 2].map((item) => {
            return (
              <>
                <Grid item xs={4}>
                  <Card
                    sx={{ boxShadow: 5, borderRadius: 3 }}
                    className="cards"
                    onClick={() => history.push("/freelancer")}
                  >
                    <Avatar
                      alt="Semy Sharp"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 70, height: 70, marginTop:1 }}
                    />
                    <CardContent className="card-contaent">
                      <div className="card-text">
                        <Typography variant="h6" component="div">
                          {" "}
                          Name :
                        </Typography>
                        <Typography variant="h6" component="div">
                          {" "}
                          Savan Kheni
                        </Typography>
                      </div>
                      <div className="card-text">
                        <Typography variant="h6" component="div">
                          {" "}
                          Skill :{" "}
                        </Typography>
                        <Typography variant="h6" component="div">
                          {" "}
                          {details?.skill?.toString()}
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}

export default FreelanceCard;
