import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6
import Editor from "react-quill/lib/toolbar";
import axios from "axios";
import { TagsInput } from "react-tag-input-component";
import { selectUser } from "../../feature/userSlice";
import { useHistory } from "react-router-dom";
import './UpdateProfileA.css'
import { useForm, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import { LocalDining } from "@material-ui/icons";
import ReactSelect from "react-select";


function UpdateProfileA() {
  const user = useSelector(selectUser);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [alternateEmail, setAlternateEmail] = useState("");
  const [gender, setGender] = useState("")
  const history = useHistory();

 
  const handleSubmit = async (e) => {

    e.preventDefault();
    if (firstName !== "" && lastName !== "" && dob!== "" && mobileNo!=="" && gender!== ""  ) {
      console.log("GAurav")
      const bodyJSON = {
        firstName: firstName,
        lastName: lastName,
        dob:dob,
        mobileNo:mobileNo,
        gender:gender,
        alternateEmail:alternateEmail,
        user: user,
      };  
      console.log(bodyJSON)
      await axios
        .post("/api/updateProfileA", bodyJSON)
        .then((res) => {

          console.log(res.data);
          // alert("Profile Updated");
                      
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  return (
    <div className='profile-form-A'>
      <div className='profile-forma-A-container'>
        <div className='head-title'>
          <h1>Update Some Info</h1>
        </div>
        <div className='Profile-form-container'>
          <div className='profile-form-options'>
            <div className='profile-form-option'>
              <div className='first-name'>
                <h3>First Name</h3>
                {/* <small>Mark Spector
                </small> */}
                       <ReactSelect   value={value} onChange={(e)=>setFirstName(e.target.value)}>
                       <MenuItem value={"enginner"}>ENGINEER</MenuItem>
                  <MenuItem value={doctor}>DOCTOR</MenuItem>
                  <MenuItem value={architect}>ARCHITECT</MenuItem>
                  <MenuItem value={law}>LAW</MenuItem>
                       </ReactSelect>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder='Mark' />
              </div>
            </div>
            <div className='profile-form-option'>
              <div className='last-name'>
                <h3>Last Name</h3>
                {/* <small>Mark Spector
                </small> */}
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder=' Spector' />
              </div>
            </div><div className='profile-form-option'>
              <div className='dob'>
                <h3>DOB</h3>
                {/* <small>Mark Spector
                </small> */}
                <input
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  type="text"
                  placeholder='12-08-1999' />
              </div>
            </div><div className='profile-form-option'>
              <div className='mobile-no'>
                <h3>Mobile No.</h3>
                {/* <small>Mark Spector
                </small> */}
                <input
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  type="text"
                  placeholder='7678567863' />
              </div>
            </div>
             </div>
        
            <div className='profile-form-option'>
              <div className='alternate-email'>
                <h3>Alternate Email</h3>
                {/* <small>Mark Spector
                </small> */}
                <input
                  value={alternateEmail}
                  onChange={(e) => setAlternateEmail(e.target.value)}
                  type="text"
                  placeholder='gaurav.jain.12899@gmail.com' />
              </div>
            </div>
            <div className='profile-form-option'>
              <div className='gender'>
                <h3>Gender</h3>
                {/* <small>Mark Spector
                </small> */}
                <input
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  type="text"
                  placeholder='gaurav.jain.12899@gmail.com' />
              </div>
            </div>
            
            
            
          </div>
        </div>
        <button className='button' type="submit"  onClick={handleSubmit} >Update Profile</button>
      </div>
  )
}

export default UpdateProfileA
