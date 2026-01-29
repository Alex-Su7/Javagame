
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { SYSTEM_INSTRUCTION_HINT } from "../../../constants";

export async function POST(req: Request) {
  try {
    const { code, level, hintLevel } = await req.json();

    if (!process.env.API_KEY) {
      return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    let hintRequestType = "";
    switch (hintLevel) {
      case 1: hintRequestType = "Explain the concept without giving code (In Chinese)."; break;
      case 2: hintRequestType = "Point out which line or part is wrong (In Chinese)."; break;
      case 3: hintRequestType = "Show a similar code pattern or the missing keyword (In Chinese)."; break;
      default: return NextResponse.json({ error: "Invalid hint level" }, { status: 400 });
    }

    const prompt = `
      LEVEL: ${level.title}
      TASK: ${level.task}
      USER CODE: ${code}
      HINT REQUEST: ${hintRequestType}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_HINT,
      },
    });

    return NextResponse.json({ hint: response.text || "无法生成提示。" });

  } catch (error: any) {
    console.error("API Hint Error:", error);
    return NextResponse.json({ hint: "AI 导师暂时无法回应。" }, { status: 500 });
  }
}
