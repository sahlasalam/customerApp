const express = require("express")
const router = express.Router()

const cors = require("cors");
const bodypars= require('body-parser')
router.use(cors());
router.use(bodypars.json())


const db= require("../config/db");
const User = require('../models/user') 
const jwt = require('jsonwebtoken')

db();

const JWT_SECRET= "mkjhewywifjpoaxYTwwwdkxuhdi";

router.post('/delete', async (req, res) => {
    try{
      var token = req.body.token;
      jwt.verify(token, JWT_SECRET, async function(err, decoded){
        if(err){
          res.send({status : 0 , message : "credentials does not match"})
        }
        await User.deleteOne({_id : decoded.id})
        console.log(decoded);
        res.send({status : 1 , message : "Successfuly deleted"})
    
      })
    }
    catch(err){
      console.log(err);
    }
  })
  
  module.exports = router;