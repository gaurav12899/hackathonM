import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@mui/material/MenuItem";
import "./Registrations.css";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import moment from "moment";
import axios from 'axios';
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function Registrations(props) {
  const state = useSelector((state) => state.user);
  const [data, setData] = useState({});
  const history = useHistory();
  useEffect(() => {
    if (state.user) {
      formik.setFieldValue("email", state.user.email);

      axios
          .get(`/api/user/getUserWithUid/${state?.user.uid}`, {})
          .then((response) => {
            debugger
            if (response) 
            setData(response.data || {});
          })
          .catch((err) => {
            console.log(err);
          });

    }
  }, [state.user]);

  useEffect(() => {
    // const userDetails = props?.location?.state?.details || {};
    // debugger
    // if (userDetails) {
    //   setData(userDetails || {});
    // }

    

  }, []);
  //   const validate = (values) => {
  //     // debugger
  //     const errors = {};
  //     if (!values.title) {
  //       errors.firstname = "Required";
  //     }
  //     if (!values.body) {
  //       errors.lastname = "Required";
  //     }
  //     return errors;
  //   };
  const validate = Yup.object().shape({
    firstName: Yup.string().required("firstname is required"),
    lastName: Yup.string().required("LastName is required"),
    gender: Yup.string().required("Gender is required"),
    community: Yup.string().required("Community is required"),
    intrest1: Yup.string().required("Intrest1 is required"),
    company: Yup.string().required("Company is required"),
    skill: Yup.string().required("Skill is required"),
    workExperience: Yup.string().max(2).required("Experience is required"),
    address: Yup.string().required("Address is required"),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      dob: Date.now(),
      email: "",
      gender: "",
      community: "",
      intrest1: "",
      company: "",
      skill: "",
      workExperience: "",
      address: "",
      intrest2: '',
      intrest3: ''
    },
    validationSchema: validate,

    onSubmit: async(values) =>{
        console.log("values", values);
        let payload = values;
        payload.uid = state.user.uid;
        payload.profilePic = state.user.photo;
        payload.interests = [values.intrest1, values.intrest2, values.intrest3].join(',');
        console.log("data", data);
        await axios.put(`/api/user/${state.user.uid}`, payload)
        .then((res) => {
            if (res) {
                history.push("/");
            }
        })
        .catch((err) => {
            console.log(err);
        });
    },
  });

  console.log("user", state.user);
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Card
          sx={{
            padding: "50px",
            boxShadow: 5,
            borderRadius: 3,
          }}
          className="registerations-card"
        >
          <CardContent>
            <Typography variant="h4" component="div" className="heading">
              Registration
            </Typography>

            <Box
              component="form"
              sx={{
                "& > :not(style)": { mb: 2, width: "100%" },
              }}
              noValidate
              autoComplete="off"
            >
              <div className="contact">
                <TextField
                  id="firstname"
                  className="con"
                  label="Enter First Name"
                  variant="outlined"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
                <TextField
                  id="lastName"
                  className="con"
                  label="Enter Last Name"
                  variant="outlined"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </div>
              <div className="reg-field">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    renderInput={(props) => (
                      <TextField
                        variant="standard"
                        className="w-100"
                        name="dob"
                        required
                        {...props}
                        error={
                          formik.touched?.dob &&
                          !!formik.errors?.dob
                        }
                        helperText={
                          formik.touched?.dob &&
                          formik.errors?.dob
                        }
                      />
                    )}
                    name="dob"
                    label="DateOfBirth"
                    maxDate={new Date()}
                    value={moment(formik?.values?.dob).format(
                      "YYYY-MM-DD"
                    )}
                    //   formik.values?.dateOfbirth
                    onChange={(newValue) => {
                      console.log(
                        moment(newValue).format("YYYY-MM-DD"),
                        //   moment(y).format("YYYY-MM-DD"),
                        formik.errors
                      );
                      formik.setFieldTouched("dob");
                      formik.setFieldValue(
                        "dob",
                        moment(newValue).format("YYYY-MM-DD")
                      );
                    }}
                    onKeyPress={() => formik.setFieldTouched("dob")}
                  />
                </LocalizationProvider>
                <TextField
                  className="reg-text"
                  id="email"
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  disabled={true}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  select
                  className="reg-text"
                  id="gender"
                  label="Gender"
                  variant="outlined"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  helperText={formik.touched.gender && formik.errors.gender}
                >
                  <MenuItem key={"male"} value={"male"}>
                    Male
                  </MenuItem>
                  <MenuItem key={"female"} value={"female"}>
                    Female
                  </MenuItem>
                  <MenuItem
                    key={"i prefer not to say"}
                    value={"i prefer not to say"}
                  >
                    I prefer not to say
                  </MenuItem>
                </TextField>
              </div>
            </Box>
          </CardContent>
          {/* <CardActions>
            <Grid container justify="center">
              <Button
                className="reg-btn"
                type="submit"
                // onClick={UserDetails}
              >
                Confirm
              </Button>
            </Grid>
          </CardActions> */}
        </Card>
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
                {/* <FormControl fullWidth>
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
                </FormControl> */}
                <TextField
                  className="reg-text"
                  id="Community"
                  label="Alternative Contact Details"
                  variant="outlined"
                  name="community"
                  value={formik.values.community}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.community && Boolean(formik.errors.community)
                  }
                  helperText={
                    formik.touched.community && formik.errors.community
                  }
                >
                </TextField>
              </Box>
              <div className="intrest">
                <TextField
                  id="intrest1"
                  className="int"
                  label="Intrest 01"
                  variant="outlined"
                  name="intrest1"
                  value={formik.values.intrest1}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.intrest1 && Boolean(formik.errors.intrest1)
                  }
                  helperText={formik.touched.intrest1 && formik.errors.intrest1}
                />
                <TextField
                  id="intrest2"
                  className="int"
                  label="Intrest 02"
                  variant="outlined"
                  name="intrest2"
                  value={formik.values.intrest2}
                  onChange={formik.handleChange}
                />
                <TextField
                  id="intrest3"
                  className="int"
                  label="Intrest 03"
                  variant="outlined"
                  name="intrest3"
                  value={formik.values.intrest3}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="work">
                <TextField
                  className="work1"
                  id="company"
                  label="Company"
                  variant="outlined"
                  name="company"
                  value={formik.values.company}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.company && Boolean(formik.errors.company)
                  }
                  helperText={formik.touched.company && formik.errors.company}
                />
                <TextField
                  className="work1"
                  id="exp"
                  type="number"
                  label="Work Experience"
                  variant="outlined"
                  name="workExperience"
                  value={formik.values.workExperience}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.workExperience &&
                    Boolean(formik.errors.workExperience)
                  }
                  helperText={
                    formik.touched.workExperience && formik.errors.workExperience
                  }
                />
                <TextField
                  className="work1"
                  id="skill"
                  label="Skills"
                  variant="outlined"
                  name="skill"
                  value={formik.values.skill}
                  onChange={formik.handleChange}
                  error={formik.touched.skill && Boolean(formik.errors.skill)}
                  helperText={formik.touched.skill && formik.errors.skill}
                />
              </div>
              <TextField
                className="address"
                id="address"
                label="Address"
                variant="outlined"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Box>
          </CardContent>
          <CardActions>
            <Grid container justify="center">
              <Button className="reg-btn" type="submit">
                Confirm
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </form>
    </div>
  );
}

export default Registrations;
