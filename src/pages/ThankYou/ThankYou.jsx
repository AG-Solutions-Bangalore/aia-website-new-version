import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Phone } from 'lucide-react';
import {
  THANK_YOU_COUNTDOWN_SECONDS,
  clearThankYouSource,
  formatCountdown,
  resolveThankYouSource,
} from '@/lib/thankYou';

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [source, setSource] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(THANK_YOU_COUNTDOWN_SECONDS);
  const isLeavingRef = useRef(false);

  useEffect(() => {
    const resolvedSource = resolveThankYouSource(location.state?.from);
    if (!resolvedSource) {
      clearThankYouSource();
      navigate('/', { replace: true });
      return;
    }
    setSource(resolvedSource);
  }, [location.state, navigate]);

  useEffect(() => {
    if (!source) return;

    const deadline = Date.now() + THANK_YOU_COUNTDOWN_SECONDS * 1000;
    const updateCountdown = () => {
      const remaining = Math.max(
        0,
        Math.ceil((deadline - Date.now()) / 1000),
      );
      setSecondsLeft(remaining);
    };

    updateCountdown();
    const timerId = window.setInterval(updateCountdown, 250);
    return () => window.clearInterval(timerId);
  }, [source]);

  const leaveThankYouPage = useCallback(
    (target) => {
      if (isLeavingRef.current) return;
      isLeavingRef.current = true;
      clearThankYouSource();
      navigate(target, { replace: true });
    },
    [navigate],
  );

  useEffect(() => {
    if (!source || secondsLeft > 0) return;
    const redirectTimer = window.setTimeout(() => {
      leaveThankYouPage(source);
    }, 250);
    return () => window.clearTimeout(redirectTimer);
  }, [leaveThankYouPage, secondsLeft, source]);

  if (!source) {
    return <section className="min-h-[50vh] bg-white" aria-hidden="true" />;
  }

  return (
    <section className="w-full bg-white font-poppins" aria-labelledby="thank-you-heading">
      <div className="mx-auto flex w-full max-w-[960px] flex-col items-center px-4 pb-14 pt-8 text-center sm:px-6 md:pb-20 md:pt-12 lg:pt-16">
        <svg
          aria-hidden="true"
          focusable="false"
          className="h-auto w-[clamp(10.5rem,34vw,21.375rem)]"
          viewBox="0 0 342 342"
          shapeRendering="geometricPrecision"
        >
          <defs>
            <linearGradient id="thank-you-badge-fill" x1="0" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#16A34A" />
            </linearGradient>
          </defs>
          <circle
            className="thank-you-ring"
            cx="171"
            cy="171"
            r="150"
            fill="none"
            stroke="#22C55E"
            strokeWidth="10"
          />
          <circle cx="171" cy="171" r="128" fill="url(#thank-you-badge-fill)" />
          <path
            d="M104 172 L147 215 L238 124"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="30"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <h1
          id="thank-you-heading"
          className="mt-6 text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-[1.05] text-[#E76D21] sm:mt-8"
        >
          Thank You!
        </h1>

        <p className="mt-3 text-[clamp(1.25rem,3vw,1.75rem)] font-semibold leading-snug text-black sm:mt-4">
          for choosing Academy of Internal Audit!
        </p>

        <p className="mx-auto mt-5 max-w-[720px] text-base leading-7 text-[#373839] sm:mt-6 sm:text-[17px] sm:leading-8">
          We appreciate your interest in our professional certification courses.
          Our team will get in touch with you shortly to assist you with the next
          steps.
        </p>

        <div
          className="my-7 h-[2px] w-[clamp(12rem,32vw,20.5rem)] bg-[#E76D21] sm:my-8"
          aria-hidden="true"
        />

        <p className="text-[18px] font-bold leading-7 text-black">
          Need immediate assistance?
        </p>

        <div className="mt-2 flex max-w-[760px] flex-wrap items-center justify-center gap-x-3 gap-y-2 text-base text-black sm:text-[18px]">
          <span>Feel free to connect with our team directly:</span>
          <a
            href="tel:+919311320114"
            className="inline-flex items-center gap-1.5 font-medium underline-offset-4 transition-colors hover:text-[#E76D21] hover:underline focus-visible:text-[#E76D21] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E76D21]"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            +91-9311320114
          </a>
          <a
            href="tel:+918796321764"
            className="inline-flex items-center gap-1.5 font-medium underline-offset-4 transition-colors hover:text-[#E76D21] hover:underline focus-visible:text-[#E76D21] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E76D21]"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            +91-8796321764
          </a>
        </div>

        <button
          type="button"
          onClick={() => leaveThankYouPage(source)}
          className="mt-8 inline-flex min-h-[56px] w-full max-w-[307px] cursor-pointer items-center justify-center border-0 bg-[#E76D21] px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-[#CF5F1A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E76D21] sm:min-h-[74px] sm:text-xl"
        >
          Return to Previous Page
        </button>

        <p className="mt-5 text-sm text-[#373839] sm:text-base">
          You will be automatically redirected to your previous page in{' '}
          <span className="tabular-nums">{formatCountdown(secondsLeft)}</span>{' '}
          minutes.
        </p>
      </div>
    </section>
  );
};

export default ThankYou;
