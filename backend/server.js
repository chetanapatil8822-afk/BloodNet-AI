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
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add donor
app.post("/donors", async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.json(donor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete donor
app.delete("/donors/:id", async (req, res) => {
  try {
    await Donor.findByIdAndDelete(req.params.id);
    res.json({ message: "Donor deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update donor (including mark as donated)
app.put("/donors/:id", async (req, res) => {
  try {
    const updatedDonor = await Donor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" } // ✅ New recommended option
    );
    res.json(updatedDonor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// connect DB
mongoose.connect(
  "mongodb+srv://chetana29:dwIjXakSetqw4vgh@bloodnetcluster.eljadmk.mongodb.net/blood-donation=bloodnet-cluster"
);

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});