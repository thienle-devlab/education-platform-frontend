
import Header from "@/components/layout/Header";
import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Header />

            {/* Page content */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="border-t border-border bg-white">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <Link
                        to="/"
                        className="text-sm font-semibold text-foreground"
                    >
                        Edu<span className="text-primary">Platform</span>
                    </Link>

                    <p className="text-sm text-muted-foreground">
                        Học tiếng Anh theo lộ trình của riêng bạn.
                    </p>

                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} EduPlatform
                    </p>
                </div>
            </footer>
        </div>
    );
}
