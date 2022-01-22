const request= require("request")
const geocode=(address,callback)=>{

    const url= "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiYXRtYW5kYXMxIiwiYSI6ImNreWhkMW9ndDFrMGkyb3FoYjJ3ZXQ1dzMifQ.wiWQwUi1-eUZgCjWDtE_Ug"
    request({url,json :true},(error,{body}={})=>{
      if(error)
       {
           callback("unable to reach site")
       }
       else if(body.features.length===0)
       {
           callback("wrong input")
       }
       else{
          const longitude = body.features[0].center[1]
          const latitude = body.features[0].center[0]
              const data =
               {
              longitude,
              latitude,
              location:body.features[0].place_name    
           }
           callback("",data)
          
       }
   
})


}
module.exports = geocode