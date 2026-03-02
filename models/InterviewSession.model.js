const mongoose = require("mongoose");
const { Schema } = mongoose;

const InterviewParticipantSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    role: { type: String, enum: ["interviewer", "candidate"], required: true },
    joinTokenHash: { type: String, required: true },
    joinedAt: { type: Date, default: null },
  },
  { _id: false }
);

const interviewSessionSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, },
    candidateId: { type: Schema.Types.ObjectId, ref: "Candidate", required: true, },
    pipelineItemId: { type: Schema.Types.ObjectId, ref: "PipelineItem", required: true, },

    scheduledAt: { type: Date, required: true, },
    durationMin: { type: Number, default: 45, min: 5 },
    status: { type: String, enum: ["scheduled", "live", "ended", "canceled", "no_show"], default: "scheduled", },

    hostUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    participants: { type: [InterviewParticipantSchema], default: [] },

    webrtc: {
      type: new Schema(
        {
          roomId: { type: String, default: null },
          provider: { type: String, enum: ["self", "twilio", "daily"], default: "self" },
        },
        { _id: false }
      ),
      default: () => ({}),
    },

    recordingUrl: { type: String, default: null },

    outcome: {
      type: new Schema(
        {
          decision: { type: String, default: null },
          scorecard: { type: Schema.Types.Mixed, default: null },
          summary: { type: String, default: "" },
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

interviewSessionSchema.index({ scheduledAt: 1 });
interviewSessionSchema.index({ candidateId: 1 });
interviewSessionSchema.index({ hostUserId: 1 });
interviewSessionSchema.index({ pipelineItemId: 1 });

const InterviewSession = mongoose.model("InterviewSession", interviewSessionSchema);

module.exports = InterviewSession;
