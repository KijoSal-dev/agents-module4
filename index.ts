// 👇 Load environment variables first
import dotenv from "dotenv";
dotenv.config();

import { stepCountIs, streamText } from "ai";
import { google } from "@ai-sdk/google";
import { SYSTEM_PROMPT } from "./prompt.ts";
import {
  getFileChangesInDirectoryTool,
  generateCommitMessageTool,
  generateMarkdownReportTool,
} from "./tools.ts";
import path from "path";

const codeReviewAgent = async (directory: string) => {
  const absDir = path.resolve(directory);

  const result = streamText({
    model: google("models/gemini-2.5-flash"),
    prompt: `
You are reviewing code in: ${absDir}

1. Use the \`getFileChangesInDirectoryTool\` to fetch staged changes.
2. Provide a detailed review (correctness, clarity, maintainability, etc.).
3. Use the \`generateCommitMessageTool\` to propose a commit message.
4. Use the \`generateMarkdownReportTool\` to save the full review into a Markdown file.
`,
    system: SYSTEM_PROMPT,
    tools: {
      getFileChangesInDirectoryTool,
      generateCommitMessageTool,
      generateMarkdownReportTool,
    },
    stopWhen: stepCountIs(10),
  });

  for await (const chunk of result.textStream) {
    process.stdout.write(chunk);
  }
};

// ✅ Allow directory from CLI argument, fallback to current folder
const targetDir = process.argv[2] || "./";
await codeReviewAgent(targetDir);
