import Link from "next/link";
import ModeToggle from "@/components/ModeToggle";

export default function Socials() {
  return (
    <div className="min-h-screen p-8 md:p-16">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <main className="max-w-4xl mx-auto">
        <div className="mb-12 pt-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 lowercase">
            socials
          </h1>
          <p className="text-lg text-muted-foreground">
            find me on the internet
          </p>
        </div>
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 mb-6">
            <Link
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              home
            </Link>
            <Link
              href="/essays"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              essays
            </Link>
          </div>
        </div>
        <div className="mb-8">
          <Link href="https://t.me/adinmntv" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"></path>
            </svg>
            <span>t.me/adinmntv</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
