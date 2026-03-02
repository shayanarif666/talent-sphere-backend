const mongoose = require("mongoose");
const { Schema } = mongoose;

const codeRunSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, },
    attemptId: { type: Schema.Types.ObjectId, ref: "Attempt", required: true, },
    questionId: { type: Schema.Types.ObjectId, ref: "Question", required: true, },
    language: { type: String, required: true },
    sourceCodeRef: { type: String, default: null },
    result: {
      type: new Schema(
        {
          status: { type: String, enum: ["passed", "failed", "error"], required: true },
          stdout: { type: String, default: "" },
          stderr: { type: String, default: "" },
          timeMs: { type: Number, default: 0, min: 0 },
          memoryMb: { type: Number, default: 0, min: 0 },
          testCaseResults: { type: [Schema.Types.Mixed], default: [] },
          isDeleted: {
            type: Boolean,
            default: false
          },
        },
        { _id: false }
      ),
      default: () => ({}),
    },
  },
  { timestamps: true }
);

codeRunSchema.index({ attemptId: 1 });
codeRunSchema.index({ attemptId: 1, questionId: 1 });
codeRunSchema.index({ questionId: 1 });

const CodeRun = mongoose.model("CodeRun", codeRunSchema);

module.exports = CodeRun;
