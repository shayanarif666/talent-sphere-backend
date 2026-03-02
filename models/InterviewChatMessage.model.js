const mongoose = require("mongoose");
const { Schema } = mongoose;

const interviewChatMessageSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, },
    sessionId: { type: Schema.Types.ObjectId, ref: "InterviewSession", required: true, },
    senderType: { type: String, enum: ["interviewer", "candidate"], required: true },
    text: { type: String, required: true },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

interviewChatMessageSchema.index({ sessionId: 1, createdAt: 1 });

const InterviewChatMessage = mongoose.model("InterviewChatMessage", interviewChatMessageSchema);

module.exports = InterviewChatMessage;
