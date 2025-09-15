# My Agent – AI Code Review Bot

This project is an **AI-powered code review agent** built with [Bun](https://bun.sh/), [Vercel AI SDK](https://sdk.vercel.ai/), and Google’s Gemini model.  
It scans a target directory for code changes and provides automated reviews and suggestions.

---

## 🚀 Features
- Uses **Google Generative AI (Gemini)** for natural language code reviews.
- Reads **Git changes** from a target directory.
- Streams review feedback directly to the terminal.
- Supports configurable target directories via CLI arguments.

---

## 📂 Project Structure
agents-module4/
└── my-agent/
├── index.ts # Entry point
├── prompt.ts # System prompt configuration
├── tools.ts # File/directory review tools
├── .env # Environment variables (API key)
└── README.md # Project documentation


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

1. **Review the current folder**
bun run index.ts

2. **Review a different folder (e.g. project root)**
bun run index.ts ..

3. **Review a subfolder**
bun run index.ts ./src

**To install dependencies:**

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.22. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
