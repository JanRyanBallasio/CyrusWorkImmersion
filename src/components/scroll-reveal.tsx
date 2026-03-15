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
  const debugId = React.useId();

  React.useEffect(() => {
    if (!requireScroll) {
      setHasScrolled(true);
      return;
    }

    const initialScrollY = window.scrollY;
    const unlockDistance = 48;
    console.log("[ScrollReveal]", debugId, "requireScroll enabled", {
      initialScrollY,
      unlockDistance,
    });

    const onScroll = () => {
      console.log("[ScrollReveal]", debugId, "scroll check", {
        currentScrollY: window.scrollY,
        delta: Math.abs(window.scrollY - initialScrollY),
      });

      if (Math.abs(window.scrollY - initialScrollY) < unlockDistance) {
        return;
      }

      console.log("[ScrollReveal]", debugId, "scroll unlocked");
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
  }, [debugId, requireScroll]);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (scene) {
      let frame = 0;

      const updateScene = () => {
        frame = 0;
        const rect = node.getBoundingClientRect();
        const viewportHeight = window.innerHeight || 1;
        const triggerPoint = viewportHeight * sceneStart;
        console.log("[ScrollReveal]", debugId, "scene check", {
          top: rect.top,
          bottom: rect.bottom,
          triggerPoint,
          hasScrolled,
          visible,
        });

        if (hasScrolled && rect.top <= triggerPoint) {
          console.log("[ScrollReveal]", debugId, "scene revealed");
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
        console.log("[ScrollReveal]", debugId, "intersection check", {
          isIntersecting: entry.isIntersecting,
          intersectionRatio: entry.intersectionRatio,
          top: entry.boundingClientRect.top,
          bottom: entry.boundingClientRect.bottom,
        });
        if (entry.isIntersecting) {
          console.log("[ScrollReveal]", debugId, "intersection revealed");
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    console.log("[ScrollReveal]", debugId, "observer attached", {
      threshold,
      rootMargin,
      scene,
      sceneStart,
    });
    return () => observer.disconnect();
  }, [debugId, hasScrolled, rootMargin, scene, sceneStart, threshold, visible]);

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
      setOffsetY(centered * parallax * -1);
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
  }, [parallax]);

  const hiddenTransform = {
    up: { x: 0, y: distance, scale: 1 },
    left: { x: distance * -1, y: 0, scale: 1 },
    right: { x: distance, y: 0, scale: 1 },
    zoom: { x: 0, y: Math.round(distance * 0.6), scale: 0.96 },
  }[variant];

  const transform = visible
    ? `translate3d(0, ${offsetY}px, 0) scale(1)`
    : `translate3d(${hiddenTransform.x}px, ${hiddenTransform.y + offsetY}px, 0) scale(${hiddenTransform.scale})`;

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[transform,opacity,filter] duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
        visible ? "opacity-100" : "opacity-0",
        className,
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transform,
        filter: visible ? "blur(0px)" : `blur(${blur}px)`,
      }}
    >
      {children}
    </div>
  );
}
