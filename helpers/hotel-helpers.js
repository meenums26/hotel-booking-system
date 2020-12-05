var db=require('../config/connection')
var collection=require('../config/collection')
const bcrypt = require('bcrypt')


module.exports={
    doLogin:(hotelData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response={}
    
            let hotel=await db.get().collection(collection.HOTEL_COLLECTION).findOne({username:hotelData.username})
            console.log("user found :",hotel)
            if(hotel){
                  
                        bcrypt.compare(hotelData.password,hotel.password).then((status)=>{
                            if(status){
                        console.log('login success')
                        response.hotel=hotel
                        console.log("response:",response.hotel)
                        response.status=true
                        resolve(response)
                    }
                    else{
                        console.log("login failed")
                        resolve({status:false})
                    }
                })
                
            }else{
                console.log("Hotel not found!")
                resolve({status:false})
            }
        })
    }
    
   
}