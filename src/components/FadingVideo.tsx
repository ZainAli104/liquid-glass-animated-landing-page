"use client";

import { CSSProperties, useEffect, useRef } from "react";

const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55; // seconds before the end to start fading out

type FadingVideoProps = {
  src: string;
  className?: string;
  style?: CSSProperties;
};

export function FadingVideo({ src, className, style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // rAF-driven fade that resumes from the video's current opacity, so an
    // interrupted fade never jumps.
    const fadeTo = (target: number, duration = FADE_MS) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const from = parseFloat(video.style.opacity || "0");
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        video.style.opacity = String(from + (target - from) * t);
        if (t < 1) rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    };

    const onLoadedData = () => {
      video.style.opacity = "0";
      video.play().catch(() => {});
      fadeTo(1);
    };

    const onTimeUpdate = () => {
      if (fadingOutRef.current) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= FADE_OUT_LEAD && remaining > 0) {
        fadingOutRef.current = true;
        fadeTo(0);
      }
    };

    const onEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
        fadingOutRef.current = false;
        fadeTo(1);
      }, 100);
    };

    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, [src]);

  // No `loop` attribute — looping is handled manually via `ended` so every
  // cycle gets a fade-out/fade-in.
  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      style={{ opacity: 0, ...style }}
      autoPlay
      muted
      playsInline
      preload="auto"
    />
  );
}
