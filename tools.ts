import { tool } from "ai";
import { simpleGit } from "simple-git";
import { z } from "zod";
import { writeFileSync } from "fs";
import path from "path";

const excludeFiles = ["dist", "bun.lock"];

/**
 * Schema for directory input
 */
const fileChange = z.object({
  rootDir: z.string().min(1).describe("The root directory"),
});

type FileChange = z.infer<typeof fileChange>;

/**
 * Tool: Get staged file changes in a Git directory
 */
async function getFileChangesInDirectory({ rootDir }: FileChange) {
  const git = simpleGit(rootDir);
  const summary = await git.diffSummary(["--cached"]);
  const diffs: { file: string; diff: string }[] = [];

  for (const file of summary.files) {
    if (excludeFiles.includes(file.file)) continue;
    const diff = await git.diff(["--cached", "--", file.file]);
    diffs.push({ file: file.file, diff });
  }

  return diffs;
}

export const getFileChangesInDirectoryTool = tool({
  description: "Gets the staged code changes made in a given directory",
  inputSchema: fileChange,
  execute: getFileChangesInDirectory,
});

/**
 * Tool: Generate commit message
 */
const commitMessageSchema = z.object({
  message: z.string().min(1).describe("A concise commit message in imperative style"),
});

export const generateCommitMessageTool = tool({
  description: "Generates a commit message for the staged changes",
  inputSchema: commitMessageSchema,
  async execute({ message }) {
    // Just return the suggested commit message (AI provides it)
    return `Suggested commit message:\n\n${message}`;
  },
});

/**
 * Tool: Save AI review as Markdown report
 */
const markdownReportSchema = z.object({
  rootDir: z.string().min(1).describe("The directory to save the report in"),
  content: z.string().min(1).describe("Markdown content of the review"),
});

export const generateMarkdownReportTool = tool({
  description: "Saves the AI review into a Markdown file",
  inputSchema: markdownReportSchema,
  async execute({ rootDir, content }) {
    const reportPath = path.join(rootDir, "AI_CODE_REVIEW.md");
    writeFileSync(reportPath, content, "utf-8");
    return `✅ Markdown report saved at: ${reportPath}`;
  },
});
