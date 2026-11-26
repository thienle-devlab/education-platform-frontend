import { useState } from "react";
import { Link } from "react-router-dom";

import AuthLayout from "@/components/auth/AuthLayout";
import FormField from "@/components/auth/FormField";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import PasswordField from "@/components/auth/PasswordField";
import PasswordRequirements from "@/components/auth/PasswordRequirements";
import VerifyEmailNotice from "@/components/auth/VerifyEmailNotice";
import { Button } from "@/components/ui/button";
import { parseApiError } from "@/services/apiError";
import { register } from "@/services/authService";
import { validateRegister } from "@/utils/authValidation";

const INITIAL_FORM = {
  fullName: "",
  phoneNumber: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
    setFormError("");
  }

  function applyServerError({ status, code, message, fieldErrors }) {
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
    } else if (status === 409) {
      setErrors({ email: "Email này đã được đăng ký." });
    } else if (code === "PASSWORD_MISMATCH") {
      setErrors({ confirmPassword: "Mật khẩu xác nhận không khớp." });
    } else {
      setFormError(message ?? "Đăng ký không thành công. Vui lòng thử lại.");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateRegister(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setFormError("");

    try {
      const result = await register({
        fullName: form.fullName.trim(),
        phoneNumber: form.phoneNumber.trim(),
        email: form.email.trim(),
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      setRegisteredEmail(result?.email ?? form.email.trim());
    } catch (error) {
      applyServerError(parseApiError(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (registeredEmail) {
    return (
      <AuthLayout>
        <VerifyEmailNotice email={registeredEmail} />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <h1 className="text-3xl font-extrabold sm:text-4xl">Tạo tài khoản</h1>
      <p className="mt-2 text-[15px] text-(--text)">
        Bắt đầu hành trình học tiếng Anh cùng 4Q.
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
          id="fullName"
          name="fullName"
          label="Họ và tên"
          placeholder="Nguyễn Văn A"
          autoComplete="name"
          value={form.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            inputMode="tel"
            label="Số điện thoại"
            placeholder="0901234567"
            autoComplete="tel"
            value={form.phoneNumber}
            onChange={handleChange}
            error={errors.phoneNumber}
          />
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
        </div>

        <PasswordField
          id="password"
          name="password"
          label="Mật khẩu"
          placeholder="Tạo mật khẩu"
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        <PasswordRequirements password={form.password} />

        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          placeholder="Nhập lại mật khẩu"
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded-lg text-[15px] font-bold hover:bg-(--primary-hover)"
        >
          {isSubmitting ? "Đang tạo tài khoản..." : "Đăng ký"}
        </Button>
      </form>

      <GoogleLoginButton />

      <p className="mt-8 text-center text-sm text-(--text)">
        Đã có tài khoản?{" "}
        <Link to="/login" className="font-bold text-primary hover:underline">
          Đăng nhập
        </Link>
      </p>
    </AuthLayout>
  );
}
