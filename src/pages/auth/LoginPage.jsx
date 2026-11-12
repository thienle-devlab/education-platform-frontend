
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

import AuthLayout from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";

export default function LoginPage() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: "",
            form: "",
        }));
    }

    function validateForm() {
        const nextErrors = {};

        if (!form.email.trim()) {
            nextErrors.email = "Vui lòng nhập email.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            nextErrors.email = "Email không đúng định dạng.";
        }

        if (!form.password) {
            nextErrors.password = "Vui lòng nhập mật khẩu.";
        }

        return nextErrors;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const nextErrors = validateForm();
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        // Tạm thời chỉ kiểm tra form.
        // Bước tiếp theo sẽ gọi Auth Service tại đây.
        setIsSubmitting(true);

        try {
            console.log("Login form:", {
                email: form.email.trim(),
                password: form.password,
            });

            setErrors({
                form: "Form hợp lệ. Chưa kết nối API đăng nhập.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <AuthLayout
            title="Chào mừng trở lại!"
            description="Đăng nhập để tiếp tục hành trình học tiếng Anh của bạn."
            footer={
                <>
                    Chưa có tài khoản?{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                        Đăng ký ngay
                    </Link>
                </>
            }
        >
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700">
                        Email
                    </label>

                    <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.email)}
                        className="h-11"
                    />

                    {errors.email && (
                        <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-slate-700"
                        >
                            Mật khẩu
                        </label>

                        <button
                            type="button"
                            className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            onClick={() => {
                                // Chưa triển khai luồng quên mật khẩu.
                                setErrors({
                                    form: "Chức năng quên mật khẩu sẽ được bổ sung sau.",
                                });
                            }}
                        >
                            Quên mật khẩu?
                        </button>
                    </div>

                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            placeholder="Nhập mật khẩu"
                            value={form.password}
                            onChange={handleChange}
                            aria-invalid={Boolean(errors.password)}
                            className="h-11 pr-11"
                        />

                        <button
                            type="button"
                            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                            onClick={() => setShowPassword((previous) => !previous)}
                            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-500 hover:text-slate-800"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {errors.password && (
                        <p className="text-sm text-red-600">{errors.password}</p>
                    )}
                </div>

                {errors.form && (
                    <p role="status" className="text-sm text-blue-700">
                        {errors.form}
                    </p>
                )}

                <Button type="submit" className="h-11 w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
                </Button>
            </form>

            <GoogleLoginButton />
        </AuthLayout>
    );
}
