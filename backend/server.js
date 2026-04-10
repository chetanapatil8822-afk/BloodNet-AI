console.log("🔥 THIS IS SERVER.JS FILE RUNNING");
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Donor from "./models/Donor.js";
import User from "./models/User.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API running...");
});

app.get("/check", (req, res) => {
  res.send("Login route added");
});


// ================= DONOR ROUTES =================

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
    let { name, phone, bloodGroup, city } = req.body;

    // ✅ 1. Basic validation
    if (!name || !phone || !bloodGroup || !city) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ 2. Clean phone (remove spaces, +, - etc.)
    const cleanPhone = phone.replace(/\D/g, "");

    // ✅ 3. Validate phone length
    if (cleanPhone.length !== 10) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    // ✅ 4. Save cleaned phone
    const donor = new Donor({
      ...req.body,
      phone: cleanPhone,
    });

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

// Update donor
app.put("/donors/:id", async (req, res) => {
  try {
    const updatedDonor = await Donor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // ✅ correct option
    );
    res.json(updatedDonor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= AUTH ROUTES =================

// Signup
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    res.json({ message: "Signup successful" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ❌ check empty
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔍 find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 🔐 check password
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ success
    res.json({
      message: "Login successful",
      role: user.role,
      name: user.name,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= ML MATCHING ROUTE =================

app.post("/match-donors", async (req, res) => {
  try {
    const { bloodGroup, city, district } = req.body;

    // STEP 1: Get all donors
    const donors = await Donor.find();

    // STEP 2: Filter by blood group
    const filteredByBlood = donors.filter(
      d => d.bloodGroup === bloodGroup
    );

    // STEP 3: Score by location
    const ranked = filteredByBlood.map(d => {
  let score = 0;

  // 🩸 Blood group (50)
  if (d.bloodGroup === bloodGroup) {
    score += 50;
  }

  // 📍 City (30)
  if (city && d.city?.toLowerCase() === city.toLowerCase()) {
    score += 30;
  }

  // 🏠 District (10)
  if (district && d.district?.toLowerCase() === district.toLowerCase()) {
    score += 10;
  }

  // ⚡ Availability (10)
  if (d.availability) {
    score += 10;
  }

  return {
    ...d._doc,
    score // ALWAYS between 0–100
  };
});

    // STEP 4: Sort
    const sorted = ranked.sort((a, b) => b.score - a.score);

    // STEP 5: Return
    res.json(sorted);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



// ================= DATABASE =================

mongoose.connect(
  "mongodb+srv://chetana29:dwIjXakSetqw4vgh@bloodnetcluster.eljadmk.mongodb.net/bloodnet-cluster"
);

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});


// ================= SERVER =================

app.listen(5000, () => {
  console.log("Server running on port 5000");
});