import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Article/ArticleView.css";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import SideBar from "../SideBar/SideBar";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import { Avatar, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { selectUser } from "../../feature/userSlice";
import { useSelector } from "react-redux";

function ArticleView(props) {
  const [details, setDetails] = useState(props?.location?.state?.details || {});
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const AuthUser = useSelector(selectUser);
  const params = useParams();
  useEffect(async () => {
    console.log("params", params.id, props);
    fetchPostDetails();
  }, []);

  const fetchPostDetails = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    setLoading(true);
    axios
      .get(`/api/post/${params.id}`, {}, config)
      .then((res) => {
        console.log("res?.data?.response", res?.data?.response);
        setDetails(res?.data || {});
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const onCommentLikeChange = async (commentId) => {
    if (loading) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    setLoading(true);
    axios
      .post(
        "/api/postCommentLike/liketoggle",
        { commentId: commentId, userId: AuthUser.uid },
        config
      )
      .then((res) => {
        // if (onComment) {
        details.comments = details.comments.map((rec) => {
          if (rec._id == commentId) {
            rec["likes"] = res.data.response.likes;
          }
          return rec;
        });
        //   onComment(commentsList);
        // }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    // setIsLiked({...isLiked, like: !isLiked.like});
  };

  const handlechange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentappi = () => {
    const data = {
      userId: AuthUser.uid,
      postId: details._id,
      comment: comment,
    };
    debugger
    axios
      .post("/api/postComment/", data)
      .then((res) => {
        // setPosts(res.data.reverse());
        // getPosts();
        fetchPostDetails();
        // setComment("");
      })
      .then((res) => {
        // setPosts(res.data);
        console.log("res", res);
      });
  };

  const addComment = () => {
    if (comment !== "") {
      handleCommentappi();
    }
  };

  console.log("details", details);

  return (
    <div className="articlepage">
      <SideBar />
      {details ?
        <div sx={{ width: "100%" }} className="articleMain">
          <Card
            sx={{ boxShadow: 5, borderRadius: 3 }}
            className="articleCardview"
          >
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
                <CardMedia
                  component="img"
                  height="500"
                  src={`http://ec2-13-235-245-30.ap-south-1.compute.amazonaws.com:2000/${details?.image}`}
                  alt="img"
                />
                <Typography
                  variant="h6"
                  component="div"
                  className="articleDesc"
                  dangerouslySetInnerHTML={{ __html: details?.description }}
                >
                  {/* Working on a blog design or other news-related projects. This one might be a Working on a blog design or other news-related projects. This one might be a Working on a blog design or other news-related projects. This one might be a Working on a blog design or other news-related projects. This one might be a Working on a blog design or other news-related projects. This one might be a great option in terms of highlighting articles on your webpage/application. The react card component ensures all the required material for prioritizing your articles. The design with its effective colour combination and effect outputs a great interface. */}
                </Typography>
              </div>
            </CardContent>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <b>
                  <h2 style={{ padding: 0, margin: 0 }}>Add Your Comment</h2>
                </b>
              </Typography>
            </CardContent>
            <cardContent>
              <TextField
                id="skill1"
                label="Enter comment"
                variant="outlined"
                name="comment"
                value={details.comment}
                onChange={handlechange}
                className="comentFild"
              />

              <Button className="commentBtn btn" onClick={() => addComment()}>
                ADD Comments
              </Button>
              <Typography variant="body2">
                <p
                  style={{
                    margin: "0px 20px",
                    marginBottom: "20px",
                    padding: 10,
                    // border: "1px solid #C4C4C4",
                    // borderRadius: 5,
                  }}
                >
                  {details?.comments?.map((commentRecord) => {
                    return (
                      <>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "0px 20px",
                            borderBottom: "1px solid #C4C4C4",
                          }}
                        >
                          <span
                            style={{
                              color: "#000",
                              fontSize: "16px",
                              marginBottom: "10px",
                            }}
                          >
                            {commentRecord.comment}
                          </span>
                          <div style={{ color: "red" }}>
                            {commentRecord["likes"]?.indexOf(AuthUser.uid) >
                            -1 ? (
                              <FavoriteIcon
                                fontSize="small"
                                onClick={() =>
                                  onCommentLikeChange(commentRecord._id)
                                }
                              />
                            ) : (
                              <FavoriteBorderIcon
                                fontSize="small"
                                color="red"
                                onClick={() =>
                                  onCommentLikeChange(commentRecord._id)
                                }
                              />
                            )}
                            ({commentRecord["likes"]?.length || 0})
                          </div>
                        </div>
                        <br />
                      </>
                    );
                  })}
                </p>
              </Typography>
            </cardContent>
          </Card>
        </div> : null
      }
    </div>
  );
}

export default ArticleView;
