
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { buttonVariants } from "../ui/button-variants";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Trang chủ", to: "/" },
    { label: "Khóa học", to: "/courses" },
    { label: "Luyện tập", to: "/practice" },
    { label: "Thi thử", to: "/assessment" },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    const getLinkClass = ({ isActive }) =>
        `text-sm font-medium transition-colors ${isActive
            ? "text-blue-600"
            : "text-slate-600 hover:text-blue-600"
        }`;

    const loginClass = cn(
        buttonVariants({ variant: "ghost" }),
        "h-10 px-4"
    );

    const registerClass = cn(
        buttonVariants({ variant: "default" }),
        "h-10 px-4"
    );

    const mobileLoginClass = cn(
        buttonVariants({ variant: "outline" }),
        "h-10 w-full"
    );

    const mobileRegisterClass = cn(
        buttonVariants({ variant: "default" }),
        "h-10 w-full"
    );

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link
                    to="/"
                    onClick={closeMenu}
                    className="flex shrink-0 items-center gap-2"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <BookOpen size={20} />
                    </span>

                    <span className="text-lg font-bold tracking-tight text-slate-900">
                        Edu<span className="text-blue-600">Platform</span>
                    </span>
                </Link>

                {/* Desktop navigation */}
                <nav
                    aria-label="Điều hướng chính"
                    className="hidden items-center gap-8 md:flex"
                >
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to === "/"}
                            className={getLinkClass}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Desktop actions */}
                <div className="hidden items-center gap-3 md:flex">
                    <Link to="/login" className={loginClass}>
                        Đăng nhập
                    </Link>

                    <Link to="/register" className={registerClass}>
                        Bắt đầu học
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 md:hidden"
                    aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation"
                    onClick={() => setIsMenuOpen((previous) => !previous)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile navigation */}
            {isMenuOpen && (
                <div
                    id="mobile-navigation"
                    className="border-t border-slate-200 bg-white px-4 py-4 md:hidden"
                >
                    <nav
                        aria-label="Điều hướng trên thiết bị di động"
                        className="flex flex-col gap-1"
                    >
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.to === "/"}
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `rounded-lg px-3 py-3 text-sm font-medium ${isActive
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-slate-700 hover:bg-slate-50"
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}

                        <div className="mt-3 flex flex-col gap-2 border-t border-slate-200 pt-4">
                            <Link
                                to="/login"
                                onClick={closeMenu}
                                className={mobileLoginClass}
                            >
                                Đăng nhập
                            </Link>

                            <Link
                                to="/register"
                                onClick={closeMenu}
                                className={mobileRegisterClass}
                            >
                                Bắt đầu học
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
