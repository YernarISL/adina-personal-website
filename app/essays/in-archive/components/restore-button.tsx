"use client"

import { restoreEssay } from "../actions";
import { Button } from "@/components/ui/button";

export default function RestoreButton({ essayId }: { essayId: string }) {  
  return (
    <Button
      variant="outline"
      size="sm"
      className="w-full justify-center cursor-pointer"
      onClick={() => restoreEssay(essayId)}
    >
      restore
    </Button>
  );
}