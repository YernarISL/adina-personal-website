import Link from "next/link";
import ModeToggle from "@/components/ModeToggle";

export default function Essays() {
  return (
    <div className="min-h-screen p-8 md:p-16">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <main className="max-w-4xl mx-auto">
        <div className="mb-12">
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer mb-4 inline-block"
          >
            ← back to home
          </Link>
          <h1 className="text-3xl md:text-4xl font-medium mb-4">essays</h1>
        </div>
      </main>
    </div>
  );
}
