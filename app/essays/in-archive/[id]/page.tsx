import ModeToggle from "@/components/ModeToggle";
import Link from "next/link";
import StarterKit from "@tiptap/starter-kit";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/dist/client/components/navigation";
import { generateHTML } from "@tiptap/html";
import { JSONContent } from "@tiptap/core";
import RestoreButton from "../components/restore-button";
import DeleteEssayModal from "../components/delete-essay-modal";

export default async function InArchiveEssayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const essay = await prisma.essay.findUnique({
    where: { id: id },
  });

  if (!essay) notFound();

  const htmlContent = generateHTML(essay.content as JSONContent, [StarterKit]);

  return (
    <div>
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <article className="max-w-2xl mx-auto py-20 px-6">
        <div className="flex justify-between items-center">
          <Link
            href="/essays"
            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer mb-4 inline-block"
          >
            ← back
          </Link>
          <div className="flex gap-4 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-muted-foreground hover:text-primary transition-colors cursor-pointer mb-3 inline-block">
                  <Ellipsis />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col bg-background border border-border rounded-md p-2 gap-2">
                <DropdownMenuItem asChild>
                    <RestoreButton essayId={essay.id} />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <DeleteEssayModal essayId={essay.id} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <header className="mb-12">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            {essay.title}
          </h1>
          <p className="text-muted-foreground">
            {new Date(essay.createdAt).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
            })}
          </p>
        </header>

        <div
          className="prose dark:prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </div>
  );
}
