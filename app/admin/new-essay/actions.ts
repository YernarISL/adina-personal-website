"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveEssay(
  id: string | null,
  title: string,
  content: any,
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
      success: true
    };

  } catch (error) {
    console.error("PRISMA ERROR:", error);
    
    return { 
      success: false, 
      error: "Essay is not saved" 
    };
  }
}