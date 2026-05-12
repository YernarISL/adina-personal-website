"use client";

import { Trash2Icon } from "lucide-react";
import { deleteEssay } from "../actions";
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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DeleteEssaysModal({ essayId }: { essayId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    await deleteEssay(essayId);
    router.refresh();
  };

  return (
    <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          className="w-full justify-center cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete the essay?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the selected essay.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
