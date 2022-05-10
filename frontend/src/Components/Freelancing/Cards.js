import React from "react";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@material-ui/core/Grid";
import "./Cards.css";

function FreelanceCard({ details }) {
  const history = useHistory();
  return (
    <div>
      <Box sx={{ flexGrow: 1 }} onClick={() =>history.push({pathname: `/freelancer/view/${details._id}`, state: {details}})}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card sx={{ minWidth: 275 }} className="cards">
              <CardContent>
                <div className="card-text">
                  <Typography variant="h5" component="div">
                    {" "}
                    Name :
                  </Typography>
                  <Typography variant="h5" component="div">
                    {" "}
                   {}
                  </Typography>
                </div>
                <div className="card-text">
                  <Typography variant="h5" component="div">
                    {" "}
                    Skill :
                    {" "}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {" "}
                    {details?.skill?.toString()}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
          {/* <Grid item xs={4}>
            <Card sx={{ minWidth: 275 }} className="cards">
              <CardContent>
                <div className="card-text">
                  <Typography variant="h5" component="div">
                    {" "}
                    Name :
                  </Typography>
                  <Typography variant="h5" component="div">
                    {" "}
                    Savan Kheni
                  </Typography>
                </div>
                <div className="card-text">
                  <Typography variant="h5" component="div">
                    {" "}
                    Skill :
                  </Typography>
                  <Typography variant="h5" component="div">
                    {" "}
                    MERN, HTML, CSS
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ minWidth: 275 }} className="cards">
              <CardContent>
                <div className="card-text">
                  <Typography variant="h5" component="div">
                    {" "}
                    Name :
                  </Typography>
                  <Typography variant="h5" component="div">
                    {" "}
                    Savan Kheni
                  </Typography>
                </div>
                <div className="card-text">
                  <Typography variant="h5" component="div">
                    {" "}
                    Skill :
                  </Typography>
                  <Typography variant="h5" component="div">
                    {" "}
                    MERN, HTML, CSS
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid> */}
        </Grid>
      </Box>
    </div>
  );
}

export default FreelanceCard;
