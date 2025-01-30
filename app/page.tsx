import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white">
      <div className="w-full max-w-2xl text-center p-8">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to Language Learning
        </h1>
        <p className="text-xl mb-8">
          Enhance your language skills with our AI Chat and Word Quiz features.
          Dive into interactive learning experiences designed to boost your
          proficiency.
        </p>
        <div className="flex justify-center space-x-4 mb-8">
          <Link
            href="/ai-chat"
            className="bg-three hover:bg-three/80 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 border border-white"
          >
            AI Chat
          </Link>
          <Link
            href="/quiz"
            className="bg-four hover:bg-four/80 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Word Quiz
          </Link>
        </div>
        <div className="bg-white text-black p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside">
            <li>Interactive AI-driven conversations</li>
            <li>Challenging quizzes to test your knowledge</li>
            <li>Personalized learning paths</li>
            <li>Community support and resources</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
