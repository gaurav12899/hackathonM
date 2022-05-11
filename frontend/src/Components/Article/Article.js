import React from "react";
import "../Article/Article.css";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import SideBar from "../SideBar/SideBar";

function Article() {
  return (
    <div className="articlepage">
      <SideBar />
      <div sx={{width: "100%" }} className="articleMain">
        <Card sx={{ boxShadow: 5, borderRadius: 3 }} className="articleCard">
          <CardContent className="articleContent">
            <div className="articleView">
              <Typography
                variant="h6"
                component="div"
                className="articleHeadline"
              >
                React NativeBase Working on a blog design or other news-related projects. This one might be a Working on a blog design or other news-related projects. This one might be a
              </Typography>
              <Typography variant="h6" component="div" className="articleDesc">
              Working on a blog design or other news-related projects. This one might be a Working on a blog design or other news-related projects. This one might be a Working on a blog design or other news-related projects. This one might be a Working on a blog design or other news-related projects. This one might be a Working on a blog design or other news-related projects. This one might be a great option in terms of highlighting articles on your webpage/application. The react card component ensures all the required material for prioritizing your articles. The design with its effective colour combination and effect outputs a great interface.
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Article;
