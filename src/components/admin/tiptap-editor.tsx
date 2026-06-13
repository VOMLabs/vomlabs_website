"use client";

import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBold,
  IconCheckbox,
  IconCode,
  IconCodeCircle,
  IconH1,
  IconHeading,
  IconHighlight,
  IconItalic,
  IconList,
  IconListNumbers,
  IconMarkdown,
  IconMinus,
  IconPhoto,
  IconPlayerPlay,
  IconQuote,
  IconStrikethrough,
  IconUnderline,
} from "@tabler/icons-react";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Markdown } from "@tiptap/markdown";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useRef, useState } from "react";

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
    aria-label={label}
    className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[active]:bg-brand-accent/10 data-[active]:text-brand-accent"
    data-active={active || undefined}
    onClick={onClick}
    title={label}
    type="button"
  >
    {children}
  </button>
);

export function TiptapEditor({
  content = "",
  onChange,
  placeholder = "Start writing...",
}: TiptapEditorProps) {
  const [showSource, setShowSource] = useState(false);
  const [sourceText, setSourceText] = useState("");
  const sourceTextRef = useRef("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        codeBlock: { exitOnArrowDown: false },
      }),
      Placeholder.configure({ placeholder }),
      Markdown.configure({}),
      Image.configure({ inline: false }),
      TaskList.configure({}),
      TaskItem.configure({ nested: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: false }),
      Underline.configure({}),
    ],
    content,
    editorProps: {
      attributes: {
        class: "tiptap focus:outline-none min-h-[300px] px-4 py-3",
      },
    },
    onUpdate: ({ editor }) => {
      if (!showSource) {
        onChange?.(editor.getHTML());
      }
    },
  });

  const toggleSource = useCallback(() => {
    if (!editor) {
      return;
    }

    if (showSource) {
      editor.commands.setContent(sourceTextRef.current, {
        contentType: "markdown",
      });
      onChange?.(editor.getHTML());
      setShowSource(false);
    } else {
      const md = editor.storage.markdown.manager.serialize(editor.getJSON());
      sourceTextRef.current = md;
      setSourceText(md);
      setShowSource(true);
    }
  }, [editor, showSource, onChange]);

  const handleSourceChange = useCallback(
    (val: string) => {
      sourceTextRef.current = val;
      setSourceText(val);
      onChange?.(val);
    },
    [onChange]
  );

  const addImage = useCallback(() => {
    if (!editor) {
      return;
    }
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addAudio = useCallback(() => {
    if (!editor) {
      return;
    }
    const url = window.prompt("Enter audio URL:");
    if (url) {
      editor
        .chain()
        .focus()
        .insertContent(`<audio controls src="${url}"></audio>`)
        .run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card/20 backdrop-blur-sm">
      <div className="flex flex-wrap items-center gap-0.5 border-border/40 border-b bg-muted/10 px-2 py-1.5">
        <MenuButton
          active={editor.isActive("heading", { level: 1 })}
          label="Heading 1"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <IconH1 className="size-4" />
        </MenuButton>
        <MenuButton
          active={editor.isActive("heading", { level: 2 })}
          label="Heading 2"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <IconHeading className="size-4" />
        </MenuButton>

        <div className="mx-1 h-5 w-px bg-border/40" />

        <MenuButton
          active={editor.isActive("bold")}
          label="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <IconBold className="size-4" />
        </MenuButton>
        <MenuButton
          active={editor.isActive("italic")}
          label="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <IconItalic className="size-4" />
        </MenuButton>
        <MenuButton
          active={editor.isActive("underline")}
          label="Underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <IconUnderline className="size-4" />
        </MenuButton>
        <MenuButton
          active={editor.isActive("strike")}
          label="Strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <IconStrikethrough className="size-4" />
        </MenuButton>
        <MenuButton
          active={editor.isActive("code")}
          label="Inline code"
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <IconCode className="size-4" />
        </MenuButton>

        <div className="mx-1 h-5 w-px bg-border/40" />

        <MenuButton
          active={editor.isActive("bulletList")}
          label="Bullet list"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <IconList className="size-4" />
        </MenuButton>
        <MenuButton
          active={editor.isActive("orderedList")}
          label="Ordered list"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <IconListNumbers className="size-4" />
        </MenuButton>
        <MenuButton
          active={editor.isActive("taskList")}
          label="Task list"
          onClick={() => editor.chain().focus().toggleTaskList().run()}
        >
          <IconCheckbox className="size-4" />
        </MenuButton>
        <MenuButton
          active={editor.isActive("blockquote")}
          label="Blockquote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <IconQuote className="size-4" />
        </MenuButton>
        <MenuButton
          active={editor.isActive("codeBlock")}
          label="Code block"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <IconCodeCircle className="size-4" />
        </MenuButton>
        <MenuButton
          label="Horizontal rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <IconMinus className="size-4" />
        </MenuButton>

        <div className="mx-1 h-5 w-px bg-border/40" />

        <MenuButton
          active={editor.isActive("link")}
          label="Link"
          onClick={addLink}
        >
          <svg
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </MenuButton>
        <MenuButton label="Image" onClick={addImage}>
          <IconPhoto className="size-4" />
        </MenuButton>
        <MenuButton label="Audio" onClick={addAudio}>
          <IconPlayerPlay className="size-4" />
        </MenuButton>

        <div className="mx-1 h-5 w-px bg-border/40" />

        <MenuButton
          active={editor.isActive({ textAlign: "left" })}
          label="Align left"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <IconAlignLeft className="size-4" />
        </MenuButton>
        <MenuButton
          active={editor.isActive({ textAlign: "center" })}
          label="Align center"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <IconAlignCenter className="size-4" />
        </MenuButton>
        <MenuButton
          active={editor.isActive({ textAlign: "right" })}
          label="Align right"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <IconAlignRight className="size-4" />
        </MenuButton>

        <div className="mx-1 h-5 w-px bg-border/40" />

        <MenuButton
          active={editor.isActive("highlight")}
          label="Highlight"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        >
          <IconHighlight className="size-4" />
        </MenuButton>

        <div className="flex-1" />

        <MenuButton
          active={showSource}
          label={showSource ? "Rich text" : "Markdown source"}
          onClick={toggleSource}
        >
          <IconMarkdown className="size-4" />
        </MenuButton>

        <div className="mx-1 h-5 w-px bg-border/40" />

        <MenuButton
          label="Undo"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <IconArrowBackUp className="size-4" />
        </MenuButton>
        <MenuButton
          label="Redo"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <IconArrowForwardUp className="size-4" />
        </MenuButton>
      </div>

      <div className="bg-background/50">
        {showSource ? (
          <textarea
            className="tiptap min-h-[300px] w-full resize-y bg-transparent px-4 py-3 font-mono text-foreground text-sm focus:outline-none"
            onChange={(e) => handleSourceChange(e.target.value)}
            placeholder={placeholder}
            value={sourceText}
          />
        ) : (
          <EditorContent editor={editor} />
        )}
      </div>
    </div>
  );
}
