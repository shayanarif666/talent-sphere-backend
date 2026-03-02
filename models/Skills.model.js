const mongoose = require("mongoose");
const { Schema } = mongoose;

const skillSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    category: { type: Schema.Types.ObjectId, ref: "SkillSubCategory", required: true },
    aliases: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

skillSchema.index({ category: 1 });
skillSchema.index({ name: 1 });
skillSchema.index({ category: 1, isActive: 1 });

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
