import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import Link from "next/link";
export default function Editor() {
  return (
    <div>
      <SimpleEditor />
      <Link
        href="/"
        className="absolute top-16 left-32 text-muted-foreground hover:text-primary transition-colors cursor-pointer mb-4 inline-block"
      >
        ← back to home
      </Link>
    </div>
  );
}
