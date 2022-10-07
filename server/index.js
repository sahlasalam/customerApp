const express = require("express");
const cors = require("cors");
const bodypars= require('body-parser')
const app = express();
app.use(cors());
app.use(bodypars.json())
// const customer = require("./customer.json")
const db= require("./config/db");
const User = require('./models/user') 
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')


db();

const JWT_SECRET= "mkjhewywifjpoaxYTwwwdkxuhdi";

app.post('/save', async (req, res) =>{

  var hashedPassword = bcrypt.hashSync(req.body.password,10)

  try{
    User.findOne({id: req.body.id}, async function(err, log){
      if(log){
        res.send({status : 0, message : "Customer already exist"})
      }else{
          var user={
            id : req.body.id,
            name : req.body.name,
            password : hashedPassword,
            number : req.body.number,
            place : req.body.place
          }
          var new_user = new User(user);
          new_user.save( async function(err, log){
            var token = jwt.sign({id: log._id}, JWT_SECRET)
            res.send({status : 1, message : "Successfuly registered", token : token})
          }  )
      }
    })
  }
  catch(err){
            console.log(err);
       }
  })

  // app.post('/save', async(req, res)=>{
  //   try{
  //     console.log(req.body.id);
  //     var new_user = new User(req.body);
  //     new_user.save( async function(err, log){
  //       res.send({status : 1, message : "successfuly registered"})
  //     })
  //   }
  //   catch{
  //     res.send({status : 0, message : "Customer already exist"})

  //   }
  // })


app.post('/customer/details', async (req , res) =>{
  try{
      console.log(req.body);
      let inputId= req.body.id;
      let data= await User.findOne({id : inputId})
      if(!data){
        res.send({status : 0 , message : "customer not exist"})
      }
      let isPasswordMatched = await bcrypt.compare(req.body.password, data.password)
      if(!isPasswordMatched ){
        res.send({status : 0 , message : "Incorrect password"})
      }
      var token= jwt.sign({id : data._id}, JWT_SECRET)
      res.send({status : 1, output : data, token : token});
      console.log(data);
  }
  catch(error){
    console.log(error);
  }
})

app.post('/delete', async (req, res) => {
  // console.log(req.body);
  // await res.send("dddddd")
  try{
    await User.deleteOne({id : req.body.id})
    res.send({status : 1 , message : "Successfuly deleted"})
  }
  catch(err){
    console.log(err);
  }
})

const PORT = 4000;

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
