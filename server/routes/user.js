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
  let newDocument = req.body;
  newDocument.created_date = new Date();
  newDocument.updated_date = new Date();
  let result = await userDocument.insertOne(newDocument);
  res.send(result).status(204);
});

// add a new city to user
router.patch("/add_city/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const update = {
    $push: { cities: req.body.city },
    $set: { updated_date: new Date() },
  };

  let result = await userDocument.updateOne(query, update);
  res.send(result).status(200);
});

// remove a city from a user
router.delete("/remove_city/:id/:city", async (req, res) => {
  // url decode the city name
  req.params.city = decodeURIComponent(req.params.city);
  const query = { _id: new ObjectId(req.params.id) };
  const update = {
    $pull: { cities: req.params.city },
    $set: { updated_date: new Date() },
  };

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
