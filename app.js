const express = require("express");
const https = require("https"); // to make a request for api
const _ = require("lodash");

const bodyParser = require("body-parser");
const app=express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.get("/",function(req,res)
{
  res.sendFile(__dirname + "/index.html");
  //res.send("server is up and running");
})

app.post("/",function(req,res)
{
  //console.log(req.body.cityName);
  const query=_.capitalize(req.body.cityName);

  const apiKeys="94ee9b583c7edc0b4d5598d09f9d4201";
  const uni="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKeys+"&units="+uni;
  https.get(url,function(response)
  {
//  console.log(response.statusCode);

  response.on("data", function(data)
  {
    //when recieving data from a web server the data is in the form of a string and on parsing it it becomes a javascript object
  const weatherData=JSON.parse(data);
   const temp = weatherData.main.temp;
  const weatherDescription= weatherData.weather[0].description;
  const icon= weatherData.weather[0].icon;
  const feels= weatherData.main.feels_like;
  const imageURL= "http://openweathermap.org/img/wn/"+icon+"@2x.png";
  res.render("list",{tmp: temp, icn:icon, feel:feels, icn:imageURL, qry:query, desc:weatherDescription});
  // res.write("<p>feels like "+ feels + "<p>");
  // res.write("<p>The weather is currently "+ weatherDescription + "<p>");
  // res.write("<h1>The temperature in " + query+" is "+ temp +" degree celcius</h1>");
  // res.write("<img src="+imageURL+">");
  // res.send();
  //console.log(temp);
  //console.log(weatherData);
  })
  })

})












app.listen(3000,function()
{
  console.log("server started");
});
