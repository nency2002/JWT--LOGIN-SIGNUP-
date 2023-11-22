const express = require('express');
const db = require('./config/db');
const UserData = require('./model/shema');
const cookie=require("cookie-parser")
const jwt = require("jsonwebtoken");
const auth = require('./middleware/jwt');


const app = express();
app.use(cookie())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


app.get("/signup", (req, res) => {
    res.render("sign")
});

app.get("/login", (req, res) => {
    res.render("login")
});
app.get("/contact",auth, (req, res) => {
    res.render("contact")
});



app.post("/signup",async(req,res)=>{
    let data=await UserData.create(req.body)
    res.send(data)
})
app.post("/login",async(req,res)=>{
    let {email,password}=req.body
    let data=await UserData.findOne({email:email,password:password})
    if(data){
        let token = jwt.sign({id:data._id },'nency');
        res.cookie("token",token).send("login successfully");
    }
    else{
        res.send("first signup")
    }
})



db();
app.listen(9000, () => {
    console.log("listening on start port");
})

