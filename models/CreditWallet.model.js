const mongoose = require("mongoose");
const { Schema } = mongoose;

const creditWalletSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true },
    balance: { type: Number, default: 0, min: 0 },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

// Workspace unique wallet lookup
creditWalletSchema.index({ workspaceId: 1 });

const CreditWallet = mongoose.model("CreditWallet", creditWalletSchema);

module.exports = CreditWallet;