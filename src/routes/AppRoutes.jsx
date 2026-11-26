import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "@/layouts/PublicLayout";
import HomePage from "@/pages/home/HomePage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import CoursesPage from "@/pages/courses/CoursesPage";
import VerifyEmailPage from "@/pages/auth/VerifyEmailPage";

function ComingSoonPage({ title }) {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-foreground">{title}</h1>
            <p className="mt-3 text-(--text)">
                Trang này sẽ được phát triển trong các bước tiếp theo.
            </p>
        </section>
    );
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Trang xác thực không dùng Header/Footer */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />

                {/* Các trang công khai dùng chung Header và Footer */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/courses" element={<CoursesPage />} />

                    {/* TODO: trang chi tiết khóa học (GET /api/courses/slug/{slug}) */}
                    <Route
                        path="/courses/:slug"
                        element={<ComingSoonPage title="Chi tiết khóa học" />}
                    />

                    <Route
                        path="/practice"
                        element={<ComingSoonPage title="Luyện tập" />}
                    />

                    <Route
                        path="/assessment"
                        element={<ComingSoonPage title="Thi thử" />}
                    />

                    {/* TODO: thay bằng DashboardPage + MainLayout khu vực học viên (có Protected Route). */}
                    <Route
                        path="/dashboard"
                        element={<ComingSoonPage title="Dashboard" />}
                    />
                </Route>

                {/* URL không tồn tại */}
                <Route
                    path="*"
                    element={<ComingSoonPage title="Không tìm thấy trang" />}
                />
            </Routes>
        </BrowserRouter>
    );
}