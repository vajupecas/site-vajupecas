import { useEffect, useRef, useState } from "react";
import { animate, useMotionValue, useTransform, useMotionValueEvent } from "motion/react";

interface CounterProps {
  target: number;
  duration?: number;
}

const Counter = ({ target, duration = 2 }: CounterProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useMotionValueEvent(rounded, "change", (latest) => setDisplay(latest));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          animate(count, target, { duration });
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [count, started, target, duration]);

  return <span ref={ref}>{display}</span>;
};

export default Counter;
