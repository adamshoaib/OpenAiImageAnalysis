import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

export async function sensMSGToOpenAI({
  prompt,
  image,
  model = "gpt-4-vision-preview",
}) {
  const res = await openai.chat.completions.create({
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
          },
          {
            type: "image_url",
            image_url: image,
          },
        ],
      },
    ],
    model: model,
  });
  return res;
}
