"use client";

import { useEffect, useRef, useState } from "react";
import {
  EditorContent,
  EditorContext,
  JSONContent,
  useEditor,
} from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Selection } from "@tiptap/extensions";

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button";
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@/components/tiptap-ui/color-highlight-popover";
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/components/tiptap-ui/link-popover";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/tiptap-icons/link-icon";

// --- Hooks ---
import { useIsBreakpoint } from "@/hooks/use-is-breakpoint";
import { useWindowSize } from "@/hooks/use-window-size";
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";

// --- Components ---
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle";

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";

import { saveEssay } from "@/app/admin/editor/actions";
import { loadEssay } from "@/app/admin/editor/actions";
import { checkForUniqueTitle } from "@/app/admin/editor/actions";

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
}) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={isMobile} />
        <ListDropdownMenu
          types={["bulletList", "orderedList", "taskList"]}
          portal={isMobile}
        />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}

      <ToolbarGroup>
        <ThemeToggle />
      </ToolbarGroup>
    </>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link";
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup>
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);

export function SimpleEditor({
  onSendBlocker,
}: {
  onSendBlocker: (isTitleUnique: boolean) => void;
}) {
  const isMobile = useIsBreakpoint();
  const { height } = useWindowSize();
  const [mobileView, setMobileView] = useState<"main" | "highlighter" | "link">(
    "main",
  );
  const toolbarRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState("");
  const [essayId, setEssayId] = useState<string | null>("");
  const [status, setStatus] = useState("Pending...");
  const [content, setContent] = useState<JSONContent | string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const idFromUrl = params.get("id");

    if (idFromUrl) {
      loadEssay(idFromUrl).then((data) => {
        setTitle(data.title as string);
        setContent(data.content as JSONContent);
        setEssayId(idFromUrl);
      });
    }
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      const jsonContent = editor.getJSON();
      setContent(jsonContent);
    }
  });

  useEffect(() => {
    if (!editor) return;
    editor.commands.setContent(content);
  }, [content, editor]);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!title) {
        onSendBlocker(true);
        setStatus("Title is empty");
        return;
      }
      try {
        const res = await checkForUniqueTitle(title, essayId);
        if (!active) return;
        onSendBlocker(res.isUnique);
      } catch (e) {
        setStatus("Title check failed")
        onSendBlocker(true);
      }
    })();
    return () => {
      active = false;
    };
  }, [title, essayId, onSendBlocker]);

  useEffect(() => {
    if (!editor) return;
    const autosave = setTimeout(async () => {
      setStatus("saving...");
      try {
        const contentJson = JSON.parse(JSON.stringify(editor.getJSON()));
        const saved = await saveEssay(essayId, title, contentJson);
        if (saved.success && saved.id) {
          setEssayId(saved.id);
          setStatus("Saved to " + new Date().toLocaleTimeString());
        } else {
          setStatus("Save error: " + saved.error);
        }
      } catch (e) {
        console.log("Autosave error:", e);
      }
    }, 2000);
    return () => clearTimeout(autosave);
  }, [title, editor, editor?.state.doc, essayId]);

  // useEffect(() => {
  //   if (!editor || !title) return;

  //   const handler = setTimeout(async () => {
  //     setStatus("Saving...");
  //     try {
  //       const titleIsUniqueCheck = await checkForUniqueTitle(title);
  //       if (!titleIsUniqueCheck.isUnique && ) {
  //         setStatus(titleIsUniqueCheck?.message);
  //         onSendBlocker(titleIsUniqueCheck.isUnique);
  //       } else {
  //         const contentJson = JSON.parse(JSON.stringify(editor.getJSON()));
  //         const saved = await saveEssay(essayId, title, contentJson);
  //         if (saved.success && saved.id) {
  //           setEssayId(saved.id);
  //           setStatus("Saved to " + new Date().toLocaleTimeString());
  //           onSendBlocker(titleIsUniqueCheck.isUnique);
  //         } else {
  //           setStatus("Save error: " + saved.error);
  //         }
  //       }
  //     } catch (e) {
  //       setStatus(`Save error: ${e}`);
  //     }
  //   }, 2000); // 2 секунды задержки

  //   return () => clearTimeout(handler);
  // }, [title, editor, editor?.state.doc, essayId, onSendBlocker]);

  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  return (
    <div className="simple-editor-wrapper">
      <EditorContext.Provider value={{ editor }}>
        <Toolbar
          ref={toolbarRef}
          style={{
            ...(isMobile
              ? {
                  bottom: `calc(100% - ${height - rect.y}px)`,
                }
              : {}),
          }}
        >
          {mobileView === "main" ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView("highlighter")}
              onLinkClick={() => setMobileView("link")}
              isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === "highlighter" ? "highlighter" : "link"}
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar>

        <div className="max-w-175 mx-auto pt-12 px-4">
          <div className="text-[12px] text-muted-foreground lowercase tracking-widest mb-2 px-1">
            {status}
          </div>
          <input
            type="text"
            placeholder="Untitled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-4xl font-bold bg-transparent border-none outline-none placeholder:text-muted-foreground/30 mb-4"
          />

          <EditorContent
            editor={editor}
            role="presentation"
            className="simple-editor-content"
          />
        </div>
      </EditorContext.Provider>
    </div>
  );
}
