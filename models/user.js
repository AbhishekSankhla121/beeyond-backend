import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },

    password: { 
        type: String, 
        required: true 
    },
    role: {
      type: String,
      enum: ["CUSTOMER", "DELIVERY", "ADMIN"],
      required: true
    },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);


userSchema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "15d" });
}

userSchema.methods.comparePassword = async function (password) {
    console.log(this.password)
    return await bcrypt.compare(password, this.password)
}

export default mongoose.model("User", userSchema);
