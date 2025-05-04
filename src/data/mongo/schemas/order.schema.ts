import { model, Schema } from "mongoose";

const orderSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        required: [ true, "product is required"],
        ref: "Product",
    },
    price_unit: {
        type: Number,
        required: [ true, "price is required"]
    },
    quantity: {
        type: Number,
        required: [ true, "price is required" ]
    },
    price_total: {
        type: Number,
        required: [ true, "price total is required"]
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [ true, "user is required"]
    },
    created_at: {
        type: Date,
        default: new Date().toISOString()
    },
    updated_at: {
        type: Date,
        default: new Date().toISOString()
    }
});

orderSchema.set( "toJSON", {
    virtuals: true,
    versionKey: false,
    transform: ( doc, ret, options ) => {
        delete ret._id;
    }
});

export const OrderModel = model("Order", orderSchema );