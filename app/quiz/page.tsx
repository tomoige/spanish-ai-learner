"use client";

import React, { useState, useEffect } from "react";
import BeatLoader from "react-spinners/BeatLoader";

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
  const [score, setScore] = useState(0);

  useEffect(() => {
    const getQuestions = async () => {
      let res;
      res = await fetch("/api", {
        method: "GET",
      });
      res = await res.json();
      setQuestions(JSON.parse(res[1].content));
    };

    getQuestions();
  }, []);

  const submitWord = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput("");
    let correctAnswer = questions[currentWord].translations.join(", ");

    if (questions[currentWord].translations.includes(input.toLowerCase())) {
      setMessage({
        correct: true,
        message: `Correct! The answer is ${correctAnswer}`,
      });
      setScore((prev) => prev + 1);
    } else {
      setMessage({
        correct: false,
        message: `Incorrect. The correct answer is ${correctAnswer}`,
      });
    }
    setCurrentWord((prev) => prev + 1);
    setShowMessage(true);
  };

  if (questions.length == 0) {
    return (
      <div className="flex flex-auto items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white">
        <div className="flex flex-col items-center">
          <BeatLoader color={"#5b5bff"} />
          <p className="mt-4 text-xl">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (currentWord > questions.length - 1) {
    return (
      <div className="flex flex-col flex-auto items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white">
        <h1 className="text-3xl mb-4">Quiz Finished!</h1>
        <p className="text-xl">
          Your score: {score} / {questions.length}
        </p>
        <button
          onClick={() => {
            setCurrentWord(0);
            setScore(0);
            setShowMessage(false);
            setMessage({ correct: true, message: "correct" });
          }}
          className="mt-6 bg-three hover:bg-three/80 text-white py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-auto items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Translate the word:</h2>
        <form onSubmit={submitWord} className="flex flex-col items-center">
          <span className="text-xl mb-2">{questions[currentWord]?.word}</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="text-black p-2 rounded-md mb-4 w-full"
            placeholder="Type your answer"
          />
          <button
            type="submit"
            className="bg-three hover:bg-three/80 text-white py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105"
          >
            Submit
          </button>
        </form>
        {showMessage && (
          <p
            className={`mt-4 ${
              message.correct ? "text-green-500" : "text-red-500"
            }`}
          >
            {message.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Page;
