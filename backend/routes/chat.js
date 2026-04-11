import express from "express";
import Donor from "../models/Donor.js";

const router = express.Router();

// 🧠 Blood Compatibility Map
const compatibilityMap = {
  "O-": ["O-"],
  "O+": ["O+", "O-"],
  "A-": ["A-", "O-"],
  "A+": ["A+", "A-", "O+", "O-"],
  "B-": ["B-", "O-"],
  "B+": ["B+", "B-", "O+", "O-"],
  "AB-": ["AB-", "A-", "B-", "O-"],
  "AB+": ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]
};

router.post("/chat", async (req, res) => {

  const { message } = req.body;

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  let detectedGroup = bloodGroups.find(bg =>
    message.toUpperCase().includes(bg)
  );

  let detectedCity = null;

  if (message.toLowerCase().includes("mumbai")) {
    detectedCity = "Mumbai";
  }

  // 🧠 Compatibility map
  const compatibilityMap = {
    "O-": ["O-"],
    "O+": ["O+", "O-"],
    "A-": ["A-", "O-"],
    "A+": ["A+", "A-", "O+", "O-"],
    "B-": ["B-", "O-"],
    "B+": ["B+", "B-", "O+", "O-"],
    "AB-": ["AB-", "A-", "B-", "O-"],
    "AB+": ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]
  };

  let donors = [];

if (detectedGroup && detectedCity && compatibilityMap[detectedGroup]) {

  const compatibleGroups = compatibilityMap[detectedGroup];

  const userLocation = {
    type: "Point",
    coordinates: [72.8777, 19.0760] // temporary
  };

  // 🔍 STEP 1: Try geo search (location wale donors)
  const geoDonors = await Donor.find({
    bloodGroup: { $in: compatibleGroups },
    availability: true,
    location: {
      $near: {
        $geometry: userLocation,
        $maxDistance: 10000 // 10 km
      }
    }
  }).limit(5);

  if (geoDonors.length > 0) {
    donors = geoDonors;
  } else {

    // 🔁 STEP 2: Fallback to city search
    donors = await Donor.find({
      bloodGroup: { $in: compatibleGroups },
      city: detectedCity,
      availability: true
    }).limit(5);
  }
}

  // ✅ SAFE AI RESPONSE
  let aiReply = "";

  if (!detectedGroup || !detectedCity) {

    aiReply = `
Please provide complete details 🙏

Example:
"Need O+ blood in Mumbai urgently"
`;

  } else {

    const compatible = compatibilityMap[detectedGroup] || [];

    aiReply = `
⚠️ Emergency detected.

🩸 Required: ${detectedGroup}
📍 Location: ${detectedCity}

✅ Compatible donors: ${compatible.join(", ")}

🔍 ${donors.length > 0 ? "Showing available donors..." : "No donors found currently"}
`;
  }

  res.json({
    aiReply,
    donors
  });

});

export default router;