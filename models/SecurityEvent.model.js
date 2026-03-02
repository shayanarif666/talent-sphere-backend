const mongoose = require("mongoose");
const { Schema } = mongoose;

const securityEventSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, },
    type: { type: String, enum: ["LOGIN_FAILED", "RATE_LIMIT", "SUSPICIOUS_ACCESS", "OTHER"], required: true, },
    other: { type: String, default: null },
    meta: { type: Schema.Types.Mixed, default: {} },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// Alerting & Dashboard: "Show latest security events for a workspace"
securityEventSchema.index({ workspaceId: 1, createdAt: -1 });

// 2. Global security trend analysis
securityEventSchema.index({ workspaceId: 1, type: 1 });

// 3. TTL Index for auto-deletion after 90 days (Recommended)
securityEventSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

const SecurityEvent = mongoose.model("SecurityEvent", securityEventSchema);

module.exports = SecurityEvent;