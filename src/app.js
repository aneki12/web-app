const path = require("path")
const express =require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const app = express()
const port = process.env.PORT || 3000
//set paths 
const publicdirpath = path.join(__dirname,"../public")
const viewpath = path.join(__dirname,"../template/views")
const partialspath = path.join(__dirname,"../template/partials")

//setup handlebars

app.set("view engine","hbs")
app.set("views",viewpath)
hbs.registerPartials(partialspath)

//setup static directory
app.use(express.static(publicdirpath))
app.get("",(req,res)=>{
    res.render("index",{
        title:"weather app",
        name:"atman das"
    })
})
app.get('/help',(req,res)=>{
    res.render("help",{
        helpmessage:"this is a help message",
        title:"helppage",
        name:"atman das"
    })
})

app.get('/about',(req,res)=>{
    res.render("about",{
        title:"about me",
        name:"atman das"
    })
})

app.get('/weather',(req,res)=>{
    if(req.query.address)
    {
    //     res.send({
    //     forecast:"its always sunny",
    //     location:req.query.address
    // })
    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error)
        {
            return res.send(
                {
                    error:error
                }
            )
        }
       // console.log("error",error)
       // console.log("data",data)
       forecast(longitude,latitude, (error, forecastdata) => {
           if(error)
           {
               return res.send({
                   error:error
               })
           }
           else{
               res.send({
                   forecast:forecastdata,
                   location:location,
                   address:req.query.address

               })
           }
         })
   })
    }
    else{
        res.send(
            {
                error:"need to enter an address"
            }
        )
    }
})


app.get("/help/*",(req,res)=>{
    res.render("error404",{
        title:"error page",
        error:"help page not found",
        name:"atman das"
    })
    })


app.get("*",(req,res)=>{
    res.render("error404",{
        title:"error page",
        error:"404 page not found",
        name:"atman das"
    })
    })




app.listen(port,()=>{
    console.log("server is up at "+ port)
})