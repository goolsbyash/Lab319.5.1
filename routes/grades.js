import express from "express";
// import db from "../db/conn.js";
// import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import Grade from "../models/grades.js";

const router = express.Router();

// Main Route
router.get("/", (req, res) => {
  let result = Grade.find({});
  res.send(result);
});

// POST route
router.post("/", async (req, res) => {
  //   const collection = await db.collection("grades");
  let newDocument = req.body;

  // Check if new document has property student_id
  if (newDocument.student_id) {
    newDocument.learner_id = newDocument.student_id;
    delete newDocument.student_id;
  }
  // Store new document in database
  //   const result = await collection.insertOne(newDocument);

  const result = await Grade.create(newDocument);
  res.send(result).status(204); // Returns acknowledgement and _ObjectId
});

// GET a single grade entry
router.get("/:id", async (req, res) => {
  //   let collection = await db.collection("grades");
  //   let query = { _id: ObjectId(req.params.id) };
  //   let result = await collection.findOne(query);

  //   if (!result) res.send("Not found").status(404);
  //   else res.send(result).status(200);
  try {
    let result = await Grade.findOne({ _id: req.params.id });
    res.send(result);
  } catch {
    res.status(404).send("Not Found");
  }
});

// For backward conversion (learner_id was changed to learner_id)
router.get("/student/:id", async (req, res) => {
  res.redirect(`/grades/learner/${req.params.id}`);
});

// GET a student's grade data
router.get("/learner/:id", async (req, res) => {
  //   let collection = await db.collection("grades");
  //   let query = { student_id: Number(req.params.id) };
  //   let result = await collection.find(query).toArray();

  //   if (!result) res.send("Not found").status(404);
  //   else res.send(result).status(200);
  try {
    // Includes scores of all objects with matching learner id
    let result = await Grade.find({ learner_id: req.params.id }).select(
      "scores"
    );
    res.send(result);
  } catch {
    res.status(404).send("Not Found");
  }
});

// Get a class's grade data
router.get("/class/:id", async (req, res) => {
  //   let collection = await db.collection("grades");
  //   let query = { class_id: Number(req.params.id) };
  //   let result = await collection.find(query).toArray();

  //   if (!result) res.send("Not found").status(404);
  //   else res.send(result).status(200);

  try {
    let result = await Grade.find({ class_id: req.params.id }).select("scores");
    res.send(result);
  } catch {
    res.status(404).send("Not Found");
  }
});

export default router;
