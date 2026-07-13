import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Ensure this route handler is never statically cached
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  
  // If CRON_SECRET is configured, enforce authentication
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // Run a lightweight query on 'site_content' table to trigger DB activity
    const { data, error } = await supabase
      .from("site_content")
      .select("key")
      .limit(1);

    if (error) {
      console.error("Supabase keep-alive query error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Database pinged successfully",
      timestamp: new Date().toISOString(),
      recordsFound: data?.length || 0,
    });
  } catch (error: any) {
    console.error("Supabase keep-alive execution error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Unknown error occurred" },
      { status: 500 }
    );
  }
}
