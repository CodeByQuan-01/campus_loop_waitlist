"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface WaitlistState {
  success: boolean;
  message: string;
}

export async function addToWaitlist(
  prevState: WaitlistState | null,
  formData: FormData
): Promise<WaitlistState> {
  // Add null check for formData
  if (!formData) {
    return {
      success: false,
      message: "Form data is missing. Please try again.",
    };
  }

  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return {
      success: false,
      message: "Please enter a valid email address",
    };
  }

  try {
    const { error } = await supabase
      .from("waitlist")
      .insert([{ email: email.toLowerCase().trim() }])
      .select();

    if (error) {
      if (error.code === "23505") {
        // Unique constraint violation
        return {
          success: false,
          message: "This email is already on our waitlist!",
        };
      }
      throw error;
    }

    return {
      success: true,
      message:
        "🎉 Welcome to the CampusLoop family! We'll notify you when we launch.",
    };
  } catch (error) {
    console.error("Waitlist error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
