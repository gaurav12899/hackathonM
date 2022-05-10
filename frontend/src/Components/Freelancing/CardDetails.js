import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SideBar from '../SideBar/SideBar';
import './Freelancing.css';

function CardDetails(props) {
  const [details, setDetails] = useState(props?.location?.state?.details || {});
  const [loading, setLoading] = useState(false);
  const params = useParams();
  console.log("details",details);
  useEffect(async () =>{
    console.log("params", params, props);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    setLoading(true);
    await axios.get(`/api/freelancing/getRecord/${params.id}`, {}, config).then((res) => {
      console.log("res?.data?.response",res?.data?.response);
      setDetails(res?.data?.response || {})
    }).catch(err =>{
      console.log(err);
    })
    setLoading(false);
  }, []);
  return (
    <div className="freelancing">
      <SideBar />
      {loading ? <p>Loading...</p>
        :
        <Card sx={{ minWidth: 275 }} className="cards">
          <CardContent>
            <div className="card-text">
              <Typography variant="h5" component="div">
                {" "}
                First Name :
              </Typography>
              <Typography variant="h5" component="div">
                {" "}
                Savan
              </Typography>
            </div>
            <div className="card-text">
              <Typography variant="h5" component="div">
                {" "}
                Last Name :
              </Typography>
              <Typography variant="h5" component="div">
                {" "}
                Kheni
              </Typography>
            </div>
            <div className="card-text">
              <Typography variant="h5" component="div">
                {" "}
                DOB :
              </Typography>
              <Typography variant="h5" component="div">
                {" "}
                20-9-1998
              </Typography>
            </div>
            <div className="card-text">
              <Typography variant="h5" component="div">
                {" "}
                Gender :
              </Typography>
              <Typography variant="h5" component="div">
                {" "}
                Male
              </Typography>
            </div>
            <div className="card-text">
              <Typography variant="h5" component="div">
                {" "}
                Skill :
              </Typography>
              <Typography variant="h5" component="div">
                {" "}
                {details?.skill?.toString() || '-'}
              </Typography>
            </div>
            <div className="card-text">
              <Typography variant="h5" component="div">
                {" "}
                Work Experience :
              </Typography>
              <Typography variant="h5" component="div">
                {" "}
                {details?.workExperience || '-'}
              </Typography>
            </div>
            <div className="card-text">
              <Typography variant="h5" component="div">
                {" "}
                Hourly Rate :
              </Typography>
              <Typography variant="h5" component="div">
                {" "}
                {details?.hourlyRate || '-'}
              </Typography>
            </div>
          </CardContent>
        </Card>
      }
    </div>
  )
}

export default CardDetails