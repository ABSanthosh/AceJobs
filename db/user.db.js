import db from "../lib/prisma";

export async function fetchUserById(id) {
  return await db.user.findUnique({ where: { uid: id } });
}

export async function fetchResumeById(id) {
  return await db.resume.findUnique({ where: { uid: id } });
}

export async function upsertResume(data) {
  return await db.resume.upsert({
    where: { uid: data.uid },
    update: data,
    create: data,
  });
}

export async function getUserIn(data) {
  return await db.user.upsert({
    where: { uid: data.uid },
    update: data,
    create: data,
  });
}

export async function updateUser(data) {
  return await db.user.update({
    where: { phone: data.phone },
    data,
  });
}

export async function fetchReviews() {
  return await db.reviews.findMany();
}
