const mongoose = require("mongoose");
const { Schema } = mongoose;

/* -------------------- Brand -------------------- */
const BrandSchema = new Schema(
  {
    logoUrl: { type: String, default: null },
    companyDomain: { type: String, default: null },
  },
  { _id: false }
);

/* -------------------- Settings -------------------- */
const WorkspaceSettingsSchema = new Schema(
  {
    dataRetentionDays: { type: Number, default: 365, min: 1 },
    defaultInviteExpiryDays: { type: Number, default: 14, min: 1 },
  },
  { _id: false }
);

/* -------------------- Workspace -------------------- */
const workspaceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    brand: {
      type: BrandSchema,
      default: () => ({}),
    },

    timezone: {
      type: String,
      default: "Asia/Karachi",
    },

    settings: {
      type: WorkspaceSettingsSchema,
      default: () => ({}),
    },

    billingAccountId: {
      type: Schema.Types.ObjectId,
      ref: "BillingAccount",
      default: null,
    },

    country: {
      type: String,
      default: null,
    },

    isTrial: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "pending",
    },

    trialStartDate: {
      type: Date,
      default: null,
    },

    trialEndDate: {
      type: Date,
      default: null,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true,
  }
);

/* ==================== INDEXES ==================== */

/**
 * ACTIVE (NOW)
 * Business-critical index
 * Enforces unique workspace identity
 */
workspaceSchema.index({ slug: 1 }, { unique: true });

/**
 * FUTURE (Uncomment when needed)
 */

// Fast user dashboard ("My Workspaces")
// WorkspaceSchema.index({ createdBy: 1 });

// Billing & subscription lookups
// WorkspaceSchema.index({ billingAccountId: 1 });

// Admin / analytics (recent workspaces)
// WorkspaceSchema.index({ createdAt: -1 });

// Advanced dashboard sorting & pagination
// WorkspaceSchema.index({ createdBy: 1, createdAt: -1 });

/* ------------------------------------------------ */

const Workspace = mongoose.model("Workspace", workspaceSchema);

module.exports = Workspace;
