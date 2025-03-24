import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "../metaframe-utils/warframes.json");

  if (!fs.existsSync(filePath)) {
    console.error("🚨 warframes.json NOT FOUND at:", filePath);
    return NextResponse.json({ error: "Warframes data not found" }, { status: 404 });
  }

  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error("🚨 Error reading JSON:", error);
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}
