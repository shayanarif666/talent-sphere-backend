const mongoose = require("mongoose");
const { Schema } = mongoose;

const testSectionSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, },
    testId: { type: Schema.Types.ObjectId, ref: "Test", required: true, },
    name: { type: String, required: true, trim: true },
    order: { type: Number, required: true, min: 1 },
    durationSec: { type: Number, default: null, min: 60 },
    weight: { type: Number, default: 1, min: 0 },
    skillIds: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
    rules: {
      type: new Schema(
        {
          allowBackNavigation: { type: Boolean, default: true },
          shuffleQuestions: { type: Boolean, default: true },
        },
        { _id: false }
      ),
      default: () => ({}),
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

testSectionSchema.index({ workspaceId: 1, testId: 1 });
testSectionSchema.index({ testId: 1, order: 1 }, { unique: true });

const TestSection = mongoose.model("TestSection", testSectionSchema);

module.exports = TestSection;