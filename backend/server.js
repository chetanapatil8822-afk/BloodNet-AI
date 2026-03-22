import Donor from "./models/Donor.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// Get donors
app.get("/donors", async (req, res) => {
  const donors = await Donor.find();
  res.json(donors);
});

// Add donor
app.post("/donors", async (req, res) => {
  const donor = new Donor(req.body);
  await donor.save();
  res.json(donor);
});


// connect DB
mongoose.connect("mongodb+srv://chetana29:dwIjXakSetqw4vgh@bloodnetcluster.eljadmk.mongodb.net/blood-donation=bloodnet-cluster");

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

