const mongoose = require("mongoose");
const { Schema } = mongoose;

const SystemMetaSchema = new Schema(
  {
    ip: { type: String, default: null },
    timezoneOffset: { type: Number, default: null },
  },
  { _id: false }
);

const attemptSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, },
    invitationId: { type: Schema.Types.ObjectId, ref: "Invitation", required: true, },
    testId: { type: Schema.Types.ObjectId, ref: "Test", required: true, },
    candidateId: { type: Schema.Types.ObjectId, ref: "Candidate", required: true, },

    status: {
      type: String,
      enum: ["started", "in_progress", "submitted", "terminated", "timed_out"],
      default: "started",
    },
    startedAt: { type: Date, default: () => new Date() },
    submittedAt: { type: Date, default: null },
    durationSecUsed: { type: Number, default: 0, min: 0 },

    score: {
      type: new Schema(
        {
          total: { type: Number, default: null },
          pass: { type: Boolean, default: null },
          bySection: { type: [Schema.Types.Mixed], default: [] },
          bySkill: { type: [Schema.Types.Mixed], default: [] }, // problem
        },
        { _id: false }
      ),
      default: () => ({}),
    },

    meta: { type: SystemMetaSchema, default: () => ({}) },

    flagsSummary: {
      type: new Schema(
        {
          tabSwitches: { type: Number, default: 0, min: 0 },
          fullscreenExits: { type: Number, default: 0, min: 0 },
          copyEvents: { type: Number, default: 0, min: 0 },
        },
        { _id: false }
      ),
      default: () => ({}),
    },

    review: {
      type: new Schema(
        {
          requiresManualReview: { type: Boolean, default: false },
          reviewedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
          reviewedAt: { type: Date, default: null },
        },
        { _id: false }
      ),
      default: () => ({}),
    },

    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

attemptSchema.index({ workspaceId: 1, testId: 1 });
attemptSchema.index({ workspaceId: 1, candidateId: 1 });
attemptSchema.index({ invitationId: 1 }, { unique: true });
attemptSchema.index({ status: 1 });
attemptSchema.index(
  { candidateId: 1, status: 1 },
  { partialFilterExpression: { status: { $in: ["started", "in_progress", "submitted"] } } }
);

const Attempt = mongoose.model("Attempt", attemptSchema);

module.exports = Attempt;