"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import systemPrompts from "../lib/systemPrompts";
import Dictaphone from "@/components/Dictaphone";
import BeatLoader from "react-spinners/BeatLoader";

interface chat {
  role: string;
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<chat[]>([]);
  const [input, setInput] = useState("");
  const [lastMessage, setLastMessage] = useState("");
  const [type, setType] = useState("");
  const [sending, setSending] = useState(true);
  const [reasoning, setReasoning] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLastMessage(input);
    setInput("");
    const res = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({
        messages: [...messages, { role: "user", content: input }],
        reasoning: reasoning,
      }),
    });
    const data = await res.json();
    setMessages(data);
    setSending(false);
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
        body: JSON.stringify({
          messages: [
            { role: "user", content: systemPrompts[chatType] },
            ...messages,
          ],
          reasoning: reasoning,
        }),
      });
    }
    if (chatType == "Chat") {
      res = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          messages: [
            { role: "user", content: systemPrompts[chatType] },
            ...messages,
          ],
          reasoning: reasoning,
        }),
      });
    }
    if (chatType == "Roleplay") {
      res = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          messages: [
            { role: "user", content: systemPrompts[chatType] },
            ...messages,
          ],
          reasoning: reasoning,
        }),
      });
    }
    if (chatType == "Translation") {
      res = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          messages: [
            { role: "user", content: systemPrompts[chatType] },
            ...messages,
          ],
          reasoning: reasoning,
        }),
      });
    }

    if (res != undefined) {
      const data = await res.json();
      setMessages(data);
      setSending(false);
      console.log(data);
    }
  };

  useEffect(() => {
    const objDiv = document.getElementById("chat-box");

    if (objDiv != null) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }, [messages, sending]);

  if (type.length == 0) {
    return (
      <div className="flex-auto p-8 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <span className="text-3xl mb-6">
            What would you like to talk about?
          </span>
          <div className="flex space-x-4">
            {["Debate", "Chat", "Roleplay", "Translation"].map((type, i) => {
              return (
                <div
                  key={i}
                  className="bg-three hover:bg-three/80 rounded-lg w-[140px] hover:cursor-pointer text-white p-4 shadow-lg transition-transform transform hover:scale-105"
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
    <div className="flex-auto bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white min-h-screen">
      <div className="p-8 m-auto max-h-screen h-screen flex flex-col">
        <div
          id="chat-box"
          className="flex-auto scrollbar scrollbar-thumb-three scrollbar-track-one overflow-y-scroll"
        >
          {messages.map((message, i) => {
            if (i == 0) {
              return;
            }
            if (message.role == "system") {
              return;
            }
            return (
              <div
                key={i}
                className={`text-white m-4 p-4 rounded-md max-w-[50%] ${
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
          {sending &&
            (sending && lastMessage.length > 0 ? (
              <>
                <div
                  className={`text-white m-4 p-4 rounded-md max-w-[50%] bg-four ml-auto`}
                >
                  <div className="markdown">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {lastMessage}
                    </ReactMarkdown>
                  </div>
                </div>
                <BeatLoader color={"#5b5bff"} />
              </>
            ) : (
              <BeatLoader color={"#5b5bff"} />
            ))}
        </div>

        <div className="flex w-full items-center bg-white rounded-md mt-4">
          <form
            className="flex-auto"
            onSubmit={(e) => {
              setSending(true);
              handleSubmit(e);
            }}
          >
            <input
              className="w-full bg-white text-black rounded-md p-4 focus:outline-none"
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
        <div>
          <button
            className={`${
              reasoning ? "bg-four" : "bg-four/50"
            } p-2 rounded-md mt-2`}
            onClick={() => {
              setReasoning((prev) => !prev);
            }}
          >
            Reasoning
          </button>
        </div>
      </div>
    </div>
  );
}
