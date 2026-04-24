const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions,
) => `
You are an AI specialized in technical interview preparation.

Context:
- Target Role: ${role}
- Experience Level: ${experience}
- Focus Topics: ${topicsToFocus}

Instructions:
1. Generate exactly ${numberOfQuestions || 10} questions.

2. Output MUST follow STRICT JSON format:

{
  "title": "short descriptive title",
  "explanation": "string (formatted with \\n, supports markdown like headings and lists)",
  "bestPractices": [
    "bullet 1",
    "bullet 2"
  ],
  "code": {
    "language": "javascript | python | null",
    "content": "raw code string WITHOUT backticks"
  }
}

3. Rules:
- DO NOT use Markdown code fences anywhere.
- DO NOT use triple backticks.
- Code must be raw strings only.
- Keep explanation readable (can include simple markdown like bullets).
- If no code is needed, set:
  "code": null

4. Ensure answers scale from basic → advanced based on experience.

5. Output ONLY valid JSON. No extra text.

6. JSON Safety Rules:
- The explanation MUST be structured like this:

"explanation": "## Definition\n...\n\n## How it works\n- step 1\n- step 2\n\n## Why it works\n...\n\n## Example\n...\n\n## Pitfalls\n...\n\n## Real-world usage\n..."

- You MUST use section headings (##)
- You MUST use bullet points (-)
- You MUST use \\n properly
`;

const conceptExplainPrompt = (question) => `
You are an expert technical educator.

Concept:
${question}

Your goal is to explain the concept clearly, deeply, and in a way that is easy to read.

---

1. Output MUST follow STRICT JSON format:

{
  "title": "short descriptive title or null",
  "explanation": "markdown formatted string",
  "bestPractices": [
    "bullet 1",
    "bullet 2"
  ],
  "code": {
    "language": "javascript | python | null",
    "content": "raw code string WITHOUT backticks"
  }
}

---

2. Explanation Guidelines:

The explanation MUST:
- Start with a simple, intuitive definition
- Then expand into deeper explanation
- Include reasoning (why/how it works)
- Include at least one example
- Optionally include a real-world or production example

---

3. Formatting Rules (IMPORTANT):

- The explanation MUST be readable and well-structured
- Use markdown NATURALLY where helpful:
  * headings (##) when useful
  * bullet points (-) for lists
  * paragraphs for explanation
- DO NOT force a fixed template
- DO NOT always use the same sections
- DO NOT return one large paragraph
- Break content using \\n\\n between logical sections
- Prefer smaller chunks over dense text

GOOD examples:
- mix of paragraphs + bullets
- small sections with headings
- step-by-step explanation
- comparison-style explanation

BAD examples:
- one long paragraph
- overly rigid repeated sections

---

4. Code Rules:

- Only include code if it improves understanding
- Keep it minimal
- No backticks
- If not needed, return "code": null

---

5. Best Practices:

- Include real-world advice when relevant
- Include common mistakes or edge cases if applicable
- If none apply, return []

---

6. Title Rules:

- Keep it short (3–8 words)
- If unclear, return null

---

7. Final Rules:

- Output ONLY valid JSON
- Do NOT include markdown code fences
- Ensure JSON.parse works without modification
`;

module.exports = {
  questionAnswerPrompt,
  conceptExplainPrompt,
};
