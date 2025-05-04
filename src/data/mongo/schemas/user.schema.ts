import { model, Schema } from "mongoose";

const userSchema = new Schema ({
    name: {
        type: String,
        required: [ true, "Missing name"]
    },
    lastname: {
        type: String,
        required: [ true, "Missing lastname"]
    },
    type_document: {
        type: String,
        required: [ true, "Missing type_document"],
        enum: ["cc", "ce", "pas", "ppt"]
    },
    document: {
        type: String,
        required: [ true, "Missing document" ],
        unique: true
    },
    email: {
        type: String,
        required: [ true, "Missing email" ],
        unique: true,
    },
    password: {
        type: String,
        required: [ true, "Missing password"]
    },
    role: {
        type: String,
        required: [ true, "Missing role" ],
        enum: [ "CLIENT_ROLE", "ADMIN_ROLE"],
        default: "CLIENT_ROLE"
    },
    created_at: {
        type: Date,
        default: new Date().toISOString(), 
    },
    updated_at: {
        type: String,
        default: new Date().toISOString(),
    }

});

userSchema.set( "toJSON", {
    virtuals: true,
    versionKey: false,
    transform: ( doc, ret, options ) => {
        delete ret._id;
        delete ret.password;
    }
});

export const UserModel = model("User", userSchema );