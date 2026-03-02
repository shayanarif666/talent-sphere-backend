const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobPostSchema = new Schema(
  {
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },

    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true } // createdAt + updatedAt
);

/* ==================== INDEXES ==================== */

/**
 * TTL Index: Auto-delete after 6 months
 * 6 months ≈ 180 days ≈ 180*24*60*60 = 15552000 seconds
 */
jobPostSchema.index({ createdAt: 1 }, { expireAfterSeconds: 15552000 });
jobPostSchema.index({ status: 1 });

const JobPost = mongoose.model("JobPost", jobPostSchema);

module.exports = JobPost;
