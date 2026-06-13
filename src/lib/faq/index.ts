import fs from "fs";
import path from "path";

export interface FAQItem {
  answer: string;
  question: string;
}

const FAQ_DIR = path.join(process.cwd(), "src/lib/faq");

function parseFrontmatter(raw: string): { question: string; answer: string } {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) {
    return { question: "", answer: raw };
  }

  const frontmatterRaw = match[1];
  const answer = match[2].trim();
  let question = "";

  for (const line of frontmatterRaw.split("\n")) {
    const sepIndex = line.indexOf(":");
    if (sepIndex !== -1) {
      const key = line.slice(0, sepIndex).trim();
      if (key === "question") {
        let value = line.slice(sepIndex + 1).trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        question = value;
      }
    }
  }

  return { question, answer };
}

export function getAllFAQs(): FAQItem[] {
  const files = fs
    .readdirSync(FAQ_DIR)
    .filter((f) => f.endsWith(".mdx") && f !== "index.ts");

  const faqs: FAQItem[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(FAQ_DIR, file), "utf-8");
    const { question, answer } = parseFrontmatter(raw);
    if (question) {
      faqs.push({ question, answer });
    }
  }

  return faqs;
}
