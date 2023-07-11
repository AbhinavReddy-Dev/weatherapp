import express from "express";
import db from "../mongo/index.js";
import { ObjectId } from "mongodb";

const router = express.Router();
const userDocument = db.collection("user");

// Get a user's data by id
router.get("/:id", async (req, res) => {
  let query = { _id: new ObjectId(req.params.id) };
  let result = await userDocument.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Add a new user
router.post("/create/", async (req, res) => {
  let query = { username: req.body.username };
  let user = await userDocument.findOne(query);
  if (user) {
    res.send(user).status(200);
    return;
  }
  let newDocument = req.body;
  const newDate = new Date();
  newDocument.created_date = newDate;
  newDocument.updated_date = newDate;
  newDocument.cities = [];
  let result = await userDocument.insertOne(newDocument);
  // resend the document to the client
  const query2 = { _id: new ObjectId(result.insertedId) };
  let result2 = await userDocument.findOne(query2);
  res.send(result2).status(200);
});

// add a new city to user
router.patch("/add_city/:id", async (req, res) => {
  // check if city is already in user's list
  const user_q = { _id: new ObjectId(req.params.id) };
  const user = await userDocument.findOne(user_q);
  if (user.cities.includes(req.body.city)) {
    res.send("City already in user's list").status(200);
    return;
  }

  const query = { _id: new ObjectId(req.params.id) };
  const update = {
    $push: { cities: req.body.city },
    $set: { updated_date: new Date() },
  };

  let result = await userDocument.updateOne(query, update);
  res.send(result).status(200);
});

// remove a city from a user
router.patch("/remove_city/:id/:city", async (req, res) => {
  // url decode the city name
  req.params.city = decodeURIComponent(req.params.city);
  const query = { _id: new ObjectId(req.params.id) };
  const update = {
    $pull: { cities: req.params.city },
    $set: { updated_date: new Date() },
  };
  console.log(update);
  let result = await userDocument.updateOne(query, update);
  res.send(result).status(200);
});

// Delete a user
router.delete("/delete/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  let result = await userDocument.deleteOne(query);

  res.send(result).status(200);
});

export default router;
