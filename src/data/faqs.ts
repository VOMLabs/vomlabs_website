export interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

export const faqs: FAQItem[] = [
  { question: "What is VOMLabs?", answer: "VOMLabs is an organization that creates Minecraft software, modern websites, and developer tools. We focus on building high-performance, open-source solutions that prioritize user privacy and experience." },
  { question: "Is VOMLabs software open source?", answer: "Yes! All VOMLabs projects are open source. You can view the code, contribute, or suggest features on our GitHub organization." },
  { question: "What kind of projects does VOMLabs work on?", answer: "We work on a variety of projects including Minecraft-related software, modern web applications, developer tools, and libraries. Our focus is on performance, quality, and user experience." },
  { question: "Who is VOMLabs for?", answer: "VOMLabs is for developers, gamers, and anyone who appreciates well-built software. We create tools for players who want control, speed, and transparency in their gaming and development experience." },
  { question: "What platforms do you support?", answer: "Our projects are designed to be cross-platform. Depending on the specific project, we support Windows, macOS, and Linux. Check individual project documentation for specific platform support." },
  { question: "Is my data safe with VOMLabs?", answer: "Yes. Privacy is a core priority for us. We don't track users or collect unnecessary data. Any authentication is handled through secure protocols like OAuth2, and your credentials are never stored on our servers." },
  { question: "How do I get VOMLabs software?", answer: "You can find all our projects on GitHub. Visit our organization page to browse available repositories, releases, and documentation." },
  { question: "How do I migrate from other tools?", answer: "Migration options depend on the specific project. Check the documentation for each tool for migration guides. In general, our tools use standard formats where possible to make transitions smooth." },
  { question: "How often do you release updates?", answer: "We work continuously on improvements. Each project has its own release schedule, but we strive to provide regular updates and security patches. Many projects feature automatic updates when applicable." },
  { question: "Where can I get support or provide feedback?", answer: "Join our Discord community or open an issue or discussion on GitHub! We are always glad to help or hear your ideas." },
  { question: "Do you support modding and customizations?", answer: "Yes! Many of our projects are designed with extensibility in mind. We believe in giving users control over their experience. Check specific project documentation for customization options." },
  { question: "Can I use my existing accounts?", answer: "Yes. For Minecraft-related tools, we use Microsoft OAuth2 for authentication, so you can use your existing Microsoft account to log in and play." },
  { question: "Is VOMLabs software free to use?", answer: "Yes, VOMLabs creates free and open source software. There are no paid tiers or premium features — everyone gets the full experience." },
  { question: "Do you collect any telemetry?", answer: "No. VOMLabs does not collect any telemetry or usage data from our tools. Your privacy is our priority, and we believe you should have full control over your data." },
  { question: "How do I report a bug or request a feature?", answer: "You can report bugs or request features by opening an issue on the appropriate GitHub repository or by joining our Discord community and posting in the feedback channels." },
  { question: "Can I use VOMLabs tools for development?", answer: "Absolutely! Many of our projects are great for development. You can set up development environments, use our APIs and libraries, and build upon our open source work." },
  { question: "Can I contribute to VOMLabs projects?", answer: "Yes! We welcome contributions from the community. You can contribute code, documentation, translations, or ideas through our GitHub repositories. Join our Discord to discuss how you can help." },
  { question: "What makes VOMLabs different?", answer: "VOMLabs builds software with a focus on performance, privacy, and user freedom. While other projects may add bloat or tracking, we focus on core functionality first. All our work is open source and community-driven." },
  { question: "How can I support VOMLabs?", answer: "The best way to support us is to contribute to our projects, star our repositories on GitHub, and spread the word. Join our community and share your feedback to help us improve." },
];
