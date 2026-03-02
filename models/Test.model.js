const mongoose = require("mongoose");
const { Schema } = mongoose;

const PoolModeSchema = new Schema(
  {
    enabled: { type: Boolean, default: false },
    pickN: { type: Number, default: null, min: 1 },
    outOfM: { type: Number, default: null, min: 1 },
  },
  { _id: false }
);

const AttemptRulesSchema = new Schema(
  {
    maxAttempts: { type: Number, default: 1, min: 1 },
    resumeAllowed: { type: Boolean, default: false },
    pauseAllowed: { type: Boolean, default: false },
  },
  { _id: false }
);

const InstructionPageSchema = new Schema(
  {
    rules: { type: String, default: "" },
    requirements: { type: String, default: "" },
  },
  { _id: false }
);

const testSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    testType: { type: String, enum: ["prebuilt", "custom"], required: true },
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft", },
    skillIds: [{ type: Schema.Types.ObjectId, ref: "Skill" }],

    settings: {
      type: new Schema(
        {
          totalDurationSec: { type: Number, default: 3600, min: 60 },
          passScore: { type: Number, default: null, min: 0 },
          negativeMarkingEnabled: { type: Boolean, default: false },
          randomizeQuestions: { type: Boolean, default: true },
          randomizeOptions: { type: Boolean, default: true },
          poolMode: { type: PoolModeSchema, default: () => ({}) },
          attemptRules: { type: AttemptRulesSchema, default: () => ({}) },
        },
        { _id: false }
      ),
      default: () => ({}),
    },

    instructionPage: { type: InstructionPageSchema, default: () => ({}) },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

testSchema.index({ workspaceId: 1 });
testSchema.index({ workspaceId: 1, status: 1 });
testSchema.index({ workspaceId: 1, testType: 1 });
testSchema.index({ skillIds: 1 });

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
