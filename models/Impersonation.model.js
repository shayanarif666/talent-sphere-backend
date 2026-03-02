const mongoose = require("mongoose");
const { Schema } = mongoose;

const impersonationSessionSchema = new Schema(
  {
    superAdminId: { type: Schema.Types.ObjectId, ref: "User", required: true, },
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, },
    targetUserId: { type: Schema.Types.ObjectId, ref: "User", required: true, },
    reason: { type: String, required: true },
    startedAt: { type: Date, default: () => new Date(), },
    endedAt: { type: Date, default: null },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

impersonationSessionSchema.index({ workspaceId: 1 });
impersonationSessionSchema.index({ targetUserId: 1 });

const ImpersonationSession = mongoose.model("ImpersonationSession", impersonationSessionSchema);

module.exports = ImpersonationSession;
