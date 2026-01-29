
import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";
import { SYSTEM_INSTRUCTION_JUDGE } from "../../../constants";

export async function POST(req: Request) {
  try {
    const { code, level } = await req.json();
    
    if (!process.env.API_KEY) {
      return NextResponse.json({ error: "API Key not configured on server" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      TASK: ${level.task}
      EXPECTED OUTPUT: ${level.expectedOutput}
      
      USER CODE:
      ${code}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_JUDGE,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            compiled: { type: Type.BOOLEAN },
            success: { type: Type.BOOLEAN },
            output: { type: Type.STRING },
            feedback: { type: Type.STRING },
            variables: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  type: { type: Type.STRING },
                  value: { type: Type.STRING }
                }
              }
            }
          },
          required: ["compiled", "success", "output", "feedback"]
        }
      },
    });

    const result = JSON.parse(response.text || '{}');
    return NextResponse.json(result);

  } catch (error: any) {
    console.error("API Judge Error:", error);
    return NextResponse.json({ 
      compiled: false, 
      success: false, 
      output: "服务器错误", 
      feedback: error.message 
    }, { status: 500 });
  }
}
