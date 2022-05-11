import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import "./Freelancing.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../feature/userSlice";

function FreelancingRegister() {
  const history = useHistory();
  const user = useSelector(selectUser);

  const handleSubmit = async (values) => {
    let skills = [values.skill1];
    if (values.skill2 !== '') {
      skills.push(values.skill2);
    } 
    if (values.skill3 !== ''){
      skills.push(values.skill3);
    }
    const data = {
      skill: skills,
      email: values.email,
      alternativeContact: values.alternativeContact,
      workExperience: values.workExperience,
      hourlyRate: values.hourlyRate,
      uid: user.uid
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.post("/api/freelancing/add", data, config).then((res) => {
      history.push('/freelancing');
    }).catch(err =>{
      console.log(err);
    })
    console.log("values", values);
  };
  const formik = useFormik({
    initialValues: {
      skill1: "",
      skill2: "",
      skill3: "",
      email: "",
      alternativeContact: "",
      workExperience: "",
      hourlyRate: "",
    },
    validationSchema: Yup.object({
      skill1: Yup.string()
        .required("Skill is required"),
      email: Yup.string()
        .email("E-mail is not valid")
        .required("Email is required"),
      workExperience: Yup.string()
        .required("Work Experience is required"),
      hourlyRate: Yup.string()
        .required("Hourly Rate is required"),
      // firstName: Yup.string()
      //   .max(20, "First Name must be long")
      //   .required("First Name is required"),
      // lastName: Yup.string()
      //   .max(30, "Last Name must be long")
      //   .required("Last name is required"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <div>
    <form onSubmit={formik.handleSubmit}>
    <Card sx={{
        padding: "50px",
        boxShadow: 5,
        borderRadius: 3,
      }} className="register-card">
        <CardContent>
          <Typography variant="h4" component="div" className="heading">
            Register for Freelancing
          </Typography>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { mb: 2, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
          
            <TextField id="skill1" 
                      label="Enter Skill 01" 
                      variant="outlined"
                      name="skill1"
                      value={formik.values.skill1}
                      onChange={formik.handleChange}
                      error={formik.touched.skill1 && Boolean(formik.errors.skill1)}
                      helperText={formik.touched.skill1 && formik.errors.skill1}
             />
            <TextField id="skill2" 
                       label="Enter Skill 02" 
                       variant="outlined" 
                       name="skill2"
                       value={formik.values.skill2}
                       onChange={formik.handleChange}
                      // error={formik.touched.skill2 && Boolean(formik.errors.skill2)}
                      // helperText={formik.touched.skill2 && formik.errors.skill2}
                       />
            <TextField id="skill3" 
                      label="Enter Skill 03" 
                      variant="outlined"
                      name="skill3"
                      value={formik.values.skill3}
                      onChange={formik.handleChange}
                      // error={formik.touched.skill3 && Boolean(formik.errors.skill3)}
                      // helperText={formik.touched.skill3 && formik.errors.skill3} 
                      />
            <div className="contact">
              <TextField
                id="email"
                className="con"
                name="email"
                label="Enter Email for Display"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                id="contact"
                className="con"
                label="Alternative Contact Details"
                variant="outlined"
                name="alternativeContact"
                value={formik.values.alternativeContact}
                onChange={formik.handleChange}
                // error={formik.touched.alternativeContact && Boolean(formik.errors.alternativeContact)}
                // helperText={formik.touched.alternativeContact && formik.errors.alternativeContact}
              />
            </div>
            <div className="contact-email">
              <TextField
                className="email"
                id="contact"
                label="Work Experience (Year)"
                variant="outlined"
                name="workExperience"
                value={formik.values.workExperience}
                onChange={formik.handleChange}
                error={formik.touched.workExperience && Boolean(formik.errors.workExperience)}
                helperText={formik.touched.workExperience && formik.errors.workExperience}
              />
              <TextField
                className="email"
                id="rate"
                label="Hourly Rate (USD)"
                variant="outlined"
                name="hourlyRate"
                value={formik.values.hourlyRate}
                onChange={formik.handleChange}
                error={formik.touched.hourlyRate && Boolean(formik.errors.hourlyRate)}
                helperText={formik.touched.hourlyRate && formik.errors.hourlyRate}
              />
            </div>
          </Box>
        </CardContent>
        <CardActions>
          <Grid container justify="center">
            <Button type="submit" variant="contained" className="reg-btn">Register</Button>
          </Grid>
        </CardActions>
      </Card>
    </form>
    </div>
  );
}

export default FreelancingRegister;
