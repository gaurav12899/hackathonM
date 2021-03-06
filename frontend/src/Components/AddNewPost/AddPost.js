import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6
import Editor from "react-quill/lib/toolbar";
import axios from "axios";
import { TagsInput } from "react-tag-input-component";
import { selectUser } from "../../feature/userSlice";
import { useHistory } from "react-router-dom";
import './AddPost.css'
import ReactQuillImageUploader, {
    saveImageSrc,
  } from 'react-quill-image-uploader'
   

function AddPost() {
  const user = useSelector(selectUser);
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

  /*
   * PropType validation
   */

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState([]);
  // const [photos, setPhotos] = useState(null)
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const history = useHistory();

  const handleQuill = (value) => {
    setBody(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title !== "" && body !== "") {
      // debugger
      const form_data = new FormData();
      const bodyJSON = {
        title: title,
        description: body,
        tags: tag,
        user: JSON.stringify(user),
        image: picture
      };
      for ( let key in bodyJSON ) {
        form_data.append(key, bodyJSON[key]);
    }
      await axios({
          method: 'post',
          url: '/api/post',
          data: form_data, // you are sending body instead
          headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          console.log(res.data);
          alert("New Post added successfully");
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const fileUpload = (e) =>{
    e.preventDefault();
    e.stopPropagation();
    console.log(e.target.files[0]);
    // const [file] = e?.target?.files?.length > 0 ? e?.target?.files : e?.dataTransfer?.files;
    // setPhotos(file);
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className='add-post'>
      <div className='add-post-container'>
        <div className='head-title'>
          <h1>Create New Post</h1>
        </div>
        <div className='post-container'>
          <div className='post-options'>
            <div className='post-option'>
              <div className='title'>
                <h3>Title</h3>
                <small>Be specific and imagine you are asking a question to another person
                </small>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder='eg. What is regression in machine learning' />
              </div>
            </div>
            <div className='post-option'>
              <div className='title'>
                <h3>Body</h3>
                <small>Include all the information someone would need to answer your question</small>

                <ReactQuill value={body}
                  onChange={handleQuill}
                  modules={Editor.modules} 
                  className='react-quill'
                   theme='snow' />
              </div>
            </div>
            <div className='post-option'>
              <div className='title'>
                <h3>Image</h3>
                <input 
                  type="file"
                  class="form-control"
                  accept="image/*"
                  onChange={(e) => fileUpload(e)}
                />
                <img className="upload_image" src={imgData} />
              </div>
            </div>
            <div className='post-option'>
              <div className='title'>
                <h3>Tags</h3>
                <small>Add upto 5 tags to describe your tags</small>
                <TagsInput value={tag}
                  onChange={setTag}
                  name='tags'
                   placeholder='press enter to add a new tag' />
              </div>
            </div>
            <button className='button addPostBtn' type="submit"  onClick={handleSubmit} >Add Post</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPost
