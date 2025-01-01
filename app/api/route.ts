import OpenAI from "openai";
import fs from "fs";
import path from "path";
const openai = new OpenAI();

export async function POST(request: Request) {
  console.log(process.env.OPENAI_API_KEY);
  const req = await request.json();
  console.log(req);
  const messages = [...req];

  console.log(messages);
  // openai request
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
  });

  messages.push(completion.choices[0].message);
  console.log(messages);
  const myResponse = JSON.stringify(messages);

  // const speechFile = path.resolve("./speech.mp3");

  // const mp3 = await openai.audio.speech.create({
  //   model: "tts-1",
  //   voice: "alloy",
  //   input:
  //     completion.choices[0].message.content == null
  //       ? ""
  //       : completion.choices[0].message.content,
  // });

  // const buffer = Buffer.from(await mp3.arrayBuffer());
  // await fs.promises.writeFile(speechFile, buffer);

  return new Response(myResponse, { status: 200 });
}
