const mongoose = require("mongoose");
const { Schema } = mongoose;

const invoiceSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, },
    planId: { type: Schema.Types.ObjectId, ref: "Plan", required: true, },
    billingAccountId: { type: Schema.Types.ObjectId, ref: "BillingAccount", required: true, },
    providerInvoiceId: { type: String, default: null, },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "usd" },
    status: { type: String, enum: ["draft", "open", "paid", "void", "uncollectible"], default: "paid", },
    pdfUrl: { type: String, default: null },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

invoiceSchema.index({ workspaceId: 1, status: 1 });
invoiceSchema.index({ billingAccountId: 1 });

// Plan-wise lookup
// InvoiceSchema.index({ planId: 1 });

// For recent invoices across workspace (admin dashboards)
// InvoiceSchema.index({ createdAt: -1 });

// Provider invoice ID lookup
// InvoiceSchema.index({ providerInvoiceId: 1 });

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;