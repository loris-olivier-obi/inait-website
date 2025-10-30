import { getPages } from "@/lib/sanity";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pages = await getPages();
    return NextResponse.json(pages);
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json(
      { error: "Failed to fetch pages" },
      { status: 500 },
    );
  }
}
