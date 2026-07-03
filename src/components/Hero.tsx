"use client";

import { motion } from "motion/react";
import { FadingVideo } from "./FadingVideo";
import { BlurText } from "./BlurText";
import { Navbar } from "./Navbar";
import { ArrowUpRight, PlayIcon, ClockIcon, GlobeIcon } from "./Icons";

const HERO_VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4";

const HIDDEN = { filter: "blur(10px)", opacity: 0, y: 20 };
const VISIBLE = { filter: "blur(0px)", opacity: 1, y: 0 };

const enter = (delay: number) => ({
  initial: HIDDEN,
  animate: VISIBLE,
  transition: { duration: 0.8, delay, ease: "easeOut" as const },
});

const STATS = [
  { Icon: ClockIcon, value: "34.5 Min", label: "Average Videos Watch Time" },
  { Icon: GlobeIcon, value: "2.8B+", label: "Users Across the Globe" },
];

const PARTNERS = ["Aeon", "Vela", "Apex", "Orbit", "Zeno"];

export function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Background video — oversized and top-aligned; the focal point is the top of frame */}
      <FadingVideo
        src={HERO_VIDEO_SRC}
        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
        style={{ width: "120%", height: "120%" }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <Navbar />

        {/* Hero content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center pt-24 px-4">
          {/* Badge */}
          <motion.div
            {...enter(0.4)}
            className="liquid-glass rounded-full flex items-center gap-3 p-1"
          >
            <span className="bg-white text-black rounded-full px-3 py-1 text-xs font-semibold font-body">
              New
            </span>
            <span className="text-sm text-white/90 font-body pr-3">
              Maiden Crewed Voyage to Mars Arrives 2026
            </span>
          </motion.div>

          {/* Headline */}
          <BlurText
            text="Venture Past Our Sky Across the Universe"
            className="mt-6 text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] max-w-2xl justify-center tracking-[-4px]"
          />

          {/* Subheading */}
          <motion.p
            {...enter(0.8)}
            className="mt-4 text-sm md:text-base text-white max-w-2xl font-body font-light leading-tight"
          >
            Discover the universe in ways once unimaginable. Our pioneering vessels and
            breakthrough engineering bring deep-space exploration within reach&mdash;secure
            and extraordinary.
          </motion.p>

          {/* CTAs */}
          <motion.div {...enter(1.1)} className="flex items-center gap-6 mt-6">
            <button className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white font-body flex items-center gap-2">
              Start Your Voyage
              <ArrowUpRight className="h-5 w-5" />
            </button>
            <button className="text-sm font-medium text-white font-body flex items-center gap-2">
              View Liftoff
              <PlayIcon className="h-4 w-4" />
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div {...enter(1.3)} className="flex items-stretch gap-4 mt-8">
            {STATS.map(({ Icon, value, label }) => (
              <div
                key={value}
                className="liquid-glass rounded-[1.25rem] p-5 w-[220px] flex flex-col justify-between text-left"
              >
                <Icon className="w-7 h-7 text-white" />
                <div className="mt-8">
                  <div className="font-heading italic text-white text-4xl tracking-[-1px] leading-none">
                    {value}
                  </div>
                  <div className="text-xs text-white font-body font-light mt-2">{label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Partners */}
        <motion.div {...enter(1.4)} className="flex flex-col items-center gap-4 pb-8">
          <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body">
            Collaborating with top aerospace pioneers globally
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
            {PARTNERS.map((name) => (
              <span
                key={name}
                className="font-heading italic text-white text-2xl md:text-3xl tracking-tight"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
