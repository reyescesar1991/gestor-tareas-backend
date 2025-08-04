import mongoose, { model, Schema } from "mongoose";
import { PriorityEnum, StatusTaskEnum } from "../enums";

export interface TaskDocument extends Document {

    _id : mongoose.Schema.Types.ObjectId;
    title: string;
    description?: string;
    dueDate?: Date;
    priority: PriorityEnum;
    status: StatusTaskEnum;
    user: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export const taskSchema = new Schema<TaskDocument>({

    title : {type : String, required: true, trim: true},
    description : {type : String, trim: true},
    dueDate : {type : Date},
    priority : {type : String, enum : Object.values(PriorityEnum), required: true},
    status : {type : String, enum : Object.values(StatusTaskEnum), required: true},
    user : {type : Schema.Types.ObjectId, ref : 'User', required: true},
    createdAt : {type : Date, default : new Date(Date.now())},
    updatedAt : {type : Date, default : new Date(Date.now())}

}, {timestamps : true, versionKey: false});

export const TaskModel = model<TaskDocument>("Task", taskSchema);