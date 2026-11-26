import { Outlet } from "react-router-dom";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

/**
 * Khung cho các trang công khai: Header + nội dung (Outlet) + Footer.
 * Khu vực học viên sẽ dùng MainLayout riêng (Sidebar/Topbar) ở bước Dashboard.
 */
export default function PublicLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Header />

            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}