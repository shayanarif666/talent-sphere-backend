const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", default: null },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    password: { type: String, default: null },
    hashedPassword: { type: String, default: null },
    status: { type: String, enum: ["active", "invited", "pending", "deactivated"], default: "invited" },
    phoneNumber: { type: String, default: null },
    roles: {
      type: String,
      enum: ["super_admin", "company_owner", "hr_manager", "interviewer", "candidate"],
      default: "super_admin",
    },
    emailVerificationOtp: {
      type: String,
      default: null,
    },

    otpExpiry: {
      type: Date,
      default: null,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    lastLoginAt: { type: Date, default: null },
    approvedBy: { type: Schema.Types.ObjectId, ref: "User", default: null }, // optional
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ workspaceId: 1 });

/**
 * FUTURE (Uncomment when needed)
 */

// Workspace + user status filtering
// UserSchema.index({ workspaceId: 1, status: 1 });

// Workspace + role-based filtering
// UserSchema.index({ workspaceId: 1, roles: 1 });

// Security / analytics
// UserSchema.index({ lastLoginAt: -1 });

// Admin / recent users
// UserSchema.index({ createdAt: -1 });

// Export Model
const User = mongoose.model("User", userSchema);

module.exports = User;
