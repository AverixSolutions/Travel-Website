// src/app/api/packages/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.package.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    include: { gallery: { orderBy: { sortOrder: "asc" } } },
  });

  return NextResponse.json({ items });
}
