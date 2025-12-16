// src/app/api/admin/packages/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const UpdateSchema = z.object({
  title: z.string().min(2).optional(),
  slug: z.string().min(2).optional(),
  location: z.string().min(2).optional(),
  days: z.number().int().min(1).optional(),
  nights: z.number().int().min(0).optional(),
  price: z.number().int().min(0).optional(),
  currency: z.string().optional(),
  category: z
    .enum(["international", "domestic", "honeymoon", "adventure"])
    .optional(),
  highlights: z.array(z.string().min(1)).optional(),
  isActive: z.boolean().optional(),
  coverImageUrl: z.string().url().nullable().optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = requireAdmin(req);
  if (!guard.ok)
    return NextResponse.json({ error: guard.error }, { status: 401 });

  const { id } = await params;
  const json = await req.json();
  const data = UpdateSchema.parse(json);

  const updated = await prisma.package.update({
    where: { id },
    data,
    include: { gallery: { orderBy: { sortOrder: "asc" } } },
  });

  revalidatePath("/packages");
  return NextResponse.json({ item: updated });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = requireAdmin(req);
  if (!guard.ok)
    return NextResponse.json({ error: guard.error }, { status: 401 });

  const { id } = await params;

  await prisma.package.delete({ where: { id } });

  revalidatePath("/packages");
  return NextResponse.json({ ok: true });
}
