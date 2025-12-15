import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    deliveryPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ],

    totalAmount: { type: Number, required: true },

    status: {
      type: String,
      enum: [
        "PLACED",
        "ASSIGNED",
        "PICKED_UP",
        "ON_THE_WAY",
        "DELIVERED",
        "CANCELLED"
      ],
      default: "PLACED"
    },
    isLocked: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
