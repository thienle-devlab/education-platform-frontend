import { Link } from "react-router-dom";
import { ArrowLeft, Headphones, Mic, BookOpen, PenLine, Route, Sparkles, Target } from "lucide-react";

import Logo from "@/components/common/Logo";

const highlights = [
  {
    icon: Route,
    title: "Lộ trình rõ ràng",
    text: "Học theo từng khóa, từng chương và từng bài học có thứ tự.",
  },
  {
    icon: Target,
    title: "Luyện tập đúng trọng tâm",
    text: "Bài tập cho cả 4 kỹ năng, chấm điểm và nhận phản hồi sau khi nộp.",
  },
  {
    icon: Sparkles,
    title: "Theo dõi tiến độ",
    text: "Biết mình đã học đến đâu và nên học gì tiếp theo.",
  },
];

const skills = [
  { icon: Headphones, label: "Listening" },
  { icon: Mic, label: "Speaking" },
  { icon: BookOpen, label: "Reading" },
  { icon: PenLine, label: "Writing" },
];

/**
 * Khung chung cho trang đăng nhập / đăng ký.
 * Bố cục theo Claude Artifact: nền #ECEBF5, hai khối bo 24px, khối tối màu navy.
 * Không dùng Sidebar của khu vực học viên.
 */
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-background p-3 sm:p-5">
      <div className="mx-auto grid max-w-[1320px] gap-5 lg:min-h-[calc(100vh-2.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* Khối giới thiệu — ẩn trên mobile */}
        <aside className="relative hidden flex-col justify-between overflow-hidden rounded-2xl bg-foreground p-10 text-white lg:flex xl:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-primary/50 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full bg-[#C026D3]/30 blur-3xl"
          />

          <Logo className="relative" />

          <div className="relative">
            <h2 className="max-w-md text-4xl leading-tight font-extrabold text-white xl:text-[2.6rem]">
              Học tiếng Anh theo lộ trình của riêng bạn.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
              Khóa học, bài luyện tập và theo dõi tiến độ — gom về một nơi.
            </p>

            <ul className="mt-10 space-y-5">
              {highlights.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-bold text-white">{title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-white/70">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <ul className="relative flex flex-wrap gap-2">
            {skills.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/90"
              >
                <Icon className="size-3.5" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </aside>

        {/* Khối form */}
        <main className="flex flex-col rounded-2xl bg-card p-5 sm:p-10">
          <div className="flex items-center justify-between">
            <Logo className="lg:invisible" />
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-lg text-sm font-semibold text-(--text) outline-none transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Về trang chủ
            </Link>
          </div>

          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
