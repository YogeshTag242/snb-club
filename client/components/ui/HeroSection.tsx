import { Plus } from "lucide-react";



export default function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[unset] md:min-h-[731px] gap-12 md:gap-0">

          {/* LEFT */}
          <div className="max-w-xl space-y-6 text-center md:text-left mx-auto md:mx-0">
            <h1 className="text-[36px] sm:text-[44px] md:text-[52px] leading-[1.15] font-medium text-[#1A1A1A]">
              A <span className="gradient-text1 ">women only</span> space for
              meeting like minded people.
            </h1>

            <p className="text-base sm:text-lg text-[#6B6B6B]">
              The Group Chat You Always Wanted IRL.
            </p>

            <p className="text-base sm:text-lg font-semibold text-[#6B6B6B]">
              Gather, Grow, Belong
            </p>

            <button
  onClick={() => {
    const section = document.getElementById("form-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }}
  className="mt-4 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF5C7A] to-[#FF8AA0] text-white text-sm font-semibold"
>
  JOIN OUR CLUB
</button>

          </div>

          {/* RIGHT */}
          <div className="relative h-[420px] sm:h-[520px] md:h-[731px] flex items-center justify-center">
            <svg
              viewBox="0 0 600 600"
              className="absolute w-[520px] h-[520px] sm:w-[700px] sm:h-[700px] md:w-[900px] md:h-[900px]"
            >
              <defs>
                <mask id="wMask">
                  <rect width="100%" height="100%" fill="black" />
                  <g transform="rotate(30 350 350)">
                    <path
                      d="
                        M70 100
                        C140 660, 200 460, 240 240
                        C270 0, 320 140, 350 260
                        C390 460, 450 560, 500 60
                      "
                      fill="none"
                      stroke="white"
                      strokeWidth="110"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-mask-draw"
                    />
                  </g>
                </mask>
              </defs>

              <image
                href="../banner.png"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
                mask="url(#wMask)"
                transform="scale(0.95) translate(50 40)"
              />
            </svg>

            {/* FLOATING GLASS CARD */}
            <div className="absolute bottom-6 sm:bottom-10 md:bottom-16 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-56 sm:w-64 p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg flex flex-col gap-3 animate-float-slow">
              <p className="text-lg font-bold text-black/90">Join Once</p>

              <div className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-gradient-to-r from-[#FF5C7A] to-[#FF8AA0] text-white font-bold text-lg">
                ₹2,500
              </div>

              <div className="flex items-center -space-x-3">
                <img
                  src="https://randomuser.me/api/portraits/women/46.jpg"
                  className="w-9 h-9 rounded-full border-2 border-white"
                />
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  className="w-9 h-9 rounded-full border-2 border-white"
                />
                <span className="w-9 h-9 flex items-center justify-center text-white font-semibold text-sm bg-gradient-to-r from-[#FF5C7A] to-[#FF8AA0] rounded-full border-2 border-white">
                  +99
                </span>
              </div>

              <p className="text-sm font-bold text-black/70">
                No Renewal · No Pressure
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
