const mongoose = require("mongoose");
const { Schema } = mongoose;

const invitationSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, },
    testId: { type: Schema.Types.ObjectId, ref: "Test", required: true, },
    candidateId: { type: Schema.Types.ObjectId, ref: "Candidate", default: null, },
    candidateEmailSnapshot: { type: String, required: true, trim: true, lowercase: true },
    tokenHash: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true, },
    assessmentWindow: {
      type: new Schema(
        {
          startAt: { type: Date, default: null },
          endAt: { type: Date, default: null },
        },
        { _id: false }
      ),
      default: () => ({}),
    },
    status: {
      type: String,
      enum: ["invited", "opened", "started", "completed", "expired", "canceled"],
      default: "invited",
    },
    sentBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sentAt: { type: Date, default: () => new Date() },
    reminderCount: { type: Number, default: 0, min: 0 },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

invitationSchema.index({ workspaceId: 1, testId: 1 });
invitationSchema.index({ candidateId: 1 });
invitationSchema.index({ status: 1 });
invitationSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

const Invitation = mongoose.model("Invitation", invitationSchema);

module.exports = Invitation;