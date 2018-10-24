require("dotenv").config();
const express = require('express');
const session = require('express-session');
const passport = require("passport");
const strategy = require("./strategy");
const { SESSION_SECRET,PORT} = process.env;
const students = require("./students.json")


const app = express();

app.use(session({
    secret:SESSION_SECRET,
    resave:false,
    saveUninitialized:true
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(strategy);

passport.serializeUser((user,done)=>{
    done(null,{
        clientID:user.id,
        email:user._json.email,
        name:user._json.name
    })
})
passport.deserializeUser((user,done)=>done(null,user))

app.use(express.static(__dirname + '/build'));
console.log(__dirname+"/build")

app.get("/login",passport.authenticate("auth0",{
    successRedirect: "/students",
    failureRedirect: "/login",
    connection:"github"
    })
)
function authenticated(req,res,next){
    if(req.user){
        next();
    }
    else{
        res.redirect("/login")
    }
}
app.get("/students",authenticated,(req,res)=>{
    res.status(200).json(students);
})



const port = PORT || 3001;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );