const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
	res.sendFile(__dirname + "/public/index.html");
	app.use(express.static("public"));
});

app.post("/", function(req, res){
	const city = req.body.city;
	const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=3d905385c00a581723fe8ddde72c3964&units=metric";

	https.get(url, function(response){
		response.on("data", function(data){

			const weatherData = JSON.parse(data);
			const nameCity = weatherData.name;
			const temp = weatherData.main.feels_like;
			const weatherDescription = weatherData.weather[0].description;
			const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";

			res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
			res.write('<body style="background-color: #BAD7E9;">')
			res.write('<h1 style="text-align: center; margin-top: 100px;">The temperature in ' + nameCity + " is  " + temp + ' degrees Celsius.</h1>');
			res.write('<h2 style="text-align: center;"> Today will be a ' + weatherDescription + ' day</h2>');
			res.write('<img style="margin-left: 45%" src=' + icon + '>');
			res.send();
		});
	})
});
app.listen(3000, function(){
	console.log("Port 3000 listening");
});
