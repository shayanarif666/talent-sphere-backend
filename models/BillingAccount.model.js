const mongoose = require("mongoose");
const { Schema } = mongoose;

const billingAccountSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, },
    provider: { type: String, enum: ["payoneer", "elevatePay"], default: "payoneer" },
    customerRef: { type: String, default: null },
    status: { type: String, enum: ["active", "past_due", "cancelled"], default: "active", },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

billingAccountSchema.index({ workspaceId: 1, provider: 1, status: 1 }); // MUST
billingAccountSchema.index({ provider: 1 }); // optional if frontend sometimes sends provider alone
billingAccountSchema.index({ status: 1 });   // optional if frontend sometimes sends status alone

const BillingAccount = mongoose.model("BillingAccount", billingAccountSchema);

module.exports = BillingAccount;
