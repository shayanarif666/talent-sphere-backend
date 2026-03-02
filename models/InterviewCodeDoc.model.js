const mongoose = require("mongoose");
const { Schema } = mongoose;

const interviewCodeDocSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, },
    sessionId: { type: Schema.Types.ObjectId, ref: "InterviewSession", required: true, },
    language: { type: String, required: true },
    code: { type: String, default: "" },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

interviewCodeDocSchema.index({ sessionId: 1 }, { unique: true });

const InterviewCodeDoc = mongoose.model("InterviewCodeDoc", interviewCodeDocSchema);

module.exports = InterviewCodeDoc;
