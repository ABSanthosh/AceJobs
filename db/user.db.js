import db from "../lib/prisma";

export async function fetchUserById(id) {
  return await db.user.findUnique({ where: { uid: id } });
}

export async function fetchResumeById(id) {
  return await db.resume.findUnique({ where: { uid: id } });
}

export async function addUser(data) {
  return await db.user.create({ data });
}

export async function upsertResume(data) {
  return await db.resume.upsert({
    where: { uid: data.uid },
    create: data,
    update: data,
  });
}

export async function upsertVideoResume(data) {
  return await db.videoResume.upsert({
    where: { uid: data.uid },
    create: data,
    update: data,
  });
}

export async function fetchVideoResumeById(id) {
  return await db.videoResume.findUnique({ where: { uid: id } });
}

export async function getUserIn(data) {
  return await db.user.upsert({
    where: { uid: data.uid },
    create: data,
    update: data,
  });
}

export async function updateUser(data) {
  return await db.user.update({
    where: { uid: data.uid },
    data,
  });
}

export async function fetchReviews() {
  const reviews = await db.reviews.findMany();

  return reviews;
}

export async function upsertEmployer(data) {
  return await db.employer.upsert({
    where: { uid: data.uid },
    create: data,
    update: data,
  });
}

export async function fetchEmployerById(id) {
  return await db.employer.findUnique({ where: { uid: id } });
}
