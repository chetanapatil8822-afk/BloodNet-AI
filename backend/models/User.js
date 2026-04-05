import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // duplicate email nahi hoga
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user", // by default user
  },
});

export default mongoose.model("User", userSchema);