import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./Registrations.css";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import moment from "moment";
import * as Yup from "yup";

function UserDetails() {
  return (
    <div>
      <Card
        sx={{
          padding: "50px",
          boxShadow: 5,
          borderRadius: 3,
        }}
        className="user-card"
      >
        <CardContent>
          <Typography variant="h4" component="div" className="heading">
            User Details
          </Typography>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { mb: 2, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <Box sx={{ width: "100%" }} className="community">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Choose Community
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"

                  // value={age}

                  // onChange={handleChange}
                >
                  <MenuItem value={10}>Medical</MenuItem>
                  <MenuItem value={20}>Others</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <div className="intrest">
              <TextField
                id="intrest1"
                className="int"
                label="Intrest 01"
                variant="outlined"
              />
              <TextField
                id="intrest2"
                className="int"
                label="Intrest 02"
                variant="outlined"
              />
              <TextField
                id="intrest3"
                className="int"
                label="Intrest 03"
                variant="outlined"
              />
            </div>
            <div className="work">
              <TextField
                className="work1"
                id="company"
                label="Company"
                variant="outlined"
              />
              <TextField
                className="work1"
                id="exp"
                label="Work Experience"
                variant="outlined"
              />
              <TextField
                className="work1"
                id="skill"
                label="Skills"
                variant="outlined"
              />
            </div>
            <TextField
              className="address"
              id="address"
              label="Address"
              variant="outlined"
            />
          </Box>
        </CardContent>
        <CardActions>
          <Grid container justify="center">
            <Button className="reg-btn">
              Confirm
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
}

export default UserDetails;
