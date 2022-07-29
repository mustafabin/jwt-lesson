import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  hobbies: [String],
});

export default mongoose.model("User", userSchema);
