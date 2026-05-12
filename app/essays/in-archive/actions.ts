"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function restoreEssay(essayId: string) {
  await prisma.essay.update({
    where: { id: essayId },
    data: { deletedAt: null },
  });
  redirect("/essays");
}

export async function deleteEssay(essayId: string) {
  await prisma.essay.delete({ where: { id: essayId } });
  redirect("/essays/in-archive");
}

export async function permanentlyDeleteEssays() {
  await prisma.essay.deleteMany({
    where: { deletedAt: { not: null } },
  });
}
