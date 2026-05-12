"use server";

import { prisma } from "@/lib/prisma";
import { JSONContent } from "@tiptap/core";
import { revalidatePath } from "next/cache";

export async function saveEssay(
  id: string | null,
  title: string,
  content: JSONContent,
) {
  try {
    let essay;

    if (!id) {
      essay = await prisma.essay.create({
        data: {
          title: title || "Untitled",
          content: content,
        },
      });
    } else {
      essay = await prisma.essay.update({
        where: { id: id },
        data: {
          title: title,
          content: content,
        },
      });
    }

    revalidatePath("/");
    revalidatePath("/essays");
    return {
      id: essay.id,
      title: essay.title,
      success: true,
    };
  } catch (error) {
    console.error("PRISMA ERROR:", error);

    return {
      success: false,
      error: "Essay is not saved",
    };
  }
}

export async function loadEssay(id: string) {
  const essay = await prisma.essay.findUnique({
    where: { id: id },
  });

  return { content: essay?.content as JSONContent, title: essay?.title };
}

export async function checkForUniqueTitle(title: string, currentId?: string | null) {
  const condition = currentId
    ? { title: title, NOT: { id: currentId } }
    : { title: title };
  const essay = await prisma.essay.findFirst({
    where: condition,
  });

  if (essay) {
    return {
      isUnique: false,
      message:
        "An essay with this title already exists. Please choose a different title.",
    };
  } else {
    return {
      isUnique: true,
      message: "Title is unique.",
    };
  }
}

export async function DidEssayAlreadySaved(essayId: string) {
  const essay = await prisma.essay.findUnique({
    where: { id: essayId },
  });
  return essay ? true : false;
}
