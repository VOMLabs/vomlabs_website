"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Markdown } from "@tiptap/markdown";
import {
  IconBold,
  IconItalic,
  IconStrikethrough,
  IconCode,
  IconList,
  IconListNumbers,
  IconQuote,
  IconHeading,
  IconMinus,
  IconArrowBackUp,
  IconArrowForwardUp,
} from "@tabler/icons-react";

interface TiptapEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
}

const MenuButton = ({
  onClick,
  active,
  children,
  label,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  label: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    data-active={active || undefined}
    aria-label={label}
    className="flex items-center justify-center size-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors data-[active]:bg-brand-accent/10 data-[active]:text-brand-accent"
  >
    {children}
  </button>
);

export function TiptapEditor({ content = "", onChange, placeholder = "Start writing..." }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Placeholder.configure({ placeholder }),
      Markdown.configure({}),
    ],
    content,
    editorProps: {
      attributes: {
        class: "tiptap focus:outline-none min-h-[300px] px-4 py-3",
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="rounded-xl border border-border/60 bg-card/20 backdrop-blur-sm overflow-hidden">
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-border/40 bg-muted/10">
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          label="Heading 2"
        >
          <IconHeading className="size-4" />
        </MenuButton>

        <div className="w-px h-5 bg-border/40 mx-1" />

        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          label="Bold"
        >
          <IconBold className="size-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          label="Italic"
        >
          <IconItalic className="size-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          label="Strikethrough"
        >
          <IconStrikethrough className="size-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive("code")}
          label="Code"
        >
          <IconCode className="size-4" />
        </MenuButton>

        <div className="w-px h-5 bg-border/40 mx-1" />

        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          label="Bullet list"
        >
          <IconList className="size-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          label="Ordered list"
        >
          <IconListNumbers className="size-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          label="Blockquote"
        >
          <IconQuote className="size-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          label="Horizontal rule"
        >
          <IconMinus className="size-4" />
        </MenuButton>

        <div className="w-px h-5 bg-border/40 mx-1" />

        <MenuButton onClick={addLink} active={editor.isActive("link")} label="Link">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </MenuButton>

        <div className="flex-1" />

        <MenuButton
          onClick={() => editor.chain().focus().undo().run()}
          label="Undo"
        >
          <IconArrowBackUp className="size-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().redo().run()}
          label="Redo"
        >
          <IconArrowForwardUp className="size-4" />
        </MenuButton>
      </div>

      <div className="bg-background/50">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
