import mongoose, { Schema } from "mongoose";

export interface AssignmentDocument extends Document {
    
  task: mongoose.Types.ObjectId;
  assignedBy: mongoose.Types.ObjectId;
  assignedTo: mongoose.Types.ObjectId;
}

const assignmentSchema = new Schema<AssignmentDocument>(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
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
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // Solo necesitamos la fecha de creación
    versionKey: false,
  }
);

export const AssignmentModel = mongoose.model<AssignmentDocument>('Assignment', assignmentSchema);