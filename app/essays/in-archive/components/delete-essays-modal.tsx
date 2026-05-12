"use client";

import { Trash, Trash2Icon } from "lucide-react";
import { permanentlyDeleteEssays } from "../actions";
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

export default function DeleteEssaysModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const router = useRouter();

  const handleDelete = async () => {
    await permanentlyDeleteEssays();
    router.refresh();
  }

  return (
    <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <AlertDialogTrigger asChild>
        <button className="text-muted-foreground hover:text-primary transition-colors cursor-pointer mb-4" onClick={() => setIsModalOpen(true)}>
          <Trash />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete essays?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete all essays.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
