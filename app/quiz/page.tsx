"use client";

import React, { useState, useEffect } from "react";

interface QuestionType {
  word: string;
  translations: string[];
  type: string;
}

function Page() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentWord, setCurrentWord] = useState(0);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState({ correct: true, message: "correct" });
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const getQuestions = async () => {
      let res;
      res = await fetch("/api", {
        method: "GET",
      });
      res = await res.json();
      console.log(JSON.parse(res[1].content));
      setQuestions(JSON.parse(res[1].content));
      console.log("hello");
    };

    getQuestions();
  }, []);

  const submitWord = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput("");
    let correctAnswer = "";
    questions[currentWord].translations.forEach((translation, i) => {
      if (i == questions[currentWord].translations.length - 1) {
        correctAnswer = correctAnswer + translation;
      } else {
        correctAnswer = correctAnswer + translation + ", ";
      }
    });

    if (questions[currentWord].translations.includes(input.toLowerCase())) {
      setMessage({
        correct: true,
        message: `Correct \n The answer is ${correctAnswer}`,
      });
    } else {
      setMessage({
        correct: false,
        message: `Incorrect \n The answer is ${correctAnswer}`,
      });
    }
    setCurrentWord((prev) => prev + 1);
    setShowMessage(true);
  };

  if (questions.length == 0) {
    return "Loading";
  }

  if (currentWord > questions.length - 1) {
    return "Finished";
  }

  return (
    <div>
      <div className="flex justify-between items-center text-white gap-4 mb-2">
        <form
          onSubmit={(e) => submitWord(e)}
          className="flex flex-col items-center"
        >
          <span>{questions[currentWord]?.word}</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="text-black p-2 rounded-md"
          />
        </form>
      </div>
      {showMessage && <p className="text-white">{message.message}</p>}
    </div>
  );
}

export default Page;
