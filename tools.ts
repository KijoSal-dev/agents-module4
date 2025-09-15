import { tool } from "ai";
import { simpleGit } from "simple-git";
import { z } from "zod";
import { writeFileSync } from "fs";
import path from "path";

const excludeFiles = ["dist", "bun.lock"];

/**
 * Schema for directory input (with mode)
 */
const fileChange = z.object({
  rootDir: z.string().min(1).describe("The root directory"),
  mode: z
    .enum(["staged", "unstaged"])
    .default("staged")
    .describe("Whether to get 'staged' or 'unstaged' changes"),
});

type FileChange = z.infer<typeof fileChange>;

/**
 * Tool: Get file changes in a Git directory
 */
async function getFileChangesInDirectory({ rootDir, mode }: FileChange) {
  const git = simpleGit(rootDir);

  // Decide whether to look at staged or unstaged changes
  const args = mode === "staged" ? ["--cached"] : [];
  const summary = await git.diffSummary(args);

  const diffs: { file: string; diff: string }[] = [];

  for (const file of summary.files) {
    if (excludeFiles.includes(file.file)) continue;

    const diff = await git.diff([...args, "--", file.file]);
    diffs.push({ file: file.file, diff });
  }

  return diffs.length > 0
    ? diffs
    : [`ℹ️ No ${mode} changes found in ${rootDir}`];
}

export const getFileChangesInDirectoryTool = tool({
  description: "Gets the code changes in a given directory (staged or unstaged)",
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
  description: "Generates a commit message for the staged or unstaged changes",
  inputSchema: commitMessageSchema,
  async execute({ message }) {
    return `💡 Suggested commit message:\n\n${message}`;
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
