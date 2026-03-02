const mongoose = require("mongoose");
const { Schema } = mongoose;

const candidateVerificationAttachmentSchema = new Schema({
    candidateVerificationId: { type: Schema.Types.ObjectId, ref: "CandidateVerification", required: true },
    url: { type: String, required: true },
    name: { type: String, default: null },
    type: { type: String, default: null },
    isDeleted: {
      type: Boolean,
      default: false
    },
}, { _id: false });

const CandidateVerificationAttachment = mongoose.model("CandidateVerificationAttachment", candidateVerificationAttachmentSchema);

module.exports = CandidateVerificationAttachment;
