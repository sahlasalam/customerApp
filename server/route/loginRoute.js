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

router.post('/login', async (req , res) =>{
    try{
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
        var outputData = {name : data.name,
                          number : data.number,
                          place : data.place}
        res.send({status : 1, output : outputData, token : token});
        console.log(data);
    }
    catch(error){
      console.log(error);
    }
  })

  module.exports = router