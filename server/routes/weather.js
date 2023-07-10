// all weather routes, will be checked for username in db
import express from "express";
import db from "../mongo/index.js";
import { ObjectId } from "mongodb";
import axios from "axios";
const router = express.Router();
const userDocument = db.collection("user");

// Get a user's weather data by id
router.get("/:id", async (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };
  let user = await userDocument.findOne(query);

  if (!user) res.send("Not found").status(404);
  else {
    let weatherData = [];
    for (let city of user.cities) {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}`,
        headers: {},
      };
      let weather = await axios(config);
      weatherData.push(weather.data);
    }
    res.send(weatherData).status(200);
  }
});

// get a user's city's 3 day forecast
router.get("/forecast/:id/:city", async (req, res) => {
  req.params.city = decodeURIComponent(req.params.city);
  let query = { _id: new ObjectId(req.params.id) };
  let user = await userDocument.findOne(query);
  if (!user) res.send("Not found").status(404);
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${req.params.city}&days=3`,
    headers: {},
  };
  let weather = await axios(config);
  res.send(weather.data).status(200);
});

export default router;
