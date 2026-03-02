const mongoose = require("mongoose");
const { Schema } = mongoose;

const candidateVerificationSchema = new Schema({
  workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true },
  invitationId: { type: Schema.Types.ObjectId, ref: "Invitation", required: true },
  method: { type: String, enum: ["email_otp", "id_upload", "selfie"], default: "email_otp", required: true },
  status: { type: String, enum: ["pending", "verified", "failed"], default: "pending" },
  otpHash: { type: String, unqiue: true, default: null },
  expiresAt: { type: Date, default: null },
  isDeleted: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });


// TTL: 48 hours = 48*60*60 = 172800 seconds
candidateVerificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 172800 });
candidateVerificationSchema.index({ workspaceId: 1 });
candidateVerificationSchema.index({ invitationId: 1 });
candidateVerificationSchema.index({ status: 1 });

const CandidateVerification = mongoose.model("CandidateVerification", candidateVerificationSchema);

module.exports = CandidateVerification;