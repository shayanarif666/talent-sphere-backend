const mongoose = require("mongoose");
const { Schema } = mongoose;

const skillSubCategorySchema = new Schema(
  {
    name: { type: String, unique: true, required: true, trim: true },
    slug: { type: String, unique: true, required: true, trim: true, lowercase: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "SkillCategory", required: true },
    isActive: { type: Boolean, default: true },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

skillSubCategorySchema.index({ categoryId: 1 });
skillSubCategorySchema.index({ slug: 1 }, { unique: true });

const SkillSubCategory = mongoose.model("SkillSubCategory", skillSubCategorySchema);

module.exports = SkillSubCategory;