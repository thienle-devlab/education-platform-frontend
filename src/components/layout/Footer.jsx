import { Link } from "react-router-dom";

import Logo from "@/components/common/Logo";

const footerLinks = [
    { label: "Khóa học", to: "/courses" },
    { label: "Luyện tập", to: "/practice" },
    { label: "Thi thử", to: "/assessment" },
];

export default function Footer() {
    return (
        <footer className="border-t border-border bg-card">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
                <div className="flex items-center gap-4">
                    <Logo />
                    <p className="max-w-xs text-sm text-muted-foreground">
                        Học tiếng Anh theo lộ trình của riêng bạn.
                    </p>
                </div>

                <nav aria-label="Liên kết chân trang">
                    <ul className="flex flex-wrap gap-x-6 gap-y-2">
                        {footerLinks.map((link) => (
                            <li key={link.to}>
                                <Link
                                    to={link.to}
                                    className="text-sm font-semibold text-(--text) transition-colors hover:text-primary"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} 4Q
                </p>
            </div>
        </footer>
    );
}