export interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

export const faqs: FAQItem[] = [
  { question: "What is Vesper?", answer: "Vesper is a minimal, high-performance Minecraft launcher and toolkit for creators and people who like to mess with or customize their game. It gives you full control over your Minecraft setup and removes all unnecessary bloat." },
  { question: "Is Vesper open source?", answer: "Yes! Vesper is open source. You can view the code, contribute, or suggest features on GitHub." },
  { question: "Will Vesper work with modpacks?", answer: "Yes. Vesper is designed to support modded Minecraft — Fabric, Forge, Quilt, and more. Manage your modpacks like real projects, not just folders." },
  { question: "Who is Vesper for?", answer: "Vesper is for players who want control, speed, and transparency — creators, people who like to change things, or anyone who wants to go beyond what other launchers offer." },
  { question: "What platforms does Vesper support?", answer: "During the closed beta, Vesper will only support Windows (10/11, 64-bit). Public beta will add Linux support as well. macOS support is undecided and may come later." },
  { question: "Is my data safe with Vesper?", answer: "Yes. Vesper uses Microsoft OAuth2 for login and never tracks you or sends unnecessary data! Privacy and security are core priorities." },
  { question: "How do I install Vesper?", answer: "You can install Vesper easily using the one-line install script on our homepage! Just copy and paste it into your terminal. Alternatively, you can download a .exe (for Windows) or the right installer for your platform directly from the website." },
  { question: "Can I migrate from other launchers?", answer: "Importing from other launchers is planned. In the meantime, you can manually import your modpacks or instances." },
  { question: "How often does Vesper update?", answer: "Vesper features seamless automatic updates to keep your experience smooth, secure, and up-to-date." },
  { question: "Where can I get support or provide feedback?", answer: "Join our Discord community or open an issue or discussion on GitHub! We are always glad to help or hear your ideas." },
  { question: "Does Vesper support Forge modpacks?", answer: "Yes! Vesper supports Forge, Fabric, Quilt, and NeoForge. You can install modpacks directly from Modrinth or CurseForge, or manually add your own mod folders." },
  { question: "Can I use my existing Minecraft account?", answer: "Yes. Vesper uses Microsoft OAuth2 for authentication, so you can use your existing Microsoft account to log in and play." },
  { question: "Is Vesper free to use?", answer: "Yes, Vesper is completely free to download and use. There are no paid tiers or premium features — everyone gets the full experience." },
  { question: "Does Vesper collect any telemetry?", answer: "No. Vesper does not collect any telemetry or usage data. Your privacy is our priority, and we believe you should have full control over your data." },
  { question: "How do I report a bug or request a feature?", answer: "You can report bugs or request features by opening an issue on our GitHub repository or by joining our Discord community and posting in the feedback channels." },
  { question: "Can I use Vesper for mod development?", answer: "Absolutely! Vesper is great for mod development. You can set up development environments, manage multiple Minecraft instances, and easily switch between versions." },
  { question: "Does Vesper support resource packs?", answer: "Yes. Vesper fully supports resource packs and behavior packs. You can manage them directly from the launcher and easily toggle them on or off." },
  { question: "Can I run multiple instances of Minecraft with Vesper?", answer: "Yes! Veper allows you to create and manage multiple instances, each with its own mods, resource packs, and configuration." },
  { question: "What Java version does Vesper require?", answer: "Vesper requires Java 17 or Java 21. The launcher can automatically download and manage Java installations for you." },
  { question: "Does Vesper work with OptiFine?", answer: "Yes, Vesper works with OptiFine. You can install OptiFine directly through Vesper or add your own OptiFine jar to your instance." },
  { question: "What makes Vesper different from other launchers?", answer: "Vesper is built to be unbloated — no unnecessary features, no telemetry, just a clean and fast experience. While other launchers pile on features that slow things down, we focus on core functionality first. In the future, we'll add a toggle in settings to enable a fancy version with more visual features, but that's something we plan to add long after the initial release." },
  { question: "Can I create my own modpack with Vesper?", answer: "Absolutely! Vesper makes it easy to create and manage your own modpacks. Each modpack instance supports version control — if something breaks after a change, Vesper automatically creates a restore point so you can easily roll back to a previous working state." },
];
