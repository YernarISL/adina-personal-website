"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function moveEssayToArchive(essayId: string) {
  await prisma.essay.update({
    where: { id: essayId },
    data: { deletedAt: new Date() },
  });
  redirect("/essays"); // Redirect to the essays list page after deletion
}