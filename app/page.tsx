"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// const markdownContent = `
// # My Markdown Guide
// ## Table of Contents
// 1. [Introduction](#introduction)
// 2. [Basic Syntax](#basic-syntax)
// 3. [Lists](#lists)
// 4. [Links and Images](#links-and-images)
// 5. [Code Blocks](#code-blocks)
// 6. [Conclusion](#conclusion)

// ## Introduction
// Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.

// ## Basic Syntax
// Markdown uses plain text formatting syntax. Here are some basic elements:
// - **Bold Text:** \`**This is bold text**\`
// - *Italic Text:* \`*This is italic text*\`
// - ~~Strikethrough~~: \`~~This text is crossed out~~\`

// ## Lists
// You can create ordered and unordered lists in Markdown.

// ### Unordered List
// - Item 1
// - Item 2
//   - Subitem 2.1
//   - Subitem 2.2
// - Item 3

// ### Ordered List
// 1. First item
// 2. Second item
// 3. Third item

// ## Links and Images
// You can add links and images easily:
// - [Visit OpenAI](https://www.openai.com)
// - ![Markdown logo](https://markdown-here.com/img/icon256.png)

// ## Code Blocks
// For code formatting, you can use backticks for inline code and triple backticks for code blocks.

// ### Inline Code
// Here is some \`inline code\`.

// ### Code Block
// \`\`\`
// def hello_world():
//     print("Hello, World!")
// \`\`\`

// ## Conclusion
// Markdown is a simple way to format text that can be converted to HTML.
// `;

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput("");
    const res = await fetch("/api", {
      method: "POST",
      body: JSON.stringify([...messages, { role: "user", content: input }]),
    });
    const data = await res.json();
    setMessages(data);
    console.log(data);
  };

  const handleChange = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newInput = e.currentTarget.value;
    setInput(newInput);
  };

  return (
    <div>
      <div className="max-w-[800px] m-auto max-h-screen h-screen flex flex-col">
        <div className="flex-auto overflow-y-scroll">
          {messages.map((message, i) => {
            if (message.role == "system") {
              return;
            }
            return (
              <div
                key={i}
                className={`m-4 p-4 rounded-md max-w-[400px] ${
                  message.role == "assistant"
                    ? "bg-blue-400"
                    : "bg-green-400 ml-auto"
                }`}
              >
                <div className="markdown">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            );
          })}
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className="w-full bg-gray-200 p-4 focus:outline-none"
            placeholder="Type something"
            type="text"
            onChange={(e) => handleChange(e)}
            value={input}
          />
        </form>
      </div>
    </div>
  );
}
