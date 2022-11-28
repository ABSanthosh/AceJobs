export async function getUserInAPI(formData) {
  return await fetch("/api/auth/get-user-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((res) => {
    return res.json();
  });
}
