"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface GitHubModalProps {
  open: boolean;
  onClose: () => void;
}

interface RepoState {
  loading: boolean;
  progress: number;
}

const repositories = [
  {
    name: "vesper-client",
    description: "The Vesper Minecraft launcher",
    href: "https://github.com/ArexLabs/vesper-client",
  },
  {
    name: "vesper-website",
    description: "This website",
    href: "https://github.com/ArexLabs/vesper-website",
  },
];

const GitHubModal: React.FC<GitHubModalProps> = ({ open, onClose }) => {
  const [repoStates, setRepoStates] = useState<Record<string, RepoState>>({});

  const handleOpenRepo = (repoName: string, href: string) => {
    setRepoStates((prev) => ({
      ...prev,
      [repoName]: { loading: true, progress: 0 },
    }));

    toast.promise(
      new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          setRepoStates((prev) => {
            const current = prev[repoName];
            if (!current || current.progress >= 100) {
              clearInterval(interval);
              return prev;
            }
            return {
              ...prev,
              [repoName]: {
                ...current,
                progress: Math.min(current.progress + Math.random() * 30, 95),
              },
            };
          });
        }, 150);

        window.open(href, "_blank");

        setTimeout(() => {
          clearInterval(interval);
          setRepoStates((prev) => ({
            ...prev,
            [repoName]: { loading: false, progress: 100 },
          }));
          setTimeout(() => {
            setRepoStates((prev) => {
              const { [repoName]: _, ...rest } = prev;
              return rest;
            });
          }, 500);
          resolve();
        }, 800);
      }),
      {
        loading: `Opening ${repoName}...`,
        success: `Opened ${repoName} successfully!`,
        error: `Failed to open ${repoName}`,
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md gap-0 overflow-hidden p-0 sm:max-w-md max-h-[90dvh] flex flex-col">
        <div className="shrink-0 border-b border-border px-4 py-4 sm:px-6 sm:py-5">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold tracking-tight">
              GitHub Repositories
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-3">
            {repositories.map((repo) => {
              const state = repoStates[repo.name];
              const isLoading = state?.loading || false;
              const progress = state?.progress || 0;

              return (
                <button
                  key={repo.name}
                  type="button"
                  onClick={() => handleOpenRepo(repo.name, repo.href)}
                  disabled={isLoading}
                  className={cn(
                    "group relative flex min-w-0 items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left transition-all",
                    "hover:border-border/80 hover:bg-muted/50 hover:shadow-sm",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isLoading && "pointer-events-none"
                  )}
                >
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 rounded-xl bg-card/80 backdrop-blur-sm z-10 flex items-center justify-center"
                    >
                      <div className="flex flex-col items-center gap-2 w-4/5 max-w-[200px]">
                        <span className="text-xs text-muted-foreground font-medium">
                          Opening in GitHub...
                        </span>
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-brand-accent rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-foreground/5 text-foreground dark:bg-foreground/10">
                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.427 2.867 8.184 6.839 9.504.5.093.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.153-1.11-1.46-1.11-1.46-.908-.62.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.349-1.088.635-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.254-.447-1.272.098-2.651 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.6 9.6 0 0 1 2.504.338c1.909-1.296 2.747-1.025 2.747-1.025.547 1.379.203 2.397.1 2.651.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.579.688.481A10.019 10.019 0 0 0 22 12.021C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-foreground wrap-break-word">
                      {repo.name}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {repo.description}
                    </span>
                  </div>
                  <div className="shrink-0">
                    {isLoading ? (
                      <span className="flex size-8 items-center justify-center">
                        <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent text-brand-accent" />
                      </span>
                    ) : (
                      <span className="flex w-14 h-8 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-brand-accent/20 group-hover:text-brand-accent">
                        <IconExternalLink className="size-5" stroke={2} />
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GitHubModal;
