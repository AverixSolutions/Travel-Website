// src/app/api/admin/packages/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const CreateSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  location: z.string().min(2),
  days: z.number().int().min(1),
  nights: z.number().int().min(0),
  price: z.number().int().min(0),
  currency: z.string().default("INR"),
  category: z.enum(["international", "domestic", "honeymoon", "adventure"]),
  highlights: z.array(z.string().min(1)).default([]),
  isActive: z.boolean().default(true),
  coverImageUrl: z.string().url().optional().nullable(),
});

export async function POST(req: NextRequest) {
  const guard = requireAdmin(req);
  if (!guard.ok)
    return NextResponse.json({ error: guard.error }, { status: 401 });

  const json = await req.json();
  const data = CreateSchema.parse(json);

  const created = await prisma.package.create({
    data,
  });

  revalidatePath("/packages");

  return NextResponse.json({ item: created });
}

export async function GET(req: NextRequest) {
  const guard = requireAdmin(req);
  if (!guard.ok)
    return NextResponse.json({ error: guard.error }, { status: 401 });

  const items = await prisma.package.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ items });
}
