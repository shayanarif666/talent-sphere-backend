const mongoose = require("mongoose");
const { Schema } = mongoose;

const SupportMessageSchema = new Schema(
  {
    sender: { type: String, enum: ["user", "support", "system"], required: true },
    text: { type: String, required: true },
    at: { type: Date, default: () => new Date() },
  },
  { _id: false }
);

const supportTicketSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, },
    createdByUserId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    type: { type: String, enum: ["candidate_claim", "billing", "bug"], required: true, },
    status: { type: String, enum: ["open", "in_progress", "resolved"], default: "open", },
    messages: { type: [SupportMessageSchema], default: [] },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

supportTicketSchema.index({ workspaceId: 1, status: 1 });
supportTicketSchema.index({ workspaceId: 1, type: 1 });
supportTicketSchema.index({ createdByUserId: 1 });

const SupportTicket = mongoose.model("SupportTicket", supportTicketSchema);

module.exports = SupportTicket;