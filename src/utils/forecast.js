const request = require("request")
const forecast =(longitude,latitude,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=755299d5a6b134b3224f726db36622e3&query="+longitude+","+latitude
    request({url,json:true},(error,{body}={})=>{
        if(error)
        {
            callback("unable to reach site")
        }else if(body.error)
        {
            callback("wrong input")
        }
        else{
            callback("",body.current.weather_descriptions[0]+" it is currently "+body.current.temperature+" degreed out.It feels like " +body.current.feelslike+" degrees out here . The humidity is "+body.current.humidity+"%")
        }
       //   console.log(response.body.current)
       
   
    })


}
module.exports= forecast