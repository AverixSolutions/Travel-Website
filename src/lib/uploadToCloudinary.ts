// src/lib/uploadToCloudinary.ts
export async function uploadToCloudinary(file: File, adminToken: string) {
  const signRes = await fetch("/api/admin/cloudinary-sign", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-admin-token": adminToken,
    },
    body: JSON.stringify({ folder: "travelco/packages" }),
  });

  if (!signRes.ok) throw new Error("Failed to sign upload");
  const signed = await signRes.json();

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", signed.apiKey);
  form.append("timestamp", String(signed.timestamp));
  form.append("signature", signed.signature);
  form.append("folder", signed.folder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${signed.cloudName}/image/upload`,
    { method: "POST", body: form }
  );

  if (!uploadRes.ok) throw new Error("Upload failed");
  const out = await uploadRes.json();

  return {
    url: out.secure_url as string,
    publicId: out.public_id as string,
  };
}
