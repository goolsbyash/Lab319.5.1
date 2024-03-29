import "./localEnv.js";
import {conn} from './db/conn.js';conn();
import express from "express";
import mongoose from "mongoose";


import grades from "./routes/grades.js";

// Not really needed at this time
import Grade from "./models/grades.js"


const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API.");
});

app.use("/grades", grades);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});

// Start the Express server
app.listen(PORT, () => {
    // Mongoose connection can also be initiated here
  console.log(`Server is running on port: ${PORT}`);
});
