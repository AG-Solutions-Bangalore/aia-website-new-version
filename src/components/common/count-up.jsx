import { useEffect, useRef, useState } from "react";

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  // NOTE: effects never run during Node SSG — start at the final value so
  // crawlers (and no-JS clients) see real stats instead of "0".
  const [count, setCount] = useState(() =>
    typeof window === "undefined" ? end : 0,
  );
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(end % 1 === 0 ? Math.floor(start) : start.toFixed(1));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [started, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};


export default CountUp