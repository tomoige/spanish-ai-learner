import OpenAI from "openai";
const openai = new OpenAI();

export async function POST(request: Request) {
  console.log(process.env.OPENAI_API_KEY);
  const req = await request.json();
  console.log(req);
  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    ...req,
  ];

  console.log(messages);
  // openai request
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
  });

  messages.push(completion.choices[0].message);
  console.log(messages);
  const myResponse = JSON.stringify(messages);

  return new Response(myResponse, { status: 200 });
}
