const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, },
    attemptId: { type: Schema.Types.ObjectId, ref: "Attempt", required: true, },
    testId: { type: Schema.Types.ObjectId, ref: "Test", required: true, },
    candidateId: { type: Schema.Types.ObjectId, ref: "Candidate", required: true, },
    summary: {
      type: new Schema(
        {
          totalScore: { type: Number, required: true },
          rank: { type: Number, default: null, min: 1 },
          strengths: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
          weaknesses: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
        },
        { _id: false }
      ),
      required: true,
    },
    pdfUrl: { type: String, default: null },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

reportSchema.index({ attemptId: 1 }, { unique: true });
reportSchema.index({ workspaceId: 1, testId: 1 });
reportSchema.index({ candidateId: 1 });

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
