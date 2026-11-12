
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

import AuthLayout from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";

export default function RegisterPage() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
            confirmPassword: name === "password" ? "" : previous.confirmPassword,
            form: "",
        }));
    }

    function validateForm() {
        const nextErrors = {};

        if (!form.fullName.trim()) {
            nextErrors.fullName = "Vui lòng nhập họ và tên.";
        }

        if (!form.email.trim()) {
            nextErrors.email = "Vui lòng nhập email.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            nextErrors.email = "Email không đúng định dạng.";
        }

        if (!form.password) {
            nextErrors.password = "Vui lòng nhập mật khẩu.";
        } else if (form.password.length < 8) {
            nextErrors.password = "Mật khẩu cần có ít nhất 8 ký tự.";
        }

        if (!form.confirmPassword) {
            nextErrors.confirmPassword = "Vui lòng xác nhận mật khẩu.";
        } else if (form.password !== form.confirmPassword) {
            nextErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
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
            console.log("Register form:", {
                fullName: form.fullName.trim(),
                email: form.email.trim(),
                password: form.password,
            });

            setErrors({
                form: "Form hợp lệ. Chưa kết nối API đăng ký.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <AuthLayout
            title="Tạo tài khoản"
            description="Đăng ký để bắt đầu xây dựng lộ trình học tiếng Anh của riêng bạn."
            footer={
                <>
                    Đã có tài khoản?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                        Đăng nhập
                    </Link>
                </>
            }
        >
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="space-y-2">
                    <label
                        htmlFor="fullName"
                        className="text-sm font-medium text-slate-700"
                    >
                        Họ và tên
                    </label>

                    <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        placeholder="Nguyễn Văn A"
                        value={form.fullName}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.fullName)}
                        className="h-11"
                    />

                    {errors.fullName && (
                        <p className="text-sm text-red-600">{errors.fullName}</p>
                    )}
                </div>

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
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-slate-700"
                    >
                        Mật khẩu
                    </label>

                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="Tối thiểu 8 ký tự"
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

                <div className="space-y-2">
                    <label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium text-slate-700"
                    >
                        Xác nhận mật khẩu
                    </label>

                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="Nhập lại mật khẩu"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            aria-invalid={Boolean(errors.confirmPassword)}
                            className="h-11 pr-11"
                        />

                        <button
                            type="button"
                            aria-label={
                                showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                            }
                            onClick={() =>
                                setShowConfirmPassword((previous) => !previous)
                            }
                            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-500 hover:text-slate-800"
                        >
                            {showConfirmPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>

                    {errors.confirmPassword && (
                        <p className="text-sm text-red-600">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                {errors.form && (
                    <p role="status" className="text-sm text-blue-700">
                        {errors.form}
                    </p>
                )}

                <Button type="submit" className="h-11 w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Đang xử lý..." : "Tạo tài khoản"}
                </Button>
            </form>

            <GoogleLoginButton />


            <p className="mt-5 text-center text-xs leading-5 text-slate-500">
                Bằng việc đăng ký, bạn đồng ý tuân thủ các điều khoản sử dụng của
                nền tảng.
            </p>
        </AuthLayout>
    );
}
