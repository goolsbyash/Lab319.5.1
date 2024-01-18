// import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const connectionString = process.env.ATLAS_URI || "";
// const client = new MongoClient(connectionString);

// let conn;

//   conn = await client.connect();

export async function conn() {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to MongoDB using Mongoose.");
  } catch (e) {
    console.error(e);
  }
}

// let db = conn.db("sample_training");

// export default db;
