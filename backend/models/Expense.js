const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    icon: { type: String },
    category: { type: String, required: true }, //like salary, freelance, etc...
    amount: { type: Number, default: null },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

 module.exports = mongoose.model("Expense", ExpenseSchema);
