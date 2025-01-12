import OpenAI from "openai";
import { quizPrompt } from "../lib/systemPrompts";

const openai = new OpenAI();

export async function GET() {
  // const req = await request.json();
  const messages = [{ role: "system", content: quizPrompt }];

  // openai request
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
  });

  messages.push(completion.choices[0].message);
  const myResponse = JSON.stringify(messages);

  return new Response(myResponse, { status: 200 });
}

export async function POST(request: Request) {
  const req = await request.json();
  const messages = [...req];

  // openai request
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
  });

  messages.push(completion.choices[0].message);
  const myResponse = JSON.stringify(messages);

  return new Response(myResponse, { status: 200 });
}
