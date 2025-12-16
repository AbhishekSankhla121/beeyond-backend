import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    image: String,
    price: { 
        type: Number, 
        required: true 
    },
    stock: {  
        type: Number, 
        default: 0, 
        required: true
    },
    isAvailable: { 
        type: Boolean, 
        default: true 
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
