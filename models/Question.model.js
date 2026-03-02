const mongoose = require("mongoose");
const { Schema } = mongoose;

const AttachmentSchema = new Schema(
  {
    url: { type: String, required: true },
    name: { type: String, default: null },
    type: { type: String, default: null },
  },
  { _id: false }
);

const OptionSchema = new Schema(
  {
    id: { type: String, required: true },
    text: { type: String, required: true },
  },
  { _id: false }
);

const CodingTestCaseSchema = new Schema(
  {
    input: { type: Schema.Types.Mixed, required: true },
    expected: { type: Schema.Types.Mixed, required: true },
    hidden: { type: Boolean, default: false },
  },
  { _id: false }
);

const CodingSchema = new Schema(
  {
    languageWhitelist: [{ type: String }],
    starterCodeByLang: { type: Schema.Types.Mixed, default: {} }, // { javascript: "...", python: "..." }
    testCases: { type: [CodingTestCaseSchema], default: [] },
    constraints: { type: String, default: "" },
    timeLimitMs: { type: Number, default: 2000, min: 100 },
    memoryMb: { type: Number, default: 256, min: 64 },
  },
  { _id: false }
);

const SqlSchema = new Schema(
  {
    datasetId: { type: Schema.Types.ObjectId, ref: "Dataset", default: null },
    expectedQueryPattern: { type: String, default: null },
    expectedResultHash: { type: String, default: null },
  },
  { _id: false }
);

const FileTaskSchema = new Schema(
  {
    allowedTypes: [{ type: String }],
    maxSizeMb: { type: Number, default: 10, min: 1 },
    rubric: { type: String, default: "" },
  },
  { _id: false }
);

const questionSchema = new Schema(
  {
    ownerType: { type: String, enum: ["system", "company"], required: true, },
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", default: null, },
    skillIds: [{ type: Schema.Types.ObjectId, ref: "Skill", }],
    topicIds: [{ type: Schema.Types.ObjectId, ref: "Topic", }], // new
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium", required: true, },
    type: {
      type: String,
      enum: ["mcq", "truefalse", "short", "coding", "sql", "debug", "scenario", "file", "match", "order", "output", "QA"],
      required: true,
    },
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true },
    timeEstimateSec: { type: Number, default: 60, min: 10 },
    scoreDefault: { type: Number, default: 5, min: 0 },
    tags: { type: [String], default: [] },
    version: { type: Number, default: 1, min: 1 },
    isAIResistant: { type: Boolean, default: false },
    attachments: { type: [AttachmentSchema], default: [] },
    isPremium: { type: Boolean, default: false },

    options: { type: [OptionSchema], default: [] },
    correctOptionIds: { type: [String], default: [] },

    answerGuideline: { type: String, default: "" },
    keywords: { type: [String], default: [] },

    coding: { type: CodingSchema, default: null },
    sql: { type: SqlSchema, default: null },
    file: { type: FileTaskSchema, default: null },

    matchPairs: { type: Schema.Types.Mixed, default: null },
    orderItems: { type: [Schema.Types.Mixed], default: [] },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

// ================== INDEXES ==================

// Owner + workspace separation
questionSchema.index({ ownerType: 1, workspaceId: 1 });

// Main filtering (assessment builder)
questionSchema.index({ workspaceId: 1, type: 1, difficulty: 1 });

// System questions filtering
questionSchema.index({ ownerType: 1, type: 1, difficulty: 1 });

// Skill / topic based
questionSchema.index({ skillIds: 1 });
questionSchema.index({ topicIds: 1 });

// Tags
questionSchema.index({ tags: 1 });

// Text search
questionSchema.index({
  title: "text",
  body: "text",
  tags: "text"
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
