import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "@/components/auth/AuthLayout";
import FormField from "@/components/auth/FormField";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import PasswordField from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/button";
import { parseApiError } from "@/services/apiError";
import { login } from "@/services/authService";
import { saveTokens } from "@/utils/tokenStorage";
import { validateLogin } from "@/utils/authValidation";

/**
 * Auth Service hiện chưa map InvalidCredentials / AccountNotVerified / AccountLocked
 * sang 401/403 nên các lỗi này có thể về 500. Hàm này xử lý cả hai trường hợp.
 * TODO: rút gọn khi Backend trả đúng mã trạng thái.
 */
function getLoginErrorMessage({ status, message }) {
  if (status === 0) return message;
  if (status === 401) return "Email hoặc mật khẩu không đúng.";
  if (status === 403 && message) return message;
  if (status >= 500) {
    return "Đăng nhập không thành công. Hãy kiểm tra email, mật khẩu và chắc chắn rằng bạn đã xác thực email.";
  }
  return message ?? "Đăng nhập không thành công. Vui lòng thử lại.";
}

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "", rememberMe: false });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
    setFormError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateLogin(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setFormError("");

    try {
      const result = await login({
        email: form.email.trim(),
        password: form.password,
        rememberMe: form.rememberMe,
      });

      saveTokens(result, form.rememberMe);
      // TODO: /dashboard hiện là trang tạm; chưa có Protected Route.
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setFormError(getLoginErrorMessage(parseApiError(error)));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout>
      <h1 className="text-3xl font-extrabold sm:text-4xl">Chào mừng trở lại</h1>
      <p className="mt-2 text-[15px] text-(--text)">
        Đăng nhập để tiếp tục việc học của bạn.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        {formError && (
          <div
            role="alert"
            className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
          >
            {formError}
          </div>
        )}

        <FormField
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="ban@example.com"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        <PasswordField
          id="password"
          name="password"
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          labelExtra={
            // TODO: Backend chưa có endpoint quên mật khẩu.
            <span className="text-xs font-medium text-muted-foreground">
              Quên mật khẩu? Sắp ra mắt
            </span>
          }
        />

        <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-(--text)">
          <input
            type="checkbox"
            name="rememberMe"
            checked={form.rememberMe}
            onChange={handleChange}
            className="size-4 rounded accent-primary"
          />
          Ghi nhớ đăng nhập
        </label>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded-lg text-[15px] font-bold hover:bg-(--primary-hover)"
        >
          {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
      </form>

      <GoogleLoginButton />

      <p className="mt-8 text-center text-sm text-(--text)">
        Chưa có tài khoản?{" "}
        <Link to="/register" className="font-bold text-primary hover:underline">
          Đăng ký ngay
        </Link>
      </p>
    </AuthLayout>
  );
}
