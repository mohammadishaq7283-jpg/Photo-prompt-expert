import { NextResponse } from 'next/server';

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { messages, image, locale } = await req.json();
    const apiKey = process.env.OPENROUTER_API_KEY;

    // Use GPT-4o for Vision & Chat
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o",
        messages: [
          { role: "system", content: `You are PixelMystic AI. Language: ${locale}. If user wants image, output {"GENERATE_IMAGE": "prompt"}.` },
          ...messages.map((m: any) => ({
            role: m.role,
            content: m.image ? [{type: "text", text: m.content}, {type: "image_url", image_url: {url: m.image}}] : m.content
          }))
        ]
      })
    });

    const data = await response.json();
    let reply = data.choices?.[0]?.message?.content || "";
    let generatedImageUrl = null;

    // Check for Image Gen request
    const genMatch = reply.match(/\{"GENERATE_IMAGE":\s*"(.*?)"\}/);
    if (genMatch) {
      reply = reply.replace(genMatch[0], "").trim();
      const imgRes = await fetch("https://openrouter.ai/api/v1/images/generations", {
        method: "POST",
        headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: "openai/dall-e-3", prompt: genMatch[1] })
      });
      const imgData = await imgRes.json();
      generatedImageUrl = imgData.data?.[0]?.url;
    }

    return NextResponse.json({ reply, generatedImageUrl });
  } catch (e) {
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}
