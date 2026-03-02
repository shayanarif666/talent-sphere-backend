const mongoose = require("mongoose");
const { Schema } = mongoose;

const manualReviewQueueSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, },
    attemptId: { type: Schema.Types.ObjectId, ref: "Attempt", required: true, },
    questionId: { type: Schema.Types.ObjectId, ref: "Question", required: true, },
    status: { type: String, enum: ["pending", "reviewed"], default: "pending", },
    reviewerId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    reviewNotes: { type: String, default: "" },
    scoreOverride: { type: Number, default: null, min: 0 },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

manualReviewQueueSchema.index({ workspaceId: 1, status: 1 });
manualReviewQueueSchema.index({ attemptId: 1 });
manualReviewQueueSchema.index({ questionId: 1 });
manualReviewQueueSchema.index(
  { workspaceId: 1 },
  { partialFilterExpression: { status: "pending" } }
);

const ManualReviewQueue = mongoose.model("ManualReviewQueue", manualReviewQueueSchema);

module.exports = ManualReviewQueue;