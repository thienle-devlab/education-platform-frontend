
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Bell, Menu, Search } from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";

const pageTitles = {
    "/dashboard": "Dashboard",
    "/dashboard/classes": "Lớp học",
    "/dashboard/courses": "Khóa học",
    "/dashboard/practice": "Luyện tập",
    "/dashboard/assessment": "Bài kiểm tra",
    "/dashboard/certificates": "Chứng chỉ",
    "/dashboard/messages": "Tin nhắn",
    "/dashboard/community": "Cộng đồng",
    "/dashboard/settings": "Cài đặt",
    "/dashboard/help": "Trung tâm hỗ trợ",
};

export default function MainLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const currentPage =
        pageTitles[location.pathname] || "Dashboard";

    function closeSidebar() {
        setIsSidebarOpen(false);
    }

    return (
        <div className="min-h-screen bg-background text-foreground lg:flex">
            {/* Mobile sidebar overlay */}
            {isSidebarOpen && (
                <button
                    type="button"
                    aria-label="Đóng menu"
                    onClick={closeSidebar}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={closeSidebar}
            />

            {/* Main content */}
            <div className="flex min-h-screen min-w-0 flex-1 flex-col">
                {/* Topbar */}
                <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
                    <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                        {/* Left section */}
                        <div className="flex min-w-0 items-center gap-3">
                            <button
                                type="button"
                                aria-label="Mở menu"
                                aria-expanded={isSidebarOpen}
                                onClick={() => setIsSidebarOpen(true)}
                                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
                            >
                                <Menu size={21} />
                            </button>

                            <div className="min-w-0 text-sm">
                                <div className="flex items-center gap-2">
                                    <Link
                                        to="/"
                                        className="hidden text-muted-foreground transition-colors hover:text-primary sm:inline"
                                    >
                                        Trang chủ
                                    </Link>

                                    <span className="hidden text-muted-foreground sm:inline">
                                        /
                                    </span>

                                    <span className="truncate font-semibold text-foreground">
                                        {currentPage}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right section */}
                        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                            {/* Search */}
                            <div className="relative hidden w-full max-w-xs md:block">
                                <Search
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                />

                                <input
                                    type="search"
                                    placeholder="Tìm khóa học, bài học..."
                                    className={cn(
                                        "h-10 w-full rounded-full border border-border bg-background pl-10 pr-4 text-sm text-foreground outline-none transition-colors",
                                        "placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
                                    )}
                                />
                            </div>

                            {/* Notifications */}
                            <button
                                type="button"
                                aria-label="Thông báo"
                                className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                            >
                                <Bell size={19} />

                                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive ring-2 ring-card" />
                            </button>

                            {/* User avatar - placeholder */}
                            <button
                                type="button"
                                aria-label="Tài khoản học viên"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
                            >
                                MA
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
