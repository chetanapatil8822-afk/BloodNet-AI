import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
  name: String,
  bloodGroup: String,
  city: String,
  phone: String,
  state: String,
  district: String,

  availability: {
    type: Boolean,
    default: true
  },

  lastDonationDate: {
    type: Date,
    default: null
  }
});

const Donor = mongoose.model("Donor", donorSchema);

export default Donor;