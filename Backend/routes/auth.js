const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser=require('../middleware/fetchUser')

const JWT_SEC = "palakisgreatguy%"

//THIS IS TO CREATE A USER
router.post('/createUser', [body('email').isEmail(), body('name').isLength({ min: 3 }), body('password').isLength({ min: 5 })], async (req, res) => {
  // console.log(req.body)
  // const user= User(req.body)
  // user.save();
  // res.send("hello")
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {


    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry, this email already exist" })
    }

    const salt = await bcrypt.genSalt(10);
    const seccPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: seccPass,
    })

    const data = {
      user: {
        id: user.id
      }
    }

    const jwtData = jwt.sign(data, JWT_SEC)
    //  console.log(jwtData);
    //  res.json(user)
    res.json({ jwtData })

  }
  catch (error) {
    console.error(error.message)
    res.status(500).send("Some errror Occured!")
  }


})

//THIS IS FOR LOGIN THE USER
router.post('/login', [body('email').isEmail(), body('password', 'Password can not be blank').exists()], async (req, res) => {
  let success= false
     
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password}= req.body;
  try{
    let user= await User.findOne({email})
    if(!user){
      return res.status(400).json({error:"Sorry user does not exist"})
    }

    const passCompare= await bcrypt.compare(password,user.password)
    if(!passCompare){
      success=false; 
      return res.status(400).json({success,error:"Please enter correct credentials"})
    }

    const data = {
      user: {
        id: user.id
      }
    }

    const jwtData = jwt.sign(data, JWT_SEC)
    success=true;
    res.json({success,jwtData})
  } catch(error){
     
    console.error(error.message)
    res.status(500).send("Some errror Occured!")
  }
})

//THIS IS FOR GETTING INFORMATION OF LOGED USER

router.post('/getUser',fetchUser, async (req, res) => {

  try{
     userId=req.user.id;
     const user=await User.findById(userId).select("-password")
     res.send(user)
  } catch(error){
    console.error(error.message)
    res.status(500).send("Some errror Occured!")
  }

})


module.exports = router