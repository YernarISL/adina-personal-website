import Link from "next/link";
import ModeToggle from "@/components/ModeToggle";
import DeleteEssaysModal from "./components/delete-essays-modal";
import { prisma } from "@/lib/prisma";

export default async function InArchive() {
  const essaysInArchive = await prisma.essay.findMany({
    where: {
      deletedAt: { not: null },
    },
  });

  return (
    <div className="min-h-screen p-8 md:p-16">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <main className="max-w-4xl mx-auto">
        <div className="mb-12">
          <Link
            href="/essays"
            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer mb-4 inline-block"
          >
            ← back
          </Link>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl md:text-4xl font-medium mb-4">archive</h1>
            <DeleteEssaysModal />
          </div>
        </div>

        <div className="space-y-8">
          {essaysInArchive.map((essay) => (
            <Link
              key={essay.id}
              href={`/essays/in-archive/${essay.id}`}
              className="group block"
            >
              <article className="border-b border-border pb-8">
                <div className="mb-4">
                  <h2 className="text-xl md:text-2xl font-medium mb-2">
                    {essay.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {new Date(essay.updatedAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
