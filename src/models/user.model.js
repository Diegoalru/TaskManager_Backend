import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 6,
      maxlength: 64,
    },
    password: {
      type: String,
      require: true,
      minlength: 8,
      maxlength: 72, // bcrypt truncates at 72 characters maximun.
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
