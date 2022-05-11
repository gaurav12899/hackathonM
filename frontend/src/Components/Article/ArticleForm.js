import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6
import Editor from "react-quill/lib/toolbar";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";

function ArticleForm() {
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
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
  const history = useHistory();
  const [body, setBody] = useState("");

  const validate = (values) => {
    // debugger
    const errors = {};
    if(!values.title){
      errors.title = "Required";
    }
    if(!values.body){
      errors.body = "Required";
    }
    return errors;
  }

  const formik = useFormik({
    initialValues: {
      title: "",
      body: ""
    },
    validate,
    onSubmit(values){
      axios({
        method: 'post',
        url: '/api/article/add',
        data: values, // you are sending body instead
        headers: { "Content-Type": "applications/json" },
    })
      .then((res) => {
        history.push("/article");
      })
      .catch((err) => {
        history.push("/");
        console.log(err);
      });
    },
  });

  const handleQuill = (value) => {
    setBody(value);
    // formik.setFieldValue('body', value)
  };

  return (
    <>
    <form onSubmit={formik.handleSubmit}>
      <div className="add-post">
        <div className="add-post-container">
          <div className="head-title">
            <h1>Create New Article</h1>
          </div>
          <div className="post-container">
            <div className="post-options">
              <div className="post-option">
                <div className="title">
                  <h3>Title</h3>
                  <small>
                    Be specific and imagine you are asking a question to another
                    person
                  </small>
                  <TextField
                    type="text"
                    placeholder="eg. What is regression in machine learning"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                  {/* {formik.errors.title} */}
                </div>
              </div>
              <div className="post-option">
                <div className="title">
                  <h3>Body</h3>
                  <small>
                    Include all the information someone would need to answer
                    your question
                  </small>

                  <ReactQuill
                    name="article"
                    value={body}
                    onChange={(value) =>{
                      setBody(value);
                      formik.setFieldValue('body', value);
                    }}
                    modules={Editor.modules}
                    className="react-quill"
                    theme="snow"
                    // error={formik.touched.body && Boolean(formik.errors.body)}
                    // helperText={formik.touched.body && formik.errors.body}
                  />
                  {formik.errors.body}
                </div>
              </div>
            </div>
          </div>
          <button
            className="button"
            type="submit">
            Add Article
          </button>
        </div>
      </div>
    </form>
    </>
  );
}

export default ArticleForm;
