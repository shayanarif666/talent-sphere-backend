const mongoose = require("mongoose");
const { Schema } = mongoose;

const creditTransactionSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, },
    planId: { type: Schema.Types.ObjectId, ref: "Plan", required: true, },
    billingAccountId: { type: Schema.Types.ObjectId, ref: "BillingAccount", required: true, },
    type: { type: String, enum: ["purchase", "invite_spent", "refund", "adjustment"], required: true, },
    amount: { type: Number, required: true, min: 0, default: 0 },
    ref: {
      type: new Schema(
        {
          entityType: { type: String, required: true },
          entityId: { type: Schema.Types.ObjectId, required: true },
        },
        { _id: false }
      ),
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// 1. Transaction History: "Meri pichli credit transactions dikhao"
creditTransactionSchema.index({ workspaceId: 1, createdAt: -1 });

// 2. Audit/Ref: Check karne ke liye ke kisi specific event (Invite/Refund) ka credit cut gaya hai?
creditTransactionSchema.index({ "ref.entityId": 1 });

const CreditTransaction = mongoose.model("CreditTransaction", creditTransactionSchema);

module.exports = CreditTransaction;