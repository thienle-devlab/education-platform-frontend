import { useId } from "react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

/**
 * Logo 4Q — lấy từ Claude Artifact (Learning Hub).
 * Dùng useId để gradient không trùng id khi có nhiều logo trên cùng một trang.
 */
export default function Logo({ className, to = "/", ...props }) {
  const gradientId = useId();

  return (
    <Link
      to={to}
      aria-label="4Q - Trang chủ"
      className={cn(
        "inline-flex rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
      {...props}
    >
      <svg
        width="52"
        height="38"
        viewBox="0 0 52 38"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5B3FF5" />
            <stop offset=".6" stopColor="#8F5BFF" />
            <stop offset="1" stopColor="#C026D3" />
          </linearGradient>
        </defs>
        <rect width="52" height="38" rx="12" fill={`url(#${gradientId})`} />
        <g
          fill="none"
          stroke="#fff"
          strokeWidth="4.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 8L9 23h15M19 8v23" />
          <circle cx="37" cy="19" r="9" />
        </g>
        <path
          d="M38 22l7 8"
          stroke="#FFC93C"
          strokeWidth="4.6"
          strokeLinecap="round"
        />
        <circle cx="46" cy="7" r="2.2" fill="#FFE08A" />
      </svg>
    </Link>
  );
}
