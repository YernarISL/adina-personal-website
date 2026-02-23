import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";

export default async function EssayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const essay = await prisma.essay.findUnique({
    where: { id: id },
  });

  if (!essay) notFound();

  const htmlContent = generateHTML(essay.content as any, [StarterKit]);

  return (
    <article className="max-w-2xl mx-auto py-20 px-6">
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

      {/* Класс "prose" от Tailwind Typography делает текст красивым */}
      <div
        className="prose dark:prose-invert prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}
