import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SideBar from "../SideBar/SideBar";
import moment from 'moment';
import "./Freelancing.css";

function CardDetails(props) {
  const [details, setDetails] = useState(props?.location?.state?.details || {});
  const [loading, setLoading] = useState(false);
  let params = null;
  const history = useHistory();
  useEffect(async () => {

    params = { id: history.location.pathname.split('/')[2] };
    console.log("params", params, props);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    setLoading(true);
    await axios
      .get(`/api/freelancing/getRecord/${params.id}`, {}, config)
      .then((res) => {
        console.log("res?.data?.response", res?.data?.response);
        setDetails(res?.data?.response || {});
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, []);
  return (
    <div className="freelancing">
      <SideBar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Card
          sx={{
            width: "50%",
            boxShadow: 5,
            marginTop: "50px",
            borderRadius: 3,
            border: "5px solid #EAEAEA",
          }}
          className="cardDetails"
        >
          <CardContent className="mainDivOfContent">
            <div style={{ width: "100%" }}>
              <div className="card-details">
                <Typography variant="h6" className="cardLable" component="div">
                  {" "}
                  First Name :
                </Typography>
                <Typography variant="h5" className="cardFild" component="div">
                  {" "}
                  {details?.user?.firstName}
                </Typography>
              </div>
              <div className="card-details">
                <Typography variant="h6" className="cardLable" component="div">
                  {" "}
                  Last Name :
                </Typography>
                <Typography variant="h5" className="cardFild" component="div">
                  {" "}
                  {details?.user?.lastName}
                </Typography>
              </div>
              <div className="card-details">
                <Typography variant="h6" className="cardLable" component="div">
                  {" "}
                  Email :
                </Typography>
                <Typography variant="h5" className="cardFild" component="div">
                  {" "}
                  {details?.user?.email}
                </Typography>
              </div>
              <div className="card-details">
                <Typography variant="h6" className="cardLable" component="div">
                  {" "}
                  AlternativeContact :
                </Typography>
                <Typography variant="h5" className="cardFild" component="div">
                  {" "}
                  {details?.alternativeContact}
                </Typography>
              </div>
              <div className="card-details">
                <Typography variant="h6" className="cardLable" component="div">
                  {" "}
                  Community :
                </Typography>
                <Typography variant="h5" className="cardFild" component="div">
                  {" "}
                  {details?.user?.community}
                </Typography>
              </div>
              <div className="card-details">
                <Typography variant="h6" className="cardLable" component="div">
                  {" "}
                  Company :
                </Typography>
                <Typography variant="h5" className="cardFild" component="div">
                  {" "}
                  {details?.user?.company}
                </Typography>
              </div>
              <div className="card-details">
                <Typography variant="h6" className="cardLable" component="div">
                  {" "}
                  DOB :
                </Typography>
                <Typography variant="h5" className="cardFild" component="div">
                  {" "}
                  {moment(details?.user?.dob).format('DD-MM-YYYY')}
                </Typography>
              </div>
              <div className="card-details">
                <Typography variant="h6" className="cardLable" component="div">
                  {" "}
                  Gender :
                </Typography>
                <Typography variant="h5" className="cardFild" component="div">
                  {" "}
                  {details?.user?.gender}
                </Typography>
              </div>
              <div className="card-details">
                <Typography variant="h6" className="cardLable" component="div">
                  {" "}
                  Skill :
                </Typography>
                <Typography variant="h5" className="cardFild" component="div">
                  {" "}
                  {/* {details?.skill?.toString() || "-"} */}
                  {details?.user?.skill}
                </Typography>
              </div>
              <div className="card-details">
                <Typography variant="h6" className="cardLable" component="div">
                  {" "}
                  Interests :
                </Typography>
                <Typography variant="h5" className="cardFild" component="div">
                  {" "}
                  {details?.user?.interests?.toString() || "-"}
                </Typography>
              </div>
              <div className="card-details">
                <Typography variant="h6" className="cardLable" component="div">
                  {" "}
                  Work Experience :
                </Typography>
                <Typography variant="h5" className="cardFild" component="div">
                  {" "}
                  {details?.workExperience || "-"}
                </Typography>
              </div>
              <div className="card-details">
                <Typography variant="h6" className="cardLable" component="div">
                  {" "}
                  Hourly Rate :
                </Typography>
                <Typography variant="h5" className="cardFild" component="div">
                  {" "}
                  {details?.hourlyRate || "-"}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default CardDetails;
