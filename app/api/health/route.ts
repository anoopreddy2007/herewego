import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function GET() {
  const { error } = await supabase
    .from("suggestions")
    .select("id")
    .limit(1);

  if (error) {
    console.error("Health check failed:", error);

    return NextResponse.json(
      { ok: false },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
  });
}