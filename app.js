const express= require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/', function(req,res){
    res.sendFile(__dirname +"/index.html");
   
});

app.post("/", function(req,res){
    //console.log(req.body.cityName);    
    // console.log("post request received"); 

    const query=req.body.cityName;
    const apiKey = "e23a723510644681ac618dd49136a36b";
    const unit= "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + " &appid=" +apiKey+"&units=" +unit;

    https.get(url, function(response){
        //console.log(response);
        response.on("data",function(data){
            const weatherData = JSON.parse(data); 
            const temp = weatherData.main.temp;
            const tempdescription = weatherData.weather[0].description;
            
            //console.log(tempdescription);
            //console.log(weatherData); 
            //console.log(temp)

            const icon = weatherData.weather[0].icon;
            //console.log(icon);

            const imageurl = " http://openweathermap.org/img/wn/" +icon+ "@2x.png";

            res.write("<P> The weather desciption is " + tempdescription+ "</P>");
            
            res.write("<h1>The temperature in "+query+ " is " + temp + " degree celsius.</h1>");

            res.write("<img src=" +imageurl +">");

            res.send();

            res.redirect("/");
        })
    });
   // res.send("Server is up nd running")
})

app.listen(3000, function(){
    console.log("running from port 3000");
});