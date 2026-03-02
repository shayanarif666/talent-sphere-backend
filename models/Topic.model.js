const mongoose = require("mongoose");
const { Schema } = mongoose;

const topicSchema = new Schema(
  {
    name: { type: String, required: true, unique: true }, // strings, 2D Array
    slug: { type: String, required: true, unique: true },
    skill: { type: Schema.Types.ObjectId, ref: "Skill" },
    isActive: { type: Boolean, default: true },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

topicSchema.index({ skill: 1, isActive: 1 });

const Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;
