
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/home/HomePage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";

function ComingSoonPage({ title }) {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
            <p className="mt-3 text-slate-600">
                Trang này sẽ được phát triển trong các bước tiếp theo.
            </p>
        </section>
    );
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Trang xác thực không dùng MainLayout */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* Các trang dùng chung Header và Footer */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />

                    <Route
                        path="/courses"
                        element={<ComingSoonPage title="Khóa học" />}
                    />

                    <Route
                        path="/practice"
                        element={<ComingSoonPage title="Luyện tập" />}
                    />

                    <Route
                        path="/assessment"
                        element={<ComingSoonPage title="Thi thử" />}
                    />

                    <Route
                        path="/login"
                        element={<ComingSoonPage title="Đăng nhập" />}
                    />

                    <Route
                        path="/register"
                        element={<ComingSoonPage title="Đăng ký" />}
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
