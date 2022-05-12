
const express =require('express') 
// import mongoose  from 'mongoose'
// import Questions from './questionDb.js'
const Cors =  require('cors') 
// import Axios from 'axios'
// // App config
// const app =  express();
// const port = process.env.PORT || 8001;
// const connection_url  = `mongodb+srv://admin:molecule%40123@cluster0.5wedl.mongodb.net/moleculeDB?retryWrites=true&w=majority`


// //middlewares
// app.use(express.json())
// app.use(Cors())

// //db config
// mongoose.connect(connection_url,
//     {
//         useNewUrlParser:true,
//         useUnifiedTopology:true
//     })

// //api endpoints
// app.get("/",(req,res) => res.status(200).send("Hello Molecule App!!"));

// app.post('/molecule/questions',(req,res)=>{
//     const question = req.body;
//     Questions.create(question,(err,data)=>{
//         if(err){
//             res.status(500).send(err);
//         }
//         else{
//             res.status(201).send(data);
//         }
//     })

// });

// app.get('/molecule/questions',(req,res)=>{
//     const question = req.body;
//     Questions.find((err,data)=>{
//         if(err){
//             res.status(500).send(err);
//         }
//         else{
//             res.status(200).send(data);
//         }
//     })

// });




// //listener
// app.listen(port, () => console.log(`listening  at localhost: ${port}` ))



// if (process.env.NODE_ENV !== "production") {
//     require("dotenv").config();
//   }
  
//   const express = require("express");
//   const cors = require("cors");
const path  = require('path')
const app = express();
const router = require("./Routers")
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3100;
const db = require("./db");
  db.connect();
  
  app.use(bodyParser.json({ limit: "500mb" }));
  app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" }));
  
  app.use(express.json());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });
  
  app.use("/api", router);
  app.use(`/uploads`, express.static(`uploads`));
  // app.use(express.static(path.join(__dirname, "/../frontend/build")));
  
  app.get("*", (req, res) => {
    try {
      // res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
      res.send("Welcome to Molecule");
    } catch (e) {
      res.send("Welcome to Molecule");
    }
  });

//   app.get('/news', async(req,res)=>{
//     try{
// const newsApi= await Axios.get('http://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=95adeecc8fef42ce84c260c4ee23f0b3 ')
// res.send(newsApi.data)
// console.log(newsApi.data)
//     }catch(err){
//             console.log(err)
//     }
// })

  
  app.use(Cors());
  
  app.listen(PORT, () => {
    console.log(`Molecule is running on PORT No- ${PORT}`);
  });