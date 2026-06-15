import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

const faqs: {
  question: string;
  answer: string;
}[] = [
  {
    question: "Can I contribute to VOMLabs projects?",
    answer:
      "Absolutely! Most of our projects are open source and we welcome contributions of all skill levels. Join our Discord to get started.",
  },
  {
    question: "Can I use VOMLabs tools for commercial projects?",
    answer:
      "Yes, most of our tools are open source and free to use for both personal and commercial projects under the respective project licenses.",
  },
  {
    question: "Do you collect any telemetry?",
    answer:
      "No. We do not track any of your data. Your privacy is our priority, ensuring a safe and private development experience.",
  },
  {
    question: "How often do you release updates?",
    answer:
      "We release updates regularly, with major versions following semantic versioning. Security patches and bug fixes are shipped as needed.",
  },
  {
    question: "How do I get VOMLabs software?",
    answer:
      "All our software is available on GitHub. You can download releases, build from source, or use our pre-built Docker images.",
  },
  {
    question: "How do I migrate from other tools?",
    answer:
      "We provide migration guides and documentation to help you transition smoothly from other tools to VOMLabs software.",
  },
  {
    question: "What programming languages does VOMLabs use?",
    answer:
      "We primarily use Rust, Java, TypeScript, and Go across our projects, chosen for performance, safety, and developer experience.",
  },
  {
    question: "Are VOMLabs projects free to use?",
    answer:
      "Yes, all of our open-source projects are completely free to use. Some advanced features may be available for enterprise users.",
  },
  {
    question: "How do I report a bug?",
    answer:
      "Report bugs by opening an issue on the relevant GitHub repository. Include detailed steps to reproduce and your environment information.",
  },
  {
    question: "Does VOMLabs have a Discord server?",
    answer:
      "Yes! Join our community Discord at discord.vomlabs.com to chat with developers, get support, and stay updated on new releases.",
  },
  {
    question: "Can I request a new feature?",
    answer:
      "Feature requests are welcome. Open a GitHub discussion or suggestion in our Discord. We review all community feedback regularly.",
  },
  {
    question: "What is the license for VOMLabs projects?",
    answer:
      "Most of our projects are licensed under the MIT or Apache 2.0 license. Check the LICENSE file in each repository for specifics.",
  },
  {
    question: "How do I build VOMLabs projects from source?",
    answer:
      "Clone the repository and follow the build instructions in the README. Each project includes detailed setup steps for development.",
  },
  {
    question: "Does VOMLabs offer paid support?",
    answer:
      "We offer enterprise support plans for organizations that need guaranteed response times and dedicated assistance.",
  },
  {
    question: "What Minecraft versions do your plugins support?",
    answer:
      "Our plugins target the latest Minecraft versions with backward compatibility. Check each project's README for specific version support.",
  },
  {
    question: "How do I install a VOMLabs plugin?",
    answer:
      "Download the JAR from GitHub Releases, place it in your server's plugins folder, and restart. Configuration files are generated on first run.",
  },
  {
    question: "Can I use VOMLabs mods on a vanilla server?",
    answer:
      "Most of our mods require Fabric or NeoForge. Check the mod's documentation for specific loader and version requirements.",
  },
  {
    question: "How do I get started with VOMLabs APIs?",
    answer:
      "Visit docs.vomlabs.com for comprehensive API documentation, including quickstart guides, examples, and reference materials.",
  },
  {
    question: "Do you accept pull requests?",
    answer:
      "Yes, we welcome pull requests! Please read our contributing guidelines and ensure your code follows our style conventions.",
  },
  {
    question: "What is the roadmap for VOMLabs?",
    answer:
      "Our roadmap is publicly available on GitHub. We prioritize features based on community feedback and our long-term vision.",
  },
  {
    question: "How do I join the VOMLabs team?",
    answer:
      "We're always looking for talented developers. Join our Discord to connect with the team and learn about open positions.",
  },
  {
    question: "What hosting providers do your tools support?",
    answer:
      "Our tools work with any hosting provider. We provide Docker images for easy deployment and support popular cloud platforms.",
  },
  {
    question: "How do I configure VOMLabs software?",
    answer:
      "Configuration is done through YAML or TOML files. We provide detailed documentation for every configuration option available.",
  },
  {
    question: "Is there a VOMLabs API client library?",
    answer:
      "Yes, we provide client libraries for TypeScript and Rust. They are available on npm and crates.io respectively.",
  },
  {
    question: "How do I stay updated on VOMLabs news?",
    answer:
      "Follow us on GitHub, join our Discord, and check our blog for announcements about new releases and major updates.",
  },
];

function fuzzyMatch(text: string, query: string): boolean {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) {
    return true;
  }
  let qi = 0;
  for (let ti = 0; ti < lowerText.length && qi < lowerQuery.length; ti++) {
    if (lowerText[ti] === lowerQuery[qi]) {
      qi++;
    }
  }
  return qi === lowerQuery.length;
}

export const Route = createFileRoute("/faq")({ component: FaqPage });

function FaqPage() {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? faqs.filter(
        (faq) =>
          fuzzyMatch(faq.question, query) || fuzzyMatch(faq.answer, query)
      )
    : faqs;

  return (
    <main className="flex flex-col items-center px-6 py-24">
      <div className="flex w-full max-w-2xl flex-col items-center gap-8">
        <div className="space-y-2 text-center">
          <h1 className="font-bold text-3xl tracking-tight lg:text-4xl">
            FAQ.
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Answers to what people usually want to know about VOMLabs.
          </p>
        </div>
        <div className="relative w-full">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className="h-9 w-full border border-border bg-muted pr-3 pl-9 text-sm outline-none placeholder:text-muted-foreground focus:border-ring"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions..."
            type="text"
            value={query}
          />
        </div>
        <div className="flex w-full flex-col gap-2 text-left">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground text-sm">
              No results found for &quot;{query}&quot;
            </p>
          ) : (
            filtered.map((faq) => (
              <div
                className="border border-border bg-muted p-4"
                key={faq.question}
              >
                <p className="mb-1 font-medium text-sm">{faq.question}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
