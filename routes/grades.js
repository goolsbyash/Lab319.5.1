import express from "express";
// import db from "../db/conn.js";
// import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import Grade from "../models/grades.js";

const router = express.Router();

// Get a single grade entry
router.get("/:id", async (req, res) => {
  //   let collection = await db.collection("grades");
  //   let query = { _id: ObjectId(req.params.id) };
  //   let result = await collection.findOne(query);

  //   if (!result) res.send("Not found").status(404);
  //   else res.send(result).status(200);
  try {
    let result = await Grade.find({ learner_id: req.params.id });
    res.send(result);
  } catch {
    res.status(404).send("Not Found");
  }
});

// Get a student's grade data
router.get("/student/:id", async (req, res) => {
  let collection = await db.collection("grades");
  let query = { student_id: Number(req.params.id) };
  let result = await collection.find(query).toArray();

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Get a class's grade data
router.get("/class/:id", async (req, res) => {
  let collection = await db.collection("grades");
  let query = { class_id: Number(req.params.id) };
  let result = await collection.find(query).toArray();

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

export default router;
