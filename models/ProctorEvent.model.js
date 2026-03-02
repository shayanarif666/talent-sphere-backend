const mongoose = require("mongoose");
const { Schema } = mongoose;

const proctorEventSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, },
    attemptId: { type: Schema.Types.ObjectId, ref: "Attempt", required: true, },
    invitationId: { type: Schema.Types.ObjectId, ref: "Invitation", required: true, },
    type: {
      type: String,
      enum: [
        "TAB_SWITCH",
        "FULLSCREEN_EXIT",
        "COPY",
        "PASTE",
        "WINDOW_BLUR",
        "MULTI_DEVICE",
        "NETWORK_DROP",
        "SCREENSHOT_ATTEMPT",
      ],
      required: true,
    },
    severity: { type: String, enum: ["low", "medium", "high"], default: "low", },
    meta: { type: Schema.Types.Mixed, default: {} },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

proctorEventSchema.index({ attemptId: 1 });
proctorEventSchema.index({ invitationId: 1 });
proctorEventSchema.index({ attemptId: 1, type: 1 });
proctorEventSchema.index(
  { attemptId: 1, severity: 1 },
);

const ProctorEvent = mongoose.model("ProctorEvent", proctorEventSchema);

module.exports = ProctorEvent;
