"use client";

import { useActionState } from "react";
import { addToWaitlist } from "@/app/actions/waitlist";
import type { JSX } from "react";

export const WaitlistWrap = (): JSX.Element => {
  const [state, action, isPending] = useActionState(addToWaitlist, null);

  return (
    <div className="flex flex-col w-screen min-h-screen items-center justify-center gap-6 sm:gap-8 lg:gap-12 p-4 sm:p-6 lg:p-12 bg-[#66b5f6] m-0">
      <div className="flex flex-col items-center gap-4 sm:gap-6 w-full">
        <div className="flex flex-col items-center gap-4 sm:gap-6 w-full">
          <h1 className="w-full max-w-[860px] [text-shadow:2px_2px_0px_#000000] sm:[text-shadow:3px_3px_0px_#000000] lg:[text-shadow:4px_4px_0px_#000000] [-webkit-text-stroke:0.5px_#000000] sm:[-webkit-text-stroke:0.75px_#000000] lg:[-webkit-text-stroke:1px_#000000] font-['Outfit',Helvetica] font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[64px] text-center tracking-[0] leading-tight sm:leading-normal lg:leading-[1.2]">
            Join the CampusLoop Waitlist Now
          </h1>
          <p className="w-full max-w-[700px] font-['Outfit',Helvetica] font-normal text-black text-sm sm:text-base lg:text-lg text-center tracking-[0] leading-relaxed px-2 sm:px-4">
            Be the First to Unleash Your Voice!
            <br />
            Why Join the Waitlist?
            <br /> Be among the first to express yourself freely on CampusLoop—a
            nationwide hub for Nigerian students! Get early access to share
            anonymous confessions, trade in the marketplace, access study
            resources, earn badges, and vibe with your campus crew. Shape a
            student-powered platform and enjoy exclusive perks as we launch
            across Nigeria!
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 sm:gap-6 w-full">
        <form
          action={action}
          className="flex flex-col sm:flex-row items-stretch sm:items-end justify-center gap-4 sm:gap-6 w-full"
        >
          <div className="flex flex-col items-start gap-2 w-full sm:flex-1 sm:max-w-[400px]">
            <label
              htmlFor="email"
              className="font-['Roboto',Helvetica] font-normal text-black text-sm sm:text-base tracking-[0] leading-6 w-full"
            >
              Email
            </label>
            <div className="flex items-center gap-2 p-3 w-full bg-white rounded-lg border border-solid border-black">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                disabled={isPending}
                className="border-none shadow-none p-0 h-auto font-['Roboto',Helvetica] font-normal text-[#666666] text-sm sm:text-base tracking-[0] leading-6 w-full bg-transparent outline-none placeholder:text-[#666666] disabled:opacity-50"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 w-full sm:w-auto sm:flex-shrink-0 bg-[#fff826] rounded-lg border border-solid border-black shadow-[2px_2px_0px_#000000] sm:shadow-[3px_3px_0px_#000000] lg:shadow-[4px_4px_0px_#000000] hover:bg-[#fff826] hover:translate-y-0 transition-transform duration-150 active:translate-x-0.5 active:translate-y-0.5 sm:active:translate-x-1 sm:active:translate-y-1 active:shadow-[1px_1px_0px_#000000] sm:active:shadow-[2px_2px_0px_#000000] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-[2px_2px_0px_#000000] sm:disabled:shadow-[3px_3px_0px_#000000] lg:disabled:shadow-[4px_4px_0px_#000000]"
          >
            <span className="font-['Outfit',Helvetica] font-normal text-black text-sm sm:text-base tracking-[0] leading-6 whitespace-nowrap">
              {isPending ? "Joining..." : "Join the waitlist"}
            </span>
          </button>
        </form>

        {/* Status Messages */}
        {state && (
          <div
            className={`p-3 rounded-lg border-2 border-solid border-black font-['Outfit',Helvetica] font-normal text-xs sm:text-sm text-center tracking-[0] leading-relaxed w-full max-w-[500px] ${
              state.success
                ? "bg-[#4ade80] text-black shadow-[2px_2px_0px_#000000]"
                : "bg-[#f87171] text-black shadow-[2px_2px_0px_#000000]"
            }`}
          >
            {state.message}
          </div>
        )}

        <p className="font-['Outfit',Helvetica] font-normal text-black text-xs sm:text-sm text-center tracking-[0] leading-relaxed w-full max-w-[500px] px-2">
          By joining, you agree to receive emails from CAMPUS LOOP.
        </p>
      </div>
    </div>
  );
};
