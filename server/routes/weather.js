// all weather routes, will be checked for username in db
import express from "express";
import db from "../mongo/index.js";
import { ObjectId } from "mongodb";
import axios from "axios";
const router = express.Router();
const userDocument = db.collection("user");

// Forecast days
const noDaysForecast = 3;
// get weather by city
router.get("/search/:id/:city", async (req, res) => {
  req.params.city = decodeURIComponent(req.params.city);
  let query = { _id: new ObjectId(req.params.id) };
  let user = await userDocument.findOne(query);
  if (!user) res.send("User not found").status(404);
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${req.params.city}&days=${noDaysForecast}`,
    headers: {},
  };
  let weather = await axios(config);
  if (!weather.data) res.send("Location not found.").status(404);
  else res.send(weather.data).status(200);
});

// get weather by lat/long
router.get("/search/:id/:lat/:long", async (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };
  let user = await userDocument.findOne(query);
  if (!user) res.send("User not found").status(404);
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${req.params.lat},${req.params.long}&days=${noDaysForecast}`,
    headers: {},
  };
  let weather = await axios(config);
  if (!weather.data) res.send("Location not found.").status(404);
  else res.send(weather.data).status(200);
});

// Get a user's weather data by id
router.get("/:id", async (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };
  let user = await userDocument.findOne(query);

  if (!user) res.send("User not found").status(404);
  else {
    let weatherData = [];
    for (let city of user.cities) {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=${noDaysForecast}`,
        headers: {},
      };
      let weather = await axios(config);
      weatherData.push(weather.data);
    }
    res.send(weatherData).status(200);
  }
});

export default router;
