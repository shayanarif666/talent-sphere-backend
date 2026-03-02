const mongoose = require("mongoose");
const { Schema } = mongoose;

const proctorMediaSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, },
    attemptId: { type: Schema.Types.ObjectId, ref: "Attempt", required: true, },
    type: { type: String, enum: ["webcam_recording", "screen_recording", "snapshot"], required: true },
    fileUrl: { type: String, required: true },
    durationSec: { type: Number, default: 0, min: 0 },
    consent: { type: Boolean, default: true },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

proctorMediaSchema.index({ attemptId: 1 });
proctorMediaSchema.index({ attemptId: 1, type: 1 });

const ProctorMedia = mongoose.model("ProctorMedia", proctorMediaSchema);

module.exports = ProctorMedia;
