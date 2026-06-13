import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isValidToken } from "@/lib/admin-auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  return !!token && isValidToken(token);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
    }

    const filename = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.webp`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "authors");
    const buffer = Buffer.from(await file.arrayBuffer());

    const webpBuffer = await sharp(buffer).webp({ quality: 85 }).toBuffer();

    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), webpBuffer);

    const url = `/uploads/authors/${filename}`;
    return NextResponse.json({ url });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
