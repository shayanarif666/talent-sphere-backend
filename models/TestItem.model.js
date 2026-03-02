const mongoose = require("mongoose");
const { Schema } = mongoose;

const testItemSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true },
    testId: { type: Schema.Types.ObjectId, ref: "Test", required: true,  },
    sectionId: { type: Schema.Types.ObjectId, ref: "TestSection", required: true },
    questionId: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    order: { type: Number, required: true, min: 1 },
    scoreOverride: { type: Number, default: null, min: 0 },
    mandatory: { type: Boolean, default: false },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

testItemSchema.index({ workspaceId: 1, testId: 1 });
testItemSchema.index({ testId: 1, sectionId: 1 });
testItemSchema.index({ sectionId: 1, order: 1 });
testItemSchema.index({ questionId: 1 });

const TestItem = mongoose.model("TestItem", testItemSchema);

module.exports = TestItem;
