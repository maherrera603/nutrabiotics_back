import { model, Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: [ true, "product price is required" ]
    },
    sku: {
        type: Number,
        required: [ true, "product price is required" ],
        unique: true
    },
    quantity: {
        type: Number,
        required: [ true, "product quantity is required" ],
    },
    price: {
        type: Number,
        required: [ true, "product price is required" ]
    },
    isActive: {
        type: Boolean,
        required: [ true, "product isActive is required" ],
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [ true, "user id is required" ],
        ref: "User"
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

productSchema.set( "toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function( doc, ret, options ){
        delete ret._id;
    }
});

export const ProductModel = model( "Product", productSchema );