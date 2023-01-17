export async function updateUser(formData) {
  return await fetch("/api/my/update-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((res) => {
    return res.json();
  });
}
