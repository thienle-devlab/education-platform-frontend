import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CircleCheck, CircleX, LoaderCircle } from "lucide-react";

import AuthLayout from "@/components/auth/AuthLayout";
import FormField from "@/components/auth/FormField";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { parseApiError } from "@/services/apiError";
import { verifyEmail } from "@/services/authService";
import { extractVerificationToken } from "@/utils/authValidation";

/**
 * Backend (AuthService.verifyEmail) ném IllegalArgumentException với các message:
 *   "Invalid verification token" | "Verification token has expired".
 * Lưu ý: GlobalExceptionHandler của auth-service đang trả HTTP 502 cho loại lỗi này
 * (body vẫn ghi status 400), nên không dựa vào mã trạng thái mà dựa vào message.
 */
function getVerifyErrorMessage({ status, message }) {
    if (status === 0) return message;
    if (/expired/i.test(message ?? "")) return "Mã xác thực đã hết hạn.";
    if (/invalid/i.test(message ?? "")) {
        return "Mã xác thực không hợp lệ hoặc đã được sử dụng.";
    }
    return message ?? "Xác thực không thành công. Vui lòng thử lại.";
}

async function requestVerification(token) {
    try {
        await verifyEmail(token);
        return { ok: true, message: "" };
    } catch (error) {
        return { ok: false, message: getVerifyErrorMessage(parseApiError(error)) };
    }
}

/**
 * Trang xác thực email — hai cách vào trang:
 *  1. Link có sẵn token: /verify-email?token=...  → tự xác thực (dùng khi đã gửi mail thật).
 *  2. Mở /verify-email rồi tự nhập/dán token      → dùng khi chưa có mail thật (môi trường dev).
 *
 * Khi liên kết mail thật, chỉ cần Backend đổi đường link trong email thành
 * <FRONTEND_URL>/verify-email?token=... (đã có sẵn cấu hình app.verification-url).
 */
export default function VerifyEmailPage() {
    const [searchParams] = useSearchParams();
    const urlToken = extractVerificationToken(searchParams.get("token") ?? "");

    const [status, setStatus] = useState(urlToken ? "verifying" : "idle");
    const [message, setMessage] = useState("");
    const [tokenInput, setTokenInput] = useState("");
    const [inputError, setInputError] = useState("");

    // Token trong link chỉ dùng được một lần: chặn gọi lặp (kể cả StrictMode khi chạy dev)
    const hasAutoVerified = useRef(false);

    useEffect(() => {
        if (!urlToken || hasAutoVerified.current) return;
        hasAutoVerified.current = true;

        requestVerification(urlToken).then((result) => {
            setMessage(result.message);
            setStatus(result.ok ? "success" : "error");
        });
    }, [urlToken]);

    async function handleSubmit(event) {
        event.preventDefault();

        const token = extractVerificationToken(tokenInput);
        if (!token) {
            setInputError("Vui lòng nhập mã xác thực.");
            return;
        }

        setInputError("");
        setStatus("verifying");

        const result = await requestVerification(token);
        setMessage(result.message);
        setStatus(result.ok ? "success" : "error");
    }

    if (status === "verifying") {
        return (
            <AuthLayout>
                <div role="status" className="text-center">
                    <LoaderCircle
                        className="mx-auto size-12 animate-spin text-primary"
                        aria-hidden="true"
                    />
                    <h1 className="mt-6 text-2xl font-extrabold sm:text-3xl">
                        Đang xác thực...
                    </h1>
                    <p className="mt-3 text-[15px] text-(--text)">Vui lòng đợi trong giây lát.</p>
                </div>
            </AuthLayout>
        );
    }

    if (status === "success") {
        return (
            <AuthLayout>
                <div role="status" className="text-center">
                    <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-success/10 text-success">
                        <CircleCheck className="size-8" aria-hidden="true" />
                    </div>
                    <h1 className="mt-6 text-2xl font-extrabold sm:text-3xl">
                        Xác thực thành công
                    </h1>
                    <p className="mt-3 text-[15px] leading-relaxed text-(--text)">
                        Tài khoản của bạn đã được kích hoạt. Bạn có thể đăng nhập ngay bây giờ.
                    </p>
                    <Link
                        to="/login"
                        className={cn(
                            buttonVariants({ variant: "default" }),
                            "mt-8 h-12 w-full rounded-lg text-[15px] font-bold hover:bg-(--primary-hover)"
                        )}
                    >
                        Đăng nhập
                    </Link>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout>
            <h1 className="text-3xl font-extrabold sm:text-4xl">Xác thực email</h1>
            <p className="mt-2 text-[15px] text-(--text)">
                Nhập mã xác thực để kích hoạt tài khoản của bạn.
            </p>

            {status === "error" && (
                <div
                    role="alert"
                    className="mt-6 flex items-start gap-3 rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
                >
                    <CircleX className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    {message}
                </div>
            )}

            {/* TODO: xóa khối này khi Backend gửi email thật (người dùng sẽ bấm link trong mail). */}
            {import.meta.env.DEV && (
                <div className="mt-6 rounded-xl bg-secondary p-4 text-sm leading-relaxed text-(--text)">
                    <p className="font-bold text-foreground">Môi trường phát triển</p>
                    <p className="mt-1">
                        Hệ thống chưa gửi email thật. Lấy mã trong log của auth-service (dòng{" "}
                        <code className="rounded bg-card px-1 py-0.5 text-xs">
                            Verification link for ...
                        </code>
                        ), rồi dán mã hoặc cả đường link vào ô bên dưới.
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                <FormField
                    id="token"
                    name="token"
                    label="Mã xác thực"
                    placeholder="Dán mã hoặc đường link xác thực"
                    autoComplete="off"
                    spellCheck={false}
                    value={tokenInput}
                    onChange={(event) => {
                        setTokenInput(event.target.value);
                        setInputError("");
                    }}
                    error={inputError}
                />

                <Button
                    type="submit"
                    className="h-12 w-full rounded-lg text-[15px] font-bold hover:bg-(--primary-hover)"
                >
                    Xác thực
                </Button>
            </form>

            <p className="mt-8 text-center text-sm text-(--text)">
                <Link to="/login" className="font-bold text-primary hover:underline">
                    Quay lại đăng nhập
                </Link>
            </p>
        </AuthLayout>
    );
}