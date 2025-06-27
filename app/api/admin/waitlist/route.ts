import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    // Fetch all emails
    const { data: emails, error: emailsError } = await supabase
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false });

    if (emailsError) throw emailsError;

    // Calculate stats
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const stats = {
      total: emails?.length || 0,
      today:
        emails?.filter((email) => new Date(email.created_at) >= today).length ||
        0,
      thisWeek:
        emails?.filter((email) => new Date(email.created_at) >= weekAgo)
          .length || 0,
    };

    return NextResponse.json({ emails, stats });
  } catch (error) {
    console.error("Admin API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch waitlist data" },
      { status: 500 }
    );
  }
}
