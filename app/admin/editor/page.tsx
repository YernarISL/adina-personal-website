"use client";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { useCallback, useState } from "react";
import Link from "next/link";

export default function Editor() {
  const [isUniqueTitle, setIsUniqueTitle] = useState(true);

  const handleUniqueTitleCheck = useCallback((isUnique: boolean) => {
    setIsUniqueTitle(isUnique);
  }, []);

  return (
    <div>
      <SimpleEditor onSendBlocker={handleUniqueTitleCheck} />

      {isUniqueTitle ? (
        <Link
          href="/essays"
          className="absolute top-4 left-4 md:top-16 md:left-32 text-muted-foreground hover:text-primary transition-colors cursor-pointer mb-4 inline-block"
        >
          ← back
        </Link>
      ) : (
        <span className="absolute top-4 left-4 md:top-16 md:left-32 text-muted-foreground hover:text-primary transition-colors mb-4 inline-block opacity-50 pointer-events-none cursor-not-allowed">
          ← back
        </span>
      )}
    </div>
  );
}
