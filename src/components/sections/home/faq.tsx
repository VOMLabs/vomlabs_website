import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs: {
  question: string;
  answer: string;
}[] = [
  {
    question: "Can I contribute to VOMLabs projects?",
    answer:
      "Absolutely! All of our projects are open source and we welcome contributions of all skill levels. Join our Discord to get started.",
  },
  {
    question: "Can I use VOMLabs tools for commercial projects?",
    answer:
      "Yes, our tools are open source and free to use for both personal and commercial projects under the respective project licenses.",
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
];

export function Faq() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="flex justify-center px-6 py-16 lg:py-24">
      <div className="flex min-w-0 max-w-2xl flex-col items-center gap-6 text-center">
        <h2 className="font-bold text-2xl tracking-tight lg:text-3xl">FAQ.</h2>
        <div className="flex w-full flex-col gap-2 text-left">
          {faqs.map((faq) => {
            const isOpen = open === faq.question;
            return (
              <div className="border border-border bg-muted" key={faq.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between p-4 text-left"
                  onClick={() => setOpen(isOpen ? null : faq.question)}
                >
                  <span className="font-medium text-sm">{faq.question}</span>
                  <ChevronDown
                    className={`size-4 shrink-0 text-muted-foreground transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-[max-height] duration-150 ${isOpen ? "max-h-48" : "max-h-0"}`}
                >
                  <div className="px-4 pb-4">
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <a
          className="text-muted-foreground text-sm underline-offset-4 hover:text-foreground hover:underline"
          href="/faq"
        >
          View all FAQ &rarr;
        </a>
      </div>
    </section>
  );
}
