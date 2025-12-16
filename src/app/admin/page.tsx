// src/app/admin/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminIndex() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token || token !== process.env.ADMIN_TOKEN) {
    redirect("/admin/login");
  }

  redirect("/admin/packages");
}
