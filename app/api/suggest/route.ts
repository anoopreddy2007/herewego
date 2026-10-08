import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { suggestionSchema } from "@/lib/schema";

async function getRequestData(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return await request.json();
  }

  const formData = await request.formData();

  return {
    player: formData.get("player")?.toString() ?? "",
    fromClub: formData.get("fromClub")?.toString() ?? "",
    toClub: formData.get("toClub")?.toString() ?? "",
    window: formData.get("window")?.toString() ?? "",
    sourceUrl: formData.get("sourceUrl")?.toString() ?? "",
    note: formData.get("note")?.toString() ?? "",
    creditName: formData.get("creditName")?.toString() ?? "",
    creditOk: formData.get("creditOk") === "true",
    email: formData.get("email")?.toString() ?? "",
    website: formData.get("website")?.toString() ?? "",
    t: formData.get("t")?.toString() ?? "",
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await getRequestData(request);

    // Honeypot
    if (body.website) {
      return NextResponse.json(
        {
          status: "received",
          refNo: 0,
        },
        { status: 201 }
      );
    }

    const result = suggestionSchema.safeParse(body);

    if (!result.success) {
      const errors: Record<string, string> = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0]?.toString() || "form";

        if (!errors[field]) {
          errors[field] = issue.message;
        }
      }

      return NextResponse.json(
        {
          status: "invalid",
          errors,
        },
        { status: 422 }
      );
    }

    const data = result.data;

    const { data: inserted, error } = await supabase
      .from("suggestions")
      .insert({
        player: data.player,
        from_club: data.fromClub,
        to_club: data.toClub,
        window_label: data.window,
        source_url: data.sourceUrl,
        note: data.note || null,
        credit_name: data.creditName || null,
        credit_ok: data.creditOk ?? false,
        contact_email: data.email || null,
        status: "received",
      })
      .select("ref_no")
      .single();

    if (error) {
      console.error("Suggestion insert failed:", error);

      return NextResponse.json(
        {
          status: "error",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        status: "received",
        refNo: inserted.ref_no,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Suggestion API error:", error);

    return NextResponse.json(
      {
        status: "error",
      },
      { status: 500 }
    );
  }
}