
import { CodeExecutionResult, HintLevel, Level } from "../types";

/**
 * Client-side service that proxies requests to our secure Next.js API routes.
 * This keeps the API_KEY safely on the server.
 */

export const judgeCode = async (code: string, level: Level): Promise<CodeExecutionResult> => {
  try {
    const response = await fetch('/api/judge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, level }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Client Judge Error:", error);
    return {
      compiled: false,
      success: false,
      output: "无法连接到判题服务器。",
      feedback: "请检查网络连接并重试。"
    };
  }
};

export const getAIHint = async (code: string, level: Level, hintLevel: HintLevel): Promise<string> => {
  try {
    const response = await fetch('/api/hint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, level, hintLevel }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.hint;
  } catch (error) {
    console.error("Client Hint Error:", error);
    return "AI 导师暂时离线。";
  }
};
