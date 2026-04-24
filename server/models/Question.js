const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    session: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },
    question: String,
    answer: {
      explanation: String,
      bestPractices: [String],
      code: {
        language: String,
        content: String,
      },
    },
    note: String,
    isPinned: { type: Boolean, deafult: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Question", questionSchema);
