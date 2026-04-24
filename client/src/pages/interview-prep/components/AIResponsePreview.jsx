import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { LuCode, LuCopy, LuCheck } from "react-icons/lu";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function AIResponsePreview({ answer }) {
  if (!answer) return null;

  const { code, explanation, bestPractices } = answer;
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Explanation */}
      {explanation && (
        <div>
          {/* <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase">
            Explanation
          </h3> */}

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ ...props }) => (
                <h1 className="text-lg font-semibold mt-4 mb-2" {...props} />
              ),
              h2: ({ ...props }) => (
                <h2 className="text-base font-semibold mt-3 mb-2" {...props} />
              ),
              h3: ({ ...props }) => (
                <h3 className="text-sm font-semibold mt-2 mb-1" {...props} />
              ),
              p: ({ ...props }) => (
                <p
                  className="mb-2 text-[14px] leading-relaxed text-gray-800"
                  {...props}
                />
              ),
              ul: ({ ...props }) => (
                <ul className="mb-2 ml-4 list-disc" {...props} />
              ),
              li: ({ ...props }) => (
                <li className="mb-1 text-[14px] text-gray-800" {...props} />
              ),
            }}
          >
            {explanation}
          </ReactMarkdown>
        </div>
      )}

      {code && (
        <div>
          {/* <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase">
            Code
          </h3> */}
          <CodeBlock code={code.content} language={code.language} />
        </div>
      )}

      {/* Best Practices */}
      {bestPractices && bestPractices.length > 0 && (
        <div>
          {/* <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase">
            Best Practices
          </h3> */}
          <ul className="space-y-2">
            {bestPractices.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-gray-800 text-[14px]"
              >
                <span>- {item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="my-6 rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2 text-gray-600">
          <LuCode size={16} />
          <span className="text-xs font-semibold lowercase">
            {language || "code"}
          </span>
        </div>

        <button
          onClick={copyCode}
          className="p-1 rounded hover:bg-gray-200 transition"
          aria-label="copy-code"
        >
          {copied ? (
            <LuCheck size={16} className="text-green-500" />
          ) : (
            <LuCopy size={16} />
          )}
        </button>
      </div>

      <SyntaxHighlighter
        language={language || "text"}
        style={oneLight}
        PreTag="div"
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "transparent",
          fontSize: "13px",
          lineHeight: "1.6",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
