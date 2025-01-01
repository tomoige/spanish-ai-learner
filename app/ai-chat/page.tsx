"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import systemPrompts from "../lib/systemPrompts";
import Dictaphone from "@/components/Dictaphone";

interface chat {
  role: string;
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<chat[]>([]);
  const [input, setInput] = useState("");
  const [type, setType] = useState("");

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

  const startChat = async (chatType: string) => {
    setType(chatType);
    let res;
    if (chatType == "Debate") {
      res = await fetch("/api", {
        method: "POST",
        body: JSON.stringify([
          { role: "system", content: systemPrompts[chatType] },
          ...messages,
        ]),
      });
    }
    if (chatType == "Chat") {
      res = await fetch("/api", {
        method: "POST",
        body: JSON.stringify([
          { role: "system", content: systemPrompts[chatType] },
          ...messages,
        ]),
      });
    }
    if (chatType == "Roleplay") {
      res = await fetch("/api", {
        method: "POST",
        body: JSON.stringify([
          { role: "system", content: systemPrompts[chatType] },
          ...messages,
        ]),
      });
    }

    if (res != undefined) {
      const data = await res.json();
      setMessages(data);
      console.log(data);
    }
  };

  if (type.length == 0) {
    return (
      <div className="flex-auto p-8">
        <div className="flex flex-col items-center">
          <span className="text-lg">What would you like to talk about?</span>
          <div className="flex">
            {["Debate", "Chat", "Roleplay"].map((type, i) => {
              return (
                <div
                  key={i}
                  className="border-black bg-blue-50 border-sm w-[100px] hover:cursor-pointer m-4 p-4"
                  onClick={() => startChat(type)}
                >
                  <p className="text-center">{type}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-auto">
      <div className="p-8 m-auto max-h-screen h-screen flex flex-col">
        <div className="flex-auto scrollbar scrollbar-thumb-three scrollbar-track-one  overflow-y-scroll">
          {messages.map((message, i) => {
            if (message.role == "system") {
              return;
            }
            return (
              <div
                key={i}
                className={`m-4 p-4 rounded-md max-w-[50%] ${
                  message.role == "assistant"
                    ? "bg-three text-white"
                    : "bg-four ml-auto"
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
        <div className="flex w-full items-center bg-white rounded-md">
          <form className="flex-auto" onSubmit={(e) => handleSubmit(e)}>
            <input
              className="w-full bg-white rounded-md p-4 focus:outline-none"
              placeholder="Type something"
              type="text"
              onChange={(e) => handleChange(e)}
              value={input}
            />
          </form>
          <div className="relative top-1 right-2">
            <Dictaphone onInput={setInput} />
          </div>
        </div>
      </div>
    </div>
  );
}
