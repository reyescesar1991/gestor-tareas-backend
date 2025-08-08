import mongoose, { Schema } from "mongoose";

export interface AssignmentDocument extends Document {
    
  task: mongoose.Types.ObjectId;
  assignedBy: mongoose.Types.ObjectId;
  assignedTo: mongoose.Types.ObjectId;
  assignUser : string;
  titleTask : string;
}

const assignmentSchema = new Schema<AssignmentDocument>(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
      unique : true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assignUser: {
      type: String,
      required: true,
      trim: true,
    },
    titleTask: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // Solo necesitamos la fecha de creación
    versionKey: false,
  }
);

// Aquí se define el índice único compuesto
assignmentSchema.index({ task: 1, assignedTo: 1 }, { unique: true });

export const AssignmentModel = mongoose.model<AssignmentDocument>('Assignment', assignmentSchema);