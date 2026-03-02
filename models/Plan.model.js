const mongoose = require("mongoose");
const { Schema } = mongoose;

const planSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    pricingPerCandidate: { type: Number, required: true, min: 0, default: 0 },
    discount: { type: Number, default: 0 },
    discountType: { type: String, enum: ["percentage", "flat"], default: "percentage" },
    candidateCount: { type: Number, default: 1, min: 1 },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

// VIRTUAL FIELDS SOLVE 3NF PRIBLEM FOR TOTAL PRICE AND PRICE AFTER DISCOUNT

// Virtual: totalPrice
planSchema.virtual("totalPrice").get(function () {
  if (!this.pricingPerCandidate || !this.candidateCount) return 0;
  return this.pricingPerCandidate * this.candidateCount;
});

// Virtual: priceAfterDiscount
planSchema.virtual("priceAfterDiscount").get(function () {
  const total = this.totalPrice || 0;

  if (this.discountType === "percentage") {
    return total * (1 - this.discount / 100);
  } else if (this.discountType === "flat") {
    return total - this.discount;
  }

  return total;
});

// Ensure virtual fields are included in JSON / Object
planSchema.set("toJSON", { virtuals: true });
planSchema.set("toObject", { virtuals: true });

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;