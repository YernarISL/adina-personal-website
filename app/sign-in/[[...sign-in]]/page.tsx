import { SignIn } from "@clerk/nextjs";
import ModeToggle from "@/components/ModeToggle";

export default function Page() {
  return (
    <div>
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <SignIn />
      </div>
    </div>
  );
}
