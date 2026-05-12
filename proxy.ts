import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Определяем защищенные роуты (все, что начинается с /admin)
const isAdminRoute = createRouteMatcher(['/admin(.*)']);
const isEssaysRoute = createRouteMatcher(['/essays(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    await auth.protect(); // Если не залогинен - отправит на страницу логина
  }

  if (isEssaysRoute(req)) {
    // Неразрешаем доступ к /essays, если пользователь не залогинен
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};