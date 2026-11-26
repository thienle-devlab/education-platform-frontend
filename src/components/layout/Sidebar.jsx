
import {
    LayoutDashboard,
    Users,
    BookOpen,
    PencilLine,
    ClipboardCheck,
    Award,
    MessageSquare,
    UsersRound,
    Settings,
    CircleHelp,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

const mainNavItems = [
    {
        label: "Dashboard",
        to: "/dashboard",
        icon: LayoutDashboard,
        end: true,
    },
    {
        label: "Lớp học",
        to: "/dashboard/classes",
        icon: Users,
    },
    {
        label: "Khóa học",
        to: "/dashboard/courses",
        icon: BookOpen,
    },
    {
        label: "Luyện tập",
        to: "/dashboard/practice",
        icon: PencilLine,
    },
    {
        label: "Bài kiểm tra",
        to: "/dashboard/assessment",
        icon: ClipboardCheck,
    },
];

const secondaryNavItems = [
    {
        label: "Chứng chỉ",
        to: "/dashboard/certificates",
        icon: Award,
    },
    {
        label: "Tin nhắn",
        to: "/dashboard/messages",
        icon: MessageSquare,
    },
    {
        label: "Cộng đồng",
        to: "/dashboard/community",
        icon: UsersRound,
    },
];

const bottomNavItems = [
    {
        label: "Cài đặt",
        to: "/dashboard/settings",
        icon: Settings,
    },
    {
        label: "Trung tâm hỗ trợ",
        to: "/dashboard/help",
        icon: CircleHelp,
    },
];

function SidebarLink({ item, onClose }) {
    const Icon = item.icon;

    return (
        <NavLink
            to={item.to}
            end={item.end}
            onClick={onClose}
            className={({ isActive }) =>
                cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )
            }
        >
            <Icon size={18} strokeWidth={1.8} />
            <span>{item.label}</span>
        </NavLink>
    );
}

function SidebarGroup({ title, items, onClose }) {
    return (
        <div className="space-y-1">
            <p className="px-3 pb-2 pt-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {title}
            </p>

            {items.map((item) => (
                <SidebarLink
                    key={item.to}
                    item={item}
                    onClose={onClose}
                />
            ))}
        </div>
    );
}

export default function Sidebar({ isOpen, onClose }) {
    return (
        <aside
            className={cn(
                "fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col border-r border-border bg-sidebar px-4 py-5 transition-transform duration-300",
                isOpen ? "translate-x-0" : "-translate-x-full",
                "lg:sticky lg:top-0 lg:translate-x-0"
            )}
        >
            {/* Logo */}
            <Link
                to="/dashboard"
                onClick={onClose}
                className="mb-8 flex h-12 items-center justify-center"
            >
                <span className="text-3xl font-extrabold tracking-tight text-primary">
                    4Q
                </span>
            </Link>

            {/* Navigation */}
            <nav
                aria-label="Điều hướng khu vực học viên"
                className="flex-1 overflow-y-auto"
            >
                <SidebarGroup
                    title="Chính"
                    items={mainNavItems}
                    onClose={onClose}
                />

                <SidebarGroup
                    title="Khác"
                    items={secondaryNavItems}
                    onClose={onClose}
                />
            </nav>

            {/* Bottom navigation */}
            <div className="mt-4 border-t border-border pt-3">
                {bottomNavItems.map((item) => (
                    <SidebarLink
                        key={item.to}
                        item={item}
                        onClose={onClose}
                    />
                ))}
            </div>
        </aside>
    );
}
