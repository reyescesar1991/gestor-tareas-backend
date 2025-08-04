import mongoose, { model, Schema } from "mongoose";

export interface UserDocument extends Document{

    _id: mongoose.Schema.Types.ObjectId;
    name : string;
    lastname : string;
    username : string;
    password : string;
    email : string;
    phone : string;
}

export const userSchema = new Schema<UserDocument>({

    name : {type : String, required: true},
    lastname : {type : String, required: true, trim: true},
    username : {type : String, required: true, unique: true, trim: true},
    password : {type : String, required: true},
    email : {type : String, required: true, unique: true, trim: true},
    phone : {type : String, required: true, unique: true, trim: true}

}, {timestamps : true, versionKey: false});

export const UserModel = model<UserDocument>("User", userSchema);