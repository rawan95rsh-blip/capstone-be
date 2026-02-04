import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  avatarId: { type: String, default: "" },
});

const User = model("User", userSchema);
export default User;