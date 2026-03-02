const mongoose = require("mongoose");
const { Schema } = mongoose;

const skillCategorySchema = new Schema(
  {
    type: { type: String, enum: ["Programming & IT", "Core Skills", "Business Roles"], unique: true, required: true },
    slug: { type: String, required: true, unique: true, },
    isActive: { type: Boolean, default: true },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

const SkillCategory = mongoose.model("SkillCategory", skillCategorySchema);

module.exports = SkillCategory;