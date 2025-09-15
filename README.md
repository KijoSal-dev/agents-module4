# My Agent – AI Code Review Bot

This project is an **AI-powered code review agent** built with [Bun](https://bun.sh/), [Vercel AI SDK](https://sdk.vercel.ai/), and Google’s Gemini model.  
It scans a target directory for Git changes and provides automated reviews, commit messages, and Markdown reports.

---

## 🚀 Features
- Uses Google Generative AI (Gemini) for natural language code reviews.
- Reads Git changes (staged or unstaged) from a target directory.
- Proposes commit messages automatically.
- Saves detailed Markdown reports of reviews.
- Streams review feedback directly to the terminal.
- Supports configurable target directories via CLI arguments.

---

## ⚙️ Setup

1. **Clone the repository** (or copy the project files).

2. **Install dependencies**:
   ```bash
   bun install

3. **Set up environment variables**:
Create a .env file inside my-agent/ with:
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key_here

▶️ Running the Agent

**Move into the project folder**:
cd my-agent

**Running**
bun run index.ts ./ --staged

**To run project:**

```bash
cd my-agent
```

```bash
bun run index.ts ./ --staged
```
**🛠️ Tools**

- getFileChangesInDirectoryTool – Fetches Git diffs

- generateCommitMessageTool – Suggests commit message

- generateMarkdownReportTool – Saves full review in Markdown

This project was created using `bun init` in bun v1.2.22. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
