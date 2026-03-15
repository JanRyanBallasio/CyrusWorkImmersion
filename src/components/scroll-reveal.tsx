"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "left" | "right" | "zoom";
  parallax?: number;
  distance?: number;
  blur?: number;
  threshold?: number;
  rootMargin?: string;
  scene?: boolean;
  sceneStart?: number;
  requireScroll?: boolean;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  variant = "up",
  parallax = 26,
  distance = 40,
  blur = 0,
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
  scene = false,
  sceneStart = 0.78,
  requireScroll = false,
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);
  const [offsetY, setOffsetY] = React.useState(0);
  const [hasScrolled, setHasScrolled] = React.useState(false);
  const [isCompactViewport, setIsCompactViewport] = React.useState(false);
  const resolvedDistance = isCompactViewport ? Math.min(distance, 28) : distance;
  const resolvedParallax = isCompactViewport ? Math.min(parallax, 8) : parallax;
  const resolvedDelay = isCompactViewport ? Math.min(delay, 120) : delay;
  const resolvedDuration = isCompactViewport ? 420 : 900;
  const compactVariant =
    isCompactViewport && (variant === "left" || variant === "right") ? "up" : variant;

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const updateViewport = () => setIsCompactViewport(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  React.useEffect(() => {
    if (!requireScroll) {
      setHasScrolled(true);
      return;
    }

    const initialScrollY = window.scrollY;
    const unlockDistance = isCompactViewport ? 18 : 48;

    const onScroll = () => {
      if (Math.abs(window.scrollY - initialScrollY) < unlockDistance) {
        return;
      }

      setHasScrolled(true);
      cleanup();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "];
      if (keys.includes(event.key)) {
        onScroll();
      }
    };

    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("touchmove", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      cleanup();
    };
  }, [isCompactViewport, requireScroll]);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (scene) {
      let frame = 0;

      const updateScene = () => {
        frame = 0;
        const rect = node.getBoundingClientRect();
        const viewportHeight = window.innerHeight || 1;
        const compactSceneStart = isCompactViewport ? Math.min(sceneStart, 0.92) : sceneStart;
        const triggerPoint = viewportHeight * compactSceneStart;

        if (hasScrolled && rect.top <= triggerPoint) {
          setVisible(true);
        }
      };

      const onScroll = () => {
        if (frame) return;
        frame = window.requestAnimationFrame(updateScene);
      };

      updateScene();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);

      return () => {
        if (frame) window.cancelAnimationFrame(frame);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasScrolled, isCompactViewport, rootMargin, scene, sceneStart, threshold, visible]);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;

    const updateParallax = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = (rect.top + rect.height * 0.5) / viewportHeight;
      const centered = progress - 0.5;
      setOffsetY(centered * resolvedParallax * -1);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [resolvedParallax]);

  const hiddenTransform = {
    up: { x: 0, y: resolvedDistance, scale: 1 },
    left: { x: resolvedDistance * -1, y: 0, scale: 1 },
    right: { x: resolvedDistance, y: 0, scale: 1 },
    zoom: { x: 0, y: Math.round(resolvedDistance * 0.6), scale: 0.98 },
  }[compactVariant];

  const transform = visible
    ? `translate3d(0, ${offsetY}px, 0) scale(1)`
    : `translate3d(${hiddenTransform.x}px, ${hiddenTransform.y + offsetY}px, 0) scale(${hiddenTransform.scale})`;

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[transform,opacity,filter] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
        visible ? "opacity-100" : "opacity-0",
        className,
      )}
      style={{
        transitionDelay: `${resolvedDelay}ms`,
        transitionDuration: `${resolvedDuration}ms`,
        transform,
        filter: visible ? "blur(0px)" : `blur(${blur}px)`,
      }}
    >
      {children}
    </div>
  );
}
