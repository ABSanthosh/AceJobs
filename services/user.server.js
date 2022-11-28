import db from "../lib/prisma";

export async function getUserIn(data) {
  return await db.user.upsert({
    where: { email: data.email },
    update: data,
    create: data,
  });
}
