import express from 'express'
import mongoose  from 'mongoose'
import Questions from './questionDb.js'
import Cors from 'cors'
import Axios from 'axios'
// App config
const app =  express();
const port = process.env.PORT || 8001;
const connection_url  = `mongodb+srv://admin:molecule%40123@cluster0.5wedl.mongodb.net/moleculeDB?retryWrites=true&w=majority`


//middlewares
app.use(express.json())
app.use(Cors())

//db config
mongoose.connect(connection_url,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })

//api endpoints
app.get("/",(req,res) => res.status(200).send("Hello Molecule App!!"));

app.post('/molecule/questions',(req,res)=>{
    const question = req.body;
    Questions.create(question,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }
    })

});

app.get('/molecule/questions',(req,res)=>{
    const question = req.body;
    Questions.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
    })

});

app.get('/news', async(req,res)=>{
    try{
const newsApi= await Axios.get('http://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=95adeecc8fef42ce84c260c4ee23f0b3 ')
res.send(newsApi.data)
    }catch(err){
            console.log(err)
    }
})



//listener
app.listen(port, () => console.log(`listening  at localhost: ${port}` ))