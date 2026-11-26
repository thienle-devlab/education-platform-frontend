import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import Logo from "@/components/common/Logo";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button-variants";

const navItems = [
    { label: "Trang chủ", to: "/" },
    { label: "Khóa học", to: "/courses" },
    { label: "Luyện tập", to: "/practice" },
    { label: "Thi thử", to: "/assessment" },
];

const primaryButtonHover = "hover:bg-(--primary-hover)";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    const getLinkClass = ({ isActive }) =>
        cn(
            "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
            isActive
                ? "bg-primary/10 text-primary"
                : "text-(--text) hover:bg-secondary hover:text-foreground"
        );

    const loginClass = cn(
        buttonVariants({ variant: "ghost" }),
        "h-10 rounded-lg px-4 font-semibold"
    );

    const registerClass = cn(
        buttonVariants({ variant: "default" }),
        "h-10 rounded-lg px-4 font-bold",
        primaryButtonHover
    );

    const mobileLoginClass = cn(
        buttonVariants({ variant: "outline" }),
        "h-11 w-full rounded-lg border-2 font-semibold"
    );

    const mobileRegisterClass = cn(
        buttonVariants({ variant: "default" }),
        "h-11 w-full rounded-lg font-bold",
        primaryButtonHover
    );

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Logo onClick={closeMenu} className="shrink-0" />

                {/* Desktop navigation */}
                <nav
                    aria-label="Điều hướng chính"
                    className="hidden items-center gap-2 md:flex"
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
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
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
                    className="border-t border-border bg-card px-4 py-4 md:hidden"
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
                                    cn(
                                        "rounded-lg px-3 py-3 text-sm font-semibold",
                                        isActive
                                            ? "bg-primary/10 text-primary"
                                            : "text-(--text) hover:bg-secondary"
                                    )
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}

                        <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
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