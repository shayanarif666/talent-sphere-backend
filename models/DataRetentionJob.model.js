const mongoose = require("mongoose");
const { Schema } = mongoose;

const dataRetentionJobSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, },
    policyDays: { type: Number, required: true, min: 1 },
    lastRunAt: { type: Date, default: null },
    status: { type: String, enum: ["idle", "running", "failed"], default: "idle" },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

dataRetentionJobSchema.index({ workspaceId: 1 }, { unique: true });

const DataRetentionJob = mongoose.model("DataRetentionJob", dataRetentionJobSchema);

module.exports = DataRetentionJob;
