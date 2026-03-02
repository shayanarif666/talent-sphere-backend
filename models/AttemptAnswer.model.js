const mongoose = require("mongoose");
const { Schema } = mongoose;

const attemptAnswerSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, },
    attemptId: { type: Schema.Types.ObjectId, ref: "Attempt", required: true, },
    questionId: { type: Schema.Types.ObjectId, ref: "Question", required: true, },
    sectionId: { type: Schema.Types.ObjectId, ref: "TestSection", default: null, },

    answerType: {
      type: String,
      enum: ["mcq", "truefalse", "short", "coding", "sql", "debug", "scenario", "file", "match", "order"],
      required: true,
    },

    answer: { type: Schema.Types.Mixed, default: {} },

    score: {
      type: new Schema(
        {
          earned: { type: Number, default: null },
          max: { type: Number, default: null },
          autoGraded: { type: Boolean, default: true },
          feedback: { type: String, default: "" },
        },
        { _id: false }
      ),
      default: () => ({}),
    },

    timestamps: {
      type: new Schema(
        {
          firstAnsweredAt: { type: Date, default: null },
          lastSavedAt: { type: Date, default: null },
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

attemptAnswerSchema.index({ workspaceId: 1, attemptId: 1 });
attemptAnswerSchema.index({ attemptId: 1, questionId: 1 }, { unique: true });
attemptAnswerSchema.index({ sectionId: 1 });
attemptAnswerSchema.index(
  { attemptId: 1 },
  { partialFilterExpression: { sectionId: null } }
);

const AttemptAnswer = mongoose.model("AttemptAnswer", attemptAnswerSchema);

module.exports = AttemptAnswer;
