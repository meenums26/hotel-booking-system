var express = require('express');
var router = express.Router();
const hotelHelpers = require('../helpers/hotel-helpers');
/* GET users listing. */

router.get('/', function(req, res, next) {
  res.render('hotel/login');
});
router.get('/login', function(req, res) {
  if(req.session.loggedIn){
    res.redirect('hotel/dashboard')
  }
  else{
     
      res.render('hotel/login',({"loggInErr":req.session.loggInErr}))
  }
});
router.post('/login',(req,res)=>{
  console.log(req.body)
  hotelHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true 
      req.session.hotel=response.hotel
      console.log(response.hotel)
      res.redirect('/hotel/dashboard')
    }
    else{
      req.session.loggInErr="Invalid username or password!"
      res.redirect('/hotel/login')
    }
  })
})
router.get('/dashboard',(req,res)=>{
  let hotelData=req.session.hotel
  res.render('hotel/dashboard',{hotel:true,hotelData})
})
router.get('/rooms',(req,res)=>{
  let hotelData=req.session.hotel
  res.render('hotel/rooms',{hotel:true,hotelData})
})
router.get('/customers',(req,res)=>{
  let hotelData=req.session.hotel
  res.render('hotel/customers',{hotel:true,hotelData})
})
router.get('/features',(req,res)=>{
  let hotelData=req.session.hotel
  res.render('hotel/features',{hotel:true,hotelData})
})

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/hotel')
})
module.exports = router;
