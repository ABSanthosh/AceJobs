import db from "../lib/prisma";
import { Category } from "@prisma/client";

export async function getJobsByIds(ids) {
  return await db.job.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
}

export async function getJobsBySlug(slug) {
  return await db.job.findUnique({
    where: {
      id: slug,
    },
  });
}

export async function getJobsByCategory(category) {
  return await db.job.findMany({
    where: {
      category: category === "SEMI" ? Category.SEMI : Category.SKILLED,
    },
  });
}
