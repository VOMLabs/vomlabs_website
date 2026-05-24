import fs from "fs";
import path from "path";
import * as yaml from "js-yaml";
import FAQContent from "@/components/faq/faq-content";

export interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQPage() {
  const filePath = path.join(process.cwd(), "src/data/faqs.yaml");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const faqs = yaml.load(fileContents) as FAQItem[];

  return <FAQContent initialFAQs={faqs} />;
}
