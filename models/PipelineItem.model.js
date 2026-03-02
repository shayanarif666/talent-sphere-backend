const mongoose = require("mongoose");
const { Schema } = mongoose;

const pipelineItemSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true },
    candidateId: { type: Schema.Types.ObjectId, ref: "Candidate", required: true },
    testId: { type: Schema.Types.ObjectId, ref: "Test", required: true },
    attemptId: { type: Schema.Types.ObjectId, ref: "Attempt", default: null },

    stage: {
      type: String,
      enum: [
        "invited",
        "completed",
        "reviewed",
        "shortlisted",
        "interview_scheduled",
        "interviewed",
        "selected",
        "rejected",
      ],
      default: "invited",
    },

    assignedToUserId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    tags: { type: [String], default: [] },
    notesCount: { type: Number, default: 0, min: 0 },

    decision: {
      type: new Schema(
        {
          status: { type: String, default: null },
          reason: { type: String, default: "" },
          decidedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
          decidedAt: { type: Date, default: null },
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

/* ==================== INDEXES ==================== */

// Most common: workspace + stage filtering
pipelineItemSchema.index({ workspaceId: 1, stage: 1 });

// Candidate-specific lookup
pipelineItemSchema.index({ candidateId: 1 });

// Filter by assigned recruiter
pipelineItemSchema.index({ assignedToUserId: 1 });

// Optional compound for workspace + stage + assignedToUserId
// PipelineItemSchema.index({ workspaceId: 1, stage: 1, assignedToUserId: 1 });

// Optional testId index for reporting
// PipelineItemSchema.index({ testId: 1 });

// Optional decision status index for analytics
// PipelineItemSchema.index({ "decision.status": 1 });

const PipelineItem = mongoose.model("PipelineItem", pipelineItemSchema);

module.exports = PipelineItem;
