// 👇 Load environment variables first
import dotenv from "dotenv";
import path from "path";

// Force load .env from the right place
dotenv.config({ path: path.resolve(__dirname, ".env") });

console.log("Loaded key?", process.env.GOOGLE_GENERATIVE_AI_API_KEY ? "✅ yes" : "❌ no");



import { stepCountIs, streamText } from "ai";
import { google } from "@ai-sdk/google";
import { SYSTEM_PROMPT } from "./prompt.ts";
import { getFileChangesInDirectoryTool } from "./tools.ts";

const codeReviewAgent = async (prompt: string) => {
  const result = streamText({
    model: google("models/gemini-2.5-flash"),
    prompt,
    system: SYSTEM_PROMPT,
    tools: {
      getFileChangesInDirectoryTool: getFileChangesInDirectoryTool,
    },
    stopWhen: stepCountIs(10),
  });

  for await (const chunk of result.textStream) {
    process.stdout.write(chunk);
  }
};

// Specify which directory the code review agent should review changes in your prompt
await codeReviewAgent(
  "Review the code changes in './' directory, make your reviews and suggestions file by file",
);