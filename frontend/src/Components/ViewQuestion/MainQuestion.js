import ThumbUp from "@mui/icons-material/ThumbUp";
import ThumbDown from "@mui/icons-material/ThumbDown";
import HistoryIcon from "@mui/icons-material/History";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css' //quill css
import './MainQuestion.css'
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import Editor from "react-quill/lib/toolbar";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../feature/userSlice";
import { stringAvatar } from "../../utils/Avatar";

function MainQuestion() {
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [
      { color: ["#ff0000", "#00ff00", "#0000ff", "#220055"] },
      { background: [] },
    ], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  Editor.modules = {
    syntax: false,
    toolbar: toolbarOptions,
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  Editor.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");

  const [questionData, setQuestionData] = useState();
  const [answer, setAnswer] = useState("");
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  // const [comments, setComments] = useState([]);
  const user = useSelector(selectUser);

  const handleQuill = (value) => {
    setAnswer(value);
  };

  useEffect(() => {
    async function getFunctionDetails() {
      await axios
        .get(`/api/question/${id}`)
        .then((res) => setQuestionData(res.data[0]))
        .catch((err) => console.log(err));
    }
    getFunctionDetails();
  }, [id]);

  async function getUpdatedAnswer() {
    await axios
      .get(`/api/question/${id}`)
      .then((res) => setQuestionData(res.data[0]))
      .catch((err) => console.log(err));
  }

  // console.log(questionData);
  const handleSubmit = async () => {
    const body = {
      question_id: id,
      answer: answer,
      user: user,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post("/api/answer", body, config)
      .then(() => {
        alert("Answer added successfully");
        setAnswer("");
        getUpdatedAnswer();
      })
      .catch((err) => console.log(err));
  };

  const handleComment = async () => {
    if (comment !== "") {
      const body = {
        question_id: id,
        comment: comment,
        user: user,
      };
      await axios.post(`/api/comment/${id}`, body).then((res) => {
        setComment("");
        setShow(false);
        getUpdatedAnswer();
        // console.log(res.data);
      });
    }

    // setShow(true)
  };
  return (<div className='main'>
    <div className='main-container'>
      <div className='main-top'>
        <h2 className='main-question'>{questionData?.title}</h2>
        <Link to='/add-question'>
          <button className='button'>Ask a new question</button>
        </Link>
      </div>
      <div className='main-desc'>
        <div className='info'>
          <p>{new Date(questionData?.created_at).toLocaleString()}</p>
          <p>Active<span>Today</span></p>
          <p>Viewed<span>40 times</span></p>
        </div>
      </div>
      <hr />
      <div className='all-questions'
        style={{ flexDirection: 'column' }}>
        <div className='all-questions-container'>
          <div className='all-questions-left'>
            <div className='all-options'>
              {/* <LikeIcon/> */}
              <p className='arrow'><ThumbUp color='action' /> </p>
              <p className='arrow'>0</p>
              <p className='arrow'><ThumbDown color='action' /></p>
              <HistoryIcon color='action' />
              <BookmarkIcon color='action' />
            </div>
          </div>


          <div className='question-answer'>
            <p className='desc'>{ReactHtmlParser(questionData?.body)}</p>
            <div className='author'>
              <small> asked {new Date(questionData?.created_at).toLocaleString()}
              </small>
              <div className='auth-details'>
                <Avatar {...stringAvatar(questionData?.user?.displayName)} />
                <p> {questionData?.user?.displayName
                  ? questionData?.user?.displayName
                  : "Gaurav Jain"}</p>
              </div>
            </div>
            <div className='comments'>
              <div className='comment'>
                {questionData?.comments &&
                  questionData?.comments.map((_qd) => (
                    <p key={_qd?._id}>
                      {_qd.comment}{" "}
                      <span>
                        - {_qd.user ? _qd.user.displayName : "Gaurav Jain"}
                      </span>{" "}
                      {"    "}
                      <small>
                        {new Date(_qd.created_at).toLocaleString()}
                      </small>
                    </p>
                  ))}
              </div>
              <p onClick={() => setShow(!show)}>Add a comment</p>
              {
                show && (
                  <div className='title'>
                    <textarea
                      style={{
                        margin: "5px 0px",
                        padding: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.2)",
                        borderRadius: "3px",
                        outline: "none",
                      }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      type="text"
                      placeholder="Add your comment..."
                      rows={5}
                    />
                    <button
                      className="button"
                      onClick={handleComment}
                      style={{
                        maxWidth: "fit-content",
                      }}>Add comment</button>
                  </div>)
              }
            </div>

          </div>

        </div>
      </div>
      <hr />

      <div className='all-questions' style={{ flexDirection: 'column' }} >
        <p style={{ marginBottom: "20px", fontSize: "1.3rem", fontWeight: '300' }}>
          {questionData && questionData?.answerDetails.length} Answers
        </p>
        {questionData?.answerDetails.map((_q) => (
          <>
            <div
              style={{
                borderBottom: "1px solid #eee",
              }}
              key={_q._id}
              className="all-questions-container"
            >
              <div className="all-questions-left">
                <div className="all-options">
                  <p className='arrow'><ThumbUp color='action' /> </p>

                  <p className="arrow">0</p>

                  <p className='arrow'><ThumbDown color='action' /> </p>

                  <BookmarkIcon />

                  <HistoryIcon />
                </div>
              </div>
              <div className="question-answer">
                {ReactHtmlParser(_q.answer)}
                <div className="author">
                  <small>
                    asked {new Date(_q.created_at).toLocaleString()}
                  </small>
                  <div className="auth-details">
                    <Avatar {...stringAvatar(_q?.user?.displayName)} />
                    <p>
                      {_q?.user?.displayName
                        ? _q?.user?.displayName
                        : "Natalia lee"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
      {/* <div className="questions">
          <div className="question">
            <AllQuestions />
            <AllQuestions />
            <AllQuestions />
            <AllQuestions />
          </div>
        </div> */}
    </div>
    <div className="main-answer">
      <h3
        style={{
          fontSize: "22px",
          margin: "10px 0",
          fontWeight: "400",
        }}
      >
        Your Answer
      </h3>
      <ReactQuill
        value={answer}
        onChange={handleQuill}
        modules={Editor.modules}
        // className="react-quill"
        theme="snow"
        style={{
          height: "200px",
          width: "100%",
        }}
      />
    </div>
    <button
      className="button"
      onClick={handleSubmit}
      style={{
        marginTop: "100px",
        maxWidth: "fit-content",
      }}
    >
      Post your answer
    </button>
  </div>
  );
}

export default MainQuestion;
