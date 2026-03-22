import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
  name: String,
  bloodGroup: String,
  city: String,
  phone: String,
  availability: Boolean,
});

const Donor = mongoose.model("Donor", donorSchema);

export default Donor;