import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6
import axios from "axios";
import { TagsInput } from "react-tag-input-component";
import { selectUser } from "../../feature/userSlice";
import { useHistory } from "react-router-dom";
import './UpdateProfileA.css'
import ReactSelect from "react-select";



function UpdateProfileB() {
  const user = useSelector(selectUser);

  const [community, setCommunity] = useState("");
  const [interest1, setInterest1] = useState("");
  const [interest2, setInterest2] = useState("");
  const [interest3, setInterest3] = useState("");
  const [company, setCompany] = useState("");
  const [experience, SetExperience] = useState("")
  const [skills, setSkills] = useState([]);

  const [address, setAddress] = useState("")


  const history = useHistory();

 
  const handleSubmit = async (e) => {

    e.preventDefault();
    if (community !== ""  ) {
      const bodyJSON = {
        community: community,
        interest1: interest1,
        interest2: interest2,
        interest3: interest3,
        company: company,
        experience: experience,
        skills: JSON.stringify(skills),
        address: address
      };  
      console.log(bodyJSON)
      await axios
        .post("/api/updateProfileB", bodyJSON)
        .then((res) => {

          console.log(res.data);
          // alert("Profile Updated");
                      
          history.push("/UpdateProfileB");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  return (
    <div className='profile-form-B'>
      <div className='profile-form-B-container'>
        <div className='head-title'>
          <h1>Update Some more Info</h1>
        </div>
        <div className='Profile-form-container'>
          <div className='profile-form-options'>
            <div className='profile-form-option'>
              <div className='community'>
                <h3>Community</h3>
                {/* <small>Mark Spector
                </small> */}
                       <ReactSelect value={value} onChange={(e)=>setCommunity(e.target.value)}>
                       <MenuItem value={"enginner"}>ENGINEER</MenuItem>
                  <MenuItem value={doctor}>DOCTOR</MenuItem>
                  <MenuItem value={architect}>ARCHITECT</MenuItem>
                  <MenuItem value={law}>LAW</MenuItem>
                       </ReactSelect>
                {/* <input
                  value={community}
                  onChange={(e) => setCommunity(e.target.value)}
                  type="text"
                   /> */}
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
            
            <div className='profile-form-option'>
              <div className='skills'>
                <h3>Skills</h3>
                <small>Add Your Skills here</small>
                <TagsInput value={skills}
                  onChange={setSkills}
                  name='skills'
                   placeholder='press enter to add a new skill' />
              </div>
            </div>
            
          </div>
        </div>
        <button className='button' type="submit"  onClick={handleSubmit} >Update Profile</button>
      </div>
  )
}

export default UpdateProfileB
