"use client";

import { useEffect, useId, useRef } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
// (AutoLinkPlugin sengaja tidak dipakai untuk hindari mismatch tipe antar versi)
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  $getRoot,
} from "lexical";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import {
  ListItemNode,
  ListNode,
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
} from "@lexical/list";
import { CodeNode } from "@lexical/code";
import { LinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $generateNodesFromDOM, $generateHtmlFromNodes } from "@lexical/html";
import { $setBlocksType } from "@lexical/selection";

function Placeholder() {
  return (
    <div className="pointer-events-none select-none text-white/40">
      Tulis kontenmu di sini… (Markdown aktif)
    </div>
  );
}

/* ---------- Toolbar ---------- */
function Toolbar({ editor }: { editor: LexicalEditor }) {
  const promptLink = () => {
    const href = prompt("Masukkan URL (bisa internal: /portfolio/slug)");
    if (href === null) return;
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, href || null);
  };

  const setHeading = (tag: "paragraph" | "h1" | "h2" | "h3") => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (tag === "paragraph") {
          const p = $createParagraphNode();
          selection.getNodes().forEach((n) => n.replace(p));
        } else {
          $setBlocksType(selection, () => new HeadingNode(tag));
        }
      }
    });
  };

  return (
    <div className="flex flex-wrap gap-1 rounded-lg border border-white/15 bg-black/30 p-1">
      <button
        type="button"
        className="px-2 py-1 rounded hover:bg-white/10"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
      >
        B
      </button>
      <button
        type="button"
        className="px-2 py-1 rounded hover:bg-white/10"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
      >
        <em>I</em>
      </button>
      <button
        type="button"
        className="px-2 py-1 rounded hover:bg-white/10"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
      >
        Code
      </button>
      <button
        type="button"
        className="px-2 py-1 rounded hover:bg-white/10"
        onClick={promptLink}
      >
        Link
      </button>

      <div className="mx-1 w-px bg-white/15" />

      {["paragraph", "h1", "h2", "h3"].map((tag) => (
        <button
          key={tag}
          type="button"
          className="px-2 py-1 rounded hover:bg-white/10"
          onClick={() => setHeading(tag as any)}
        >
          {tag === "paragraph" ? "P" : tag.toUpperCase()}
        </button>
      ))}

      <div className="mx-1 w-px bg-white/15" />

      <button
        type="button"
        className="px-2 py-1 rounded hover:bg-white/10"
        onClick={() =>
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
        }
      >
        • List
      </button>
      <button
        type="button"
        className="px-2 py-1 rounded hover:bg-white/10"
        onClick={() =>
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
        }
      >
        1. List
      </button>
      <button
        type="button"
        className="px-2 py-1 rounded hover:bg-white/10"
        onClick={() =>
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => new QuoteNode());
            }
          })
        }
      >
        Quote
      </button>
    </div>
  );
}

/* ---------- Main component ---------- */
export default function RichTextEditor({
  name,
  label = "Content",
  initialHTML = "",
  rows = 10,
}: {
  name: string;
  label?: string;
  initialHTML?: string;
  rows?: number;
}) {
  const id = useId();
  const hiddenRef = useRef<HTMLTextAreaElement | null>(null);

  const initialConfig = {
    namespace: "RichTextEditor",
    editable: true,
    onError(error: Error) {
      console.error(error);
    },
    theme: {
      paragraph: "mb-2",
      quote: "border-l-4 border-white/20 pl-3 italic",
      heading: {
        h1: "text-2xl font-bold mt-4 mb-2",
        h2: "text-xl font-semibold mt-4 mb-2",
        h3: "text-lg font-semibold mt-3 mb-2",
      },
      code: "rounded bg-white/10 px-1 py-0.5 font-mono",
      codeHighlight: {}, // harus object
      list: {
        ul: "list-disc ml-6 space-y-1",
        ol: "list-decimal ml-6 space-y-1",
        listitem: "my-0.5",
      },
      link: "underline decoration-dotted underline-offset-4",
    },
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, CodeNode, LinkNode],
  } as const;

  const handleChange = (editorState: any, editor: LexicalEditor) => {
    editorState.read(() => {
      const html = $generateHtmlFromNodes(editor, null);
      if (hiddenRef.current) hiddenRef.current.value = html;
    });
  };

  return (
    <div className="grid gap-2 text-sm">
      <label className="opacity-85">{label}</label>

      <LexicalComposer initialConfig={initialConfig}>
        <EditorShell
          id={id}
          initialHTML={initialHTML}
          hiddenRef={hiddenRef}
          rows={rows}
          onChange={handleChange}
        />
      </LexicalComposer>

      <textarea name={name} ref={hiddenRef} className="hidden" rows={rows} />
      <p className="text-xs opacity-60">
        Catatan: paste gambar belum otomatis disimpan. Unggah via bagian Images.
      </p>
    </div>
  );
}

/* ---------- Shell (harus pakai static import hook context) ---------- */
function EditorShell({
  id,
  initialHTML,
  hiddenRef,
  rows,
  onChange,
}: {
  id: string;
  initialHTML: string;
  hiddenRef: React.RefObject<HTMLTextAreaElement | null>;
  rows: number;
  onChange: (editorState: any, editor: LexicalEditor) => void;
}) {
  const [editor] = useLexicalComposerContext();

  // Seed hidden textarea
  useEffect(() => {
    if (hiddenRef.current) hiddenRef.current.value = initialHTML || "";
  }, [initialHTML, hiddenRef]);

  // Inject initial HTML
  useEffect(() => {
    if (!initialHTML) return;
    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(initialHTML, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);
      const rootNode = $getRoot();
      rootNode.clear();
      nodes.forEach((n: any) => rootNode.append(n));
    });
  }, [editor, initialHTML]);

  // Optional: aktifkan syntax highlight kalau modul & types tersedia
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    (async () => {
      try {
        const mod = await import("@lexical/code");
        if (typeof (mod as any).registerCodeHighlighting === "function") {
          cleanup = (mod as any).registerCodeHighlighting(editor);
        }
      } catch {
        /* noop */
      }
      try {
        await import("prismjs");
      } catch {
        /* noop */
      }
    })();
    return () => {
      if (cleanup) cleanup();
    };
  }, [editor]);

  return (
    <div className="grid gap-2">
      <Toolbar editor={editor} />

      <div className="rounded-lg border border-white/15 bg-black/40">
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              id={id}
              className="min-h-[calc(1.5rem*10)] prose prose-invert max-w-none outline-none px-3 py-2"
              style={{ whiteSpace: "pre-wrap" }}
            />
          }
          placeholder={<Placeholder />}
          ErrorBoundary={() => (
            <div className="p-2 text-red-400 text-xs">
              Terjadi kesalahan pada editor.
            </div>
          )}
        />
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        {/* AutoLinkPlugin & CodeHighlightPlugin ditiadakan untuk kompatibilitas */}
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <AutoFocusPlugin />
        <OnChangePlugin onChange={onChange} />
      </div>
    </div>
  );
}
