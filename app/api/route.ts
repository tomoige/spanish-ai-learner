import OpenAI from "openai";
import { quizPrompt } from "../lib/systemPrompts";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function GET() {
  // const req = await request.json();
  const messages = [{ role: "user", content: quizPrompt }];

  const model = "deepseek-reasoner";

  // openai request
  const completion = await openai.chat.completions.create({
    model: model,
    messages: messages,
  });

  messages.push(completion.choices[0].message);
  console.log(messages);
  const myResponse = JSON.stringify(messages);

  return new Response(myResponse, { status: 200 });
}

export async function POST(request: Request) {
  const req = await request.json();
  console.log(req);
  const messages = [...req.messages];
  console.log(messages);
  const model = req.reasoning ? "deepseek-reasoner" : "deepseek-chat";

  // openai request
  // const completion = await openai.chat.completions.create({
  //   model: "deepseek-reasoner",
  //   messages: messages,
  // });

  // console.log(completion.choices[0].message.reasoning_content);
  // messages.push(completion.choices[0].message.content);
  // const messages = [
  //   { role: "user", content: "9.11 and 9.8, which is greater?" },
  // ];
  const response = await openai.chat.completions.create({
    model: model,
    messages: messages,
  });

  const reasoning_content = response.choices[0].message;
  const content = {
    role: response.choices[0].message.role,
    content: response.choices[0].message.content,
  };
  console.log(reasoning_content);
  messages.push(content);
  const myResponse = JSON.stringify(messages);

  return new Response(myResponse, { status: 200 });
}
