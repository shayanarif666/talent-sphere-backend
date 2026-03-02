const mongoose = require("mongoose");
const { Schema } = mongoose;

const TeamInviteSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true },
    email: { type: String, required: true, trim: true, uniqu: true, lowercase: true },
    role: {
      type: String,
      enum: ["super_admin", "company_owner", "hr_manager", "interviewer", "viewer"],
      required: true
    },
    tokenHash: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    acceptedAt: { type: Date, default: null },
    invitedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

TeamInviteSchema.index({ workspaceId: 1 });

TeamInviteSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);


/**
 * FUTURE (Uncomment when needed)
 */

// Prevent multiple active invites for same email in a workspace
// TeamInviteSchema.index(
//   { workspaceId: 1, email: 1 },
//   { unique: true, partialFilterExpression: { acceptedAt: null } }
// );

// Admin / audit (recent invites)
// TeamInviteSchema.index({ createdAt: -1 });

// Analytics / cleanup
// TeamInviteSchema.index({ acceptedAt: 1 });

/* ------------------------------------------------ */

// Export
module.exports = mongoose.model("TeamInvite", TeamInviteSchema);
