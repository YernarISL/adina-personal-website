'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const ALLOWED_EMAILS = new Set([
  'adinmntv@gmail.com',
  'ernarislambek@gmail.com',
]);

function AccessDeniedMessage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-center">
      <div className="max-w-xl rounded-3xl border border-border/60 bg-background/90 px-8 py-10 shadow-xl backdrop-blur">
        <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Этот сайт принадлежит только Адине!
        </p>
      </div>
    </div>
  );
}

export default function SiteAccessGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { isLoaded, isSignedIn, user } = useUser();

  if (pathname?.startsWith('/sign-in')) {
    return children;
  }

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return children;
  }

  const emailAddress =
    user.primaryEmailAddress?.emailAddress ?? user.emailAddresses[0]?.emailAddress;

  if (!emailAddress || !ALLOWED_EMAILS.has(emailAddress)) {
    return <AccessDeniedMessage />;
  }

  return children;
}
