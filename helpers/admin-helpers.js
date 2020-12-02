var db=require('../config/connection')
var collection=require('../config/collection')
var nodemailer = require('nodemailer');

module.exports={
    doLogin:(adminData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response={}
            let admin=await db.get().collection(collection.USER_COLLECTION).findOne({username:adminData.username})
            let password=await db.get().collection(collection.USER_COLLECTION).findOne({password:adminData.password})
            if(admin){
                   if(password){
                    loginStatus =true
                   }
                    if(loginStatus){
                        console.log('login success')
                        response.admin=admin
                        console.log("response:",response.admin)
                        response.status=true
                        resolve(response)
                    }
                    else{
                        console.log("login failed")
                        resolve({status:false})
                    }
                
            }else{
                console.log("user not find")
                resolve({status:false})
            }
        })
    },
    addHotel:(hotelData)=>{
        console.log("hotelData:",hotelData)
        return new Promise(async(resolve,reject)=>{
        db.get().collection('hotels').insertOne(hotelData).then((data)=>{
            resolve(data.ops[0])
        }).catch((err)=>{
            console.log("Error:",err)
        })
    })
    },
    sendMail:(reciever)=>{
        console.log("reciever:",reciever)
        responseData={}
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user:'meenumsmav@gmail.com',
                password:'petrichor'
            }
        });
            var mailOptions = {
                from : 'meenumsmav@gmail.com',
                to : reciever.email,
                subject : 'From Travelex',
                text:"Thank you for registering!Your Hotel is added successfully.You can use this username and password to enter into your account.Don't share it with anypone. with regards, Travelex"
            }
            transporter.sendMail(mailOptions,function(error,info){
                if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                    responseData.message = "Hotel registered successfully!"
                    console.log(responseData.message)
                  }
            })
    }
}