const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, },
    entityType: { type: String, enum: ["candidate", "attempt", "pipeline", "interview"], required: true, },
    entityId: { type: Schema.Types.ObjectId, required: true, },
    text: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true, },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

noteSchema.index({ workspaceId: 1 });
noteSchema.index({ entityType: 1, entityId: 1 });
noteSchema.index({ createdBy: 1 });

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
