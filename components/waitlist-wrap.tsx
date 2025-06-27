"use client";
import { useActionState } from "react"; // This import is incorrect and should be fixed
import { addToWaitlist } from "@/app/actions/waitlist";
import type { JSX } from "react"; // Declare JSX variable

export const WaitlistWrap = (): JSX.Element => {
  const [state, action, isPending] = useActionState(addToWaitlist, null);

  return (
    <div className="flex flex-col max-w-[900px] h-[547px] items-center justify-center gap-12 p-12 relative bg-[#66b5f6] border-2 border-solid border-black rounded-none">
      <div className="flex flex-col items-center gap-4 relative self-stretch w-full flex-[0_0_auto] mt-[-31.00px] p-0">
        <div className="flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
          <h1 className="relative w-[860px] mt-[-2.00px] ml-[-29.00px] mr-[-27.00px] [text-shadow:4px_4px_0px_#000000] [-webkit-text-stroke:1px_#000000] font-['Outfit',Helvetica] font-bold text-white text-[64px] text-center tracking-[0] leading-[76.8px]">
            Join the CampusLoop Waitlist Now
          </h1>
          <p className="relative self-stretch font-['Outfit',Helvetica] font-normal text-black text-lg text-center tracking-[0] leading-[27px]">
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

      <div className="flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto] mb-[-31.00px] p-0">
        <form
          action={action}
          className="flex items-end justify-end gap-6 relative self-stretch w-full flex-[0_0_auto]"
        >
          <div className="flex flex-col items-start gap-2 relative flex-1 grow">
            <label
              htmlFor="email"
              className="relative self-stretch mt-[-1.00px] font-['Roboto',Helvetica] font-normal text-black text-base tracking-[0] leading-6"
            >
              Email
            </label>
            <div className="flex items-center gap-2 p-3 w-full flex-[0_0_auto] mb-[-1.00px] ml-[-1.00px] mr-[-1.00px] bg-white rounded-lg border border-solid border-black relative self-stretch">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                disabled={isPending}
                className="border-none shadow-none p-0 h-auto font-['Roboto',Helvetica] font-normal text-[#666666] text-base tracking-[0] leading-6 w-full bg-transparent outline-none placeholder:text-[#666666] disabled:opacity-50"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 relative flex-[0_0_auto] mb-[-1.00px] mr-[-1.00px] bg-[#fff826] rounded-lg border border-solid border-black shadow-[4px_4px_0px_#000000] hover:bg-[#fff826] hover:translate-y-0 transition-transform duration-150 active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_#000000] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-[4px_4px_0px_#000000]"
          >
            <span className="relative w-fit font-['Outfit',Helvetica] font-normal text-black text-base tracking-[0] leading-6 whitespace-nowrap">
              {isPending ? "Joining..." : "Join the waitlist"}
            </span>
          </button>
        </form>

        {/* Status Messages */}
        {state && (
          <div
            className={`p-3 rounded-lg border-2 border-solid border-black font-['Outfit',Helvetica] font-normal text-sm text-center tracking-[0] leading-[21px] relative self-stretch ${
              state.success
                ? "bg-[#4ade80] text-black shadow-[2px_2px_0px_#000000]"
                : "bg-[#f87171] text-black shadow-[2px_2px_0px_#000000]"
            }`}
          >
            {state.message}
          </div>
        )}

        <p className="font-['Outfit',Helvetica] font-normal text-black text-sm text-center tracking-[0] leading-[21px] relative self-stretch">
          By joining, you agree to receive emails from CAMPUS LOOP.
        </p>
      </div>
    </div>
  );
};
