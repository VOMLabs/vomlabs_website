"use client";

import React, { useState, useEffect } from "react";

interface DiscordWidgetProps {
  className?: string;
}

const DiscordWidget: React.FC<DiscordWidgetProps> = ({ className }) => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(mediaQuery.matches ? "dark" : "light");

    const handler = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div className={className}>
      <iframe
        src={`https://discord.com/widget?id=1441770650602831902&theme=${theme}`}
        width="100%"
        height="500"
        frameBorder={0}
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-same-origin allow-popups"
        title="Discord Widget"
        className="rounded-xl"
      />
    </div>
  );
};

export default DiscordWidget;
