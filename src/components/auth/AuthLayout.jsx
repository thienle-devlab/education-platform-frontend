
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function AuthLayout({ title, description, children, footer }) {
    return (
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 px-4 py-10 sm:px-6">
            <div className="w-full max-w-md">
                <Link
                    to="/"
                    className="mb-8 flex items-center justify-center gap-2"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <BookOpen size={22} />
                    </span>

                    <span className="text-xl font-bold tracking-tight text-slate-900">
                        Edu<span className="text-blue-600">Platform</span>
                    </span>
                </Link>

                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            {title}
                        </h1>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            {description}
                        </p>
                    </div>

                    {children}

                    {footer && (
                        <div className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-600">
                            {footer}
                        </div>
                    )}
                </section>

                <p className="mt-6 text-center text-xs text-slate-400">
                    © {new Date().getFullYear()} EduPlatform
                </p>
            </div>
        </main>
    );
}
