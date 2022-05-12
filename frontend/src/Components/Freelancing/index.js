import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import SideBar from "../SideBar/SideBar";
import FreelanceCard from "./Cards.js";
import './Freelancing.css';

function Freelancing() {
  const [data, setData] = useState([]);
  const history = useHistory();
  useEffect(async () =>{
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.get("/api/freelancing/getAllRecord", {}, config).then((res) => {
      setData(res?.data || [])
    }).catch(err =>{
      console.log(err);
    })
  }, []);
  return (
    <div className="freelancing">
      <SideBar />
      <div className="content" style={{ width: "100%", height: "100%" }}>
        <div style={{ width: "100%", textAlign: "right", display: 'flex', alignItems: 'end' }}>
        <div className="button" onClick={() => history.push("/register-freelancing")}
         style={{marginLeft:"auto",marginTop:"50px", marginRight:"auto",  width: "30%", maxWidth: "unset", textAlign:' center', padding: "10px 15px" }} >
            Register as freelancer
        </div>
        </div>
        <div>
        {
          data && data.length > 0 ? data.map(freelancing =><FreelanceCard details={freelancing} />) : null
        }
        </div>
      </div>
    </div>
  );
}

export default Freelancing;
