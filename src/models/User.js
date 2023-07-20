import { Schema, model, models } from "mongoose";

//Define Schema
const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists!"],
      required: [true, "Email is required!"],
    },
    username: {
      type: String,
      required: [true, "Username is required!"],
    },
    image: String,
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;
