const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const mongoose = require('mongoose')
const db = "mongodb+srv://Auser:swarnijii@eventsdb.jc3zj.mongodb.net/<dbname>?retryWrites=true&w=majority"

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err)
       console.error(err);
    else
       console.log("Connected to the mongodb"); 
  });
router.get('/',( req,res)=> {
res.send('api')
})
router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((err, registerUserData) => {
      if (err) {
        console.log(err)      
      } else {
        
      let payload = {subject:registerUserData._id}
      let token = jwt.sign(payload,'secretKey')
        res.status(200).send({token})
      }
    })
  })

//LOgin api
  router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({email: userData.email}, (err, user) => {
      if (err) {
        console.log(err)    
      } else {
        if (!user) {
          res.status(401).send('Invalid Email')
        } else 
        if ( user.password !== userData.password) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = {subject:user._id}
          let token = jwt.sign(payload,'secretKey')
          res.status(200).send({token})
        }
      }
    })
  })
  router.get('/events', (req,res) => {
    let events = [
        {
          "_id": "1",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "2",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "3",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "4",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "5",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "6",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        }
      ]
      res.json(events)
  })
  router.get('/special', verifyToken ,(req, res) => {
    let specialEvents = [
      {
        "_id": "1",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(specialEvents)
  })
  //verify token
  function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }
module.exports=router;