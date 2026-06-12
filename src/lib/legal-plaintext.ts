export function downloadPlaintext(filename: string, title: string, sections: { title?: string; text: string }[]) {
  const lines: string[] = [];
  lines.push(title);
  lines.push("=".repeat(title.length));
  lines.push("");
  lines.push(`Last updated: May 2026`);
  lines.push("");

  for (const section of sections) {
    if (section.title) {
      lines.push(section.title);
      lines.push("-".repeat(section.title.length));
    }
    lines.push(section.text);
    lines.push("");
  }

  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
