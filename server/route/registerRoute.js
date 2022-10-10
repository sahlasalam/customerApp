const express = require("express")
const router = express.Router()

const cors = require("cors");
const bodypars= require('body-parser')
router.use(cors());
router.use(bodypars.json())


const db= require("../config/db");
const User = require('../models/user') 
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')

db();

const JWT_SECRET= "mkjhewywifjpoaxYTwwwdkxuhdi";

router.post('/save', async (req, res) =>{

    var hashedPassword = bcrypt.hashSync(req.body.password,10)
  
    try{
      User.findOne({id: req.body.id}, async function(err, log){
        if(log){
          res.send({status : 0, message : "Customer already exist...please login"})
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
  
    module.exports = router