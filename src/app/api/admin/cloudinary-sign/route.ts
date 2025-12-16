// src/app/api/admin/cloudinary-sign/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { cloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  const guard = requireAdmin(req);
  if (!guard.ok)
    return NextResponse.json({ error: guard.error }, { status: 401 });

  const { folder } = await req.json().catch(() => ({ folder: "packages" }));
  const timestamp = Math.floor(Date.now() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: folder || "packages" },
    process.env.CLOUDINARY_API_SECRET!
  );

  return NextResponse.json({
    timestamp,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    folder: folder || "packages",
  });
}
