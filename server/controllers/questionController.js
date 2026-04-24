const Question = require("../models/Question");
const Session = require("../models/Session");

// @desc   Add question to a session
// @route  POST /api/questions/add
// access  Private
const addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;
    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        // question: JSON.stringify(q.answer),
        answer: q.answer,
      })),
    );

    session.questions.push(...createdQuestions.map((q) => q._id));
    await session.save();

    res.status(201).json({
      success: true,
      createdQuestions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc   Toggle pin/unpin a question
// @route  POST /api/questions/:id/pin
// access  Private
const togglePinQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await Question.findById(questionId);
    if (!question) {
      res.status(404).json({ message: "Question not found" });
    }
    question.isPinned = !question.isPinned;
    await question.save();
    res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc   Update note for a question
// @route  POST /api/questions/:id/note
// access  Private
const updateQuestionNote = async (req, res) => {
  try {
    const questionId = req.params.id;
    const { note } = req.body;
    const question = await Question.findById(questionId);
    if (!question) {
      res.status(404).json({ message: "Question not found" });
    }
    question.note = note || "";
    await question.save();
    res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error in updateQuestionNote",
    });
  }
};

module.exports = {
  addQuestionsToSession,
  togglePinQuestion,
  updateQuestionNote,
};
