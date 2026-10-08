import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { supabase } from "@/lib/db";
import { suggestionSchema } from "@/lib/schema";

const MAX_BODY_SIZE = 4 * 1024;
const RATE_LIMIT = 5;
const RATE_WINDOW_SECONDS = 10 * 60;

function getClientKey(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    realIp?.trim() ||
    "unknown";

  return ip;
}

function hashRateLimitKey(value: string) {
  return crypto
    .createHash("sha256")
    .update(`suggest-rate-limit:${value}`)
    .digest("hex");
}

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
    // --------------------------------------------------
    // REQUEST SIZE
    // --------------------------------------------------

    const contentLength = request.headers.get("content-length");

    if (contentLength && Number(contentLength) > MAX_BODY_SIZE) {
      return NextResponse.json(
        { status: "invalid" },
        { status: 413 }
      );
    }

    // --------------------------------------------------
    // ORIGIN CHECK
    // --------------------------------------------------

    const origin = request.headers.get("origin");
    const host = request.headers.get("host");

    if (origin && host) {
      try {
        const originUrl = new URL(origin);

        if (originUrl.host !== host) {
          return NextResponse.json(
            { status: "invalid" },
            { status: 403 }
          );
        }
      } catch {
        return NextResponse.json(
          { status: "invalid" },
          { status: 403 }
        );
      }
    }

    // --------------------------------------------------
    // RATE LIMIT
    // --------------------------------------------------

    const clientKey = getClientKey(request);
    const keyHash = hashRateLimitKey(clientKey);

    const { data: allowed, error: rateLimitError } = await supabase.rpc(
      "check_suggest_rate_limit",
      {
        p_key_hash: keyHash,
        p_limit: RATE_LIMIT,
        p_window_seconds: RATE_WINDOW_SECONDS,
      }
    );

    if (rateLimitError) {
      console.error("Rate limit check failed:", rateLimitError.message);

      return NextResponse.json(
        { status: "error" },
        { status: 500 }
      );
    }

    if (!allowed) {
      return NextResponse.json(
        {
          status: "rate_limited",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(RATE_WINDOW_SECONDS),
          },
        }
      );
    }

    // --------------------------------------------------
    // REQUEST DATA
    // --------------------------------------------------

    const body = await getRequestData(request);

    // --------------------------------------------------
    // HONEYPOT
    // --------------------------------------------------

    if (body.website) {
      return NextResponse.json(
        {
          status: "received",
          refNo: 0,
        },
        { status: 201 }
      );
    }

    // --------------------------------------------------
    // VALIDATION
    // --------------------------------------------------

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

    // --------------------------------------------------
    // DEDUPE
    // --------------------------------------------------

    const dedupeSource = [
      data.player.trim().toLowerCase(),
      data.toClub.trim().toLowerCase(),
      data.window.trim().toLowerCase(),
    ].join("|");

    const dedupeKey = crypto
      .createHash("sha256")
      .update(dedupeSource)
      .digest("hex");

    // --------------------------------------------------
    // INSERT
    // --------------------------------------------------

    const { data: inserted, error } = await supabase
      .from("suggestions")
      .insert({
        player: data.player,
        from_club: data.fromClub,
        to_club: data.toClub,
        window_label: data.window,
        source_url: data.sourceUrl,
        note: data.note || null,

        credit_name:
          data.creditOk && data.creditName
            ? data.creditName
            : null,

        credit_ok: data.creditOk ?? false,

        contact_email: data.email || null,

        status: "received",

        notice_version: "notice_v1",

        dedupe_key: dedupeKey,
      })
      .select("ref_no")
      .single();

    if (error) {
      console.error("Suggestion insert failed:", error.message);

      return NextResponse.json(
        {
          status: "error",
        },
        { status: 500 }
      );
    }

    // --------------------------------------------------
    // SUCCESS
    // --------------------------------------------------

    return NextResponse.json(
      {
        status: "received",
        refNo: inserted.ref_no,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Suggestion API error:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return NextResponse.json(
      {
        status: "error",
      },
      { status: 500 }
    );
  }
}