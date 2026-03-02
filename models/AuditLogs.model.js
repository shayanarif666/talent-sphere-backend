const mongoose = require("mongoose");
const { Schema } = mongoose;

const auditLogSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, },
    actorUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true, },
    entityType: { type: String, required: true, },
    entityId: { type: Schema.Types.ObjectId, required: true, },
    ip: { type: String, default: null },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// 1. Primary filter for workspace dashboards
auditLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 864000 });

// 2. To track actions on a specific object (Test, Question, etc.)
auditLogSchema.index({ workspaceId: 1 });

// 3. To track specific user actions
auditLogSchema.index({ actorUserId: 1 });

// 365 din baad document khud delete ho jayega
auditLogSchema.index({ entityType: 1, entityId: 1 });

/**
 * FUTURE / Conditional INDEXES (Uncomment when needed)
 */

// Logs filtered by workspace + action type
// AuditLogSchema.index({ workspaceId: 1, action: 1 });

// Logs filtered by workspace + actorUserId + action
// AuditLogSchema.index({ workspaceId: 1, actorUserId: 1, action: 1 });

// Logs filtered by ip (security analytics)
// AuditLogSchema.index({ ip: 1 });

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

module.exports = AuditLog;