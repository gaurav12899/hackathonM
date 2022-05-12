import React, { useEffect } from "react";
import SideBar from "../SideBar/SideBar";
import "../Article/index.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ArticleForm from "./ArticleForm";
import axios from "axios";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { useState } from "react";

function Article() {
  const history = useHistory();
  const [details, setDetails] = useState([]);
  useEffect(async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .get(`/api/article/getAllRecord`, {}, config)
      .then((res) => {
        setDetails(res?.data?.response || {});
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log("details", details);
  return (
    <div className="articleIndex">
      <SideBar />
      <div className="mainDiv">
        <button
          className="articalButton"
          onClick={() => history.push("/article-form")}
        >
          Write Article
        </button>

        {details && details.length > 0
          ? details.map((article, i) => (
              <div className="articleCard" key={i}>
                <Card sx={{ width: "90%" }} className="card" onClick={() => history.push(`/article-view/${article._id}`)}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {article.title}
                    </Typography>
                  </CardContent>
                </Card>

                {/* <Card sx={{ width: "90%" }} className="card">
                  <CardContent>
                    <Typography variant="h5" component="div" dangerouslySetInnerHTML={{ __html: article.body }}>
                    </Typography>
                  </CardContent>
                </Card> */}
              </div>
            ))
          : null}
          {/* <Article /> */}
      </div>
    </div>
  );
}

export default Article;
