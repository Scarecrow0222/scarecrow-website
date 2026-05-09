"use client";

import { useEffect, useState } from "react";

const FINISH_DELAY_MS = 360;

export function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let pageReady = document.readyState === "complete";
    let finished = false;
    let hideTimer: number | undefined;

    const markReady = () => {
      pageReady = true;
    };

    if (!pageReady) {
      window.addEventListener("load", markReady, { once: true });
    }

    document.fonts.ready.then(markReady).catch(markReady);

    const timer = window.setInterval(() => {
      setProgress((current) => {
        const next = pageReady
          ? Math.min(100, current + Math.max(4, Math.ceil((100 - current) * 0.32)))
          : Math.min(94, current + Math.max(1, Math.ceil((94 - current) * 0.12)));

        if (next >= 100 && !finished) {
          finished = true;
          window.clearInterval(timer);
          hideTimer = window.setTimeout(() => {
            setIsReady(true);
            window.setTimeout(() => setIsHidden(true), 520);
          }, FINISH_DELAY_MS);
        }

        return next;
      });
    }, 46);

    return () => {
      window.removeEventListener("load", markReady);
      window.clearInterval(timer);
      if (hideTimer) {
        window.clearTimeout(hideTimer);
      }
    };
  }, []);

  if (isHidden) {
    return null;
  }

  return (
    <div className={`site-loader${isReady ? " is-hidden" : ""}`} aria-hidden={isReady}>
      <div className="loader-shell" aria-live="polite">
        <div className="loader-content">
          <p className="loader-brand">Scarecrow</p>
          <div className="loader-row">
            <span className="loader-label">
              LOADING<span className="loader-dots">...</span>
            </span>
            <span className="loader-percent">{progress}%</span>
          </div>
          <div className="loader-track" aria-hidden="true">
            <span className="loader-progress" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
