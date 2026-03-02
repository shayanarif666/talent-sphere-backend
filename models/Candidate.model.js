const mongoose = require("mongoose");
const { Schema } = mongoose;

const candidateSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true, lowercase: true },
    phone: { type: String, default: null },
    type: { type: String, enum: ["AI", "Manual"], default: "Manual", required: true },
    meta: {
      type: new Schema(
        {
          source: { type: String, default: null },
          notes: { type: String, default: "" },
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


candidateSchema.index({ workspaceId: 1, type: 1 });
candidateSchema.index({ type: 1 });
candidateSchema.index({ name: 1 });

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;