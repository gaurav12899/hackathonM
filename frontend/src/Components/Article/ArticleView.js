import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Article/ArticleView.css";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import SideBar from "../SideBar/SideBar";


function ArticleView(props) {
  const [details, setDetails] = useState(props?.location?.state?.details || {});
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(async () => {
    console.log("params", params.id, props);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    setLoading(true);
    await axios
      .get(`/api/article/getRecord/${params.id}`, {}, config)
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
    <div className="articlepage">
      <SideBar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div sx={{ width: "100%" }} className="articleMain">
          <Card sx={{ boxShadow: 5, borderRadius: 3 }} className="articleCardview">
            <CardContent className="articleContent">
              <div className="articleView">
                <Typography
                  variant="h6"
                  component="div"
                  className="articleHeadline"
                >
                  {" "}
                  {details?.title}
                  {/* React NativeBase Working on a blog design or other news-related projects. This one might be a Working on a blog design or other news-related projects. This one might be a */}
                </Typography>
                <Typography variant="h6" component="div" className="articleDesc" dangerouslySetInnerHTML={{ __html: details?.body }}>
                  {/* Working on a blog design or other news-related projects. This one might be a Working on a blog design or other news-related projects. This one might be a Working on a blog design or other news-related projects. This one might be a Working on a blog design or other news-related projects. This one might be a Working on a blog design or other news-related projects. This one might be a great option in terms of highlighting articles on your webpage/application. The react card component ensures all the required material for prioritizing your articles. The design with its effective colour combination and effect outputs a great interface. */}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default ArticleView;
