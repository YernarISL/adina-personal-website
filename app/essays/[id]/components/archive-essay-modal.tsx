"use client";

import { useState } from "react";
import { Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { moveEssayToArchive } from "../actions";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogMedia,
} from "@/components/ui/alert-dialog";

export default function ArchiveEssayModal({ essayId }: { essayId: string}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" type="submit" onClick={() => setIsModalOpen(true)}>
          archive essay
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <Archive />
          </AlertDialogMedia>
          <AlertDialogTitle>Archive essay?</AlertDialogTitle>
          <AlertDialogDescription>
            This will move the essay to the archive.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="default" onClick={() => moveEssayToArchive(essayId)}>
            Archive
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
