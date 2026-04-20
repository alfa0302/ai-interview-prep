const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions,
) => `
You are an AI trained to generate high-quality technical interview questions and answers.

Context:
- Target Role: ${role}
- Experience Level: ${experience}
- Focus Topics: ${topicsToFocus}

Instructions:
1. Generate exactly ${numberOfQuestions} technical interview questions.
2. Each question must be relevant to the given role and experience level.
3. Focus strictly on the provided topics.
4. Questions should vary in difficulty (easy → medium → hard).
5. Avoid repetition or vague questions.
6. Each answer must be clear, concise, and technically accurate.
7. Prefer practical, real-world oriented explanations where applicable.

Output Format (STRICT JSON, no extra text):
[
  {
    "question": "string",
    "answer": "string"
  }
]

Rules:
- Do not include explanations outside the JSON.
- Do not include numbering outside the JSON structure.
- Ensure valid JSON (no trailing commas, proper quotes).
- Keep answers reasonably detailed but not overly long.
`;

const conceptExplainPrompt = (question) => `
You are an expert technical educator.

Your task is to explain the given concept clearly and concisely.

Concept:
${question}

Instructions:
1. Understand the concept and explain it in simple but accurate terms.
2. Do NOT include extra sections, headings, or formatting.
3. Keep the explanation structured internally but return only JSON.
4. Avoid unnecessary jargon. If technical terms are used, they must be naturally explained within the text.
5. Keep the explanation useful for both beginners and intermediate learners.
6. If applicable, include a small example inside the explanation.

Output MUST be valid JSON in exactly this format:

{
  "title": "short, clear name of the concept",
  "explanation": "detailed explanation of the concept in 2–6 short paragraphs"
}

Rules:
- Do not include markdown, backticks, or extra text.
- Do not wrap response in code blocks.
- Ensure valid JSON only.
`;

module.exports = {
  questionAnswerPrompt,
  conceptExplainPrompt,
};
