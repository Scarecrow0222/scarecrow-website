import { NextResponse } from "next/server";
import { recordPageView } from "@/lib/analytics";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (typeof body?.path !== "string") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    await recordPageView({
      path: body.path,
      referrer: typeof body.referrer === "string" ? body.referrer : null,
      userAgent: request.headers.get("user-agent")
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
