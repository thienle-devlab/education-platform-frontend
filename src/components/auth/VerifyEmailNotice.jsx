import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MailCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { resendVerification } from "@/services/authService";
import { parseApiError } from "@/services/apiError";

const RESEND_COOLDOWN_SECONDS = 60;

/**
 * Hiển thị sau khi đăng ký thành công: tài khoản ở trạng thái PENDING,
 * người dùng phải bấm link xác thực trong email trước khi đăng nhập.
 */
export default function VerifyEmailNotice({ email }) {
  const [cooldown, setCooldown] = useState(0);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const timer = setTimeout(() => setCooldown((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  async function handleResend() {
    setSending(true);
    setFeedback({ type: "", text: "" });

    try {
      await resendVerification(email);
      setFeedback({ type: "success", text: "Đã gửi lại email xác thực." });
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (error) {
      const { message } = parseApiError(error);
      setFeedback({
        type: "error",
        text: message ?? "Không gửi lại được email. Vui lòng thử lại sau.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="text-center">
      <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
        <MailCheck className="size-8" aria-hidden="true" />
      </div>

      <h1 className="mt-6 text-2xl font-extrabold sm:text-3xl">Kiểm tra email của bạn</h1>
      <p className="mt-3 text-[15px] leading-relaxed text-(--text)">
        Chúng tôi đã gửi liên kết xác thực đến{" "}
        <strong className="break-all text-foreground">{email}</strong>. Hãy bấm vào
        liên kết đó để kích hoạt tài khoản, sau đó đăng nhập.
      </p>

      <Button
        type="button"
        onClick={handleResend}
        disabled={sending || cooldown > 0}
        variant="outline"
        className="mt-8 h-12 w-full rounded-lg border-2 text-[15px] font-bold"
      >
        {sending
          ? "Đang gửi..."
          : cooldown > 0
            ? `Gửi lại email sau ${cooldown}s`
            : "Gửi lại email xác thực"}
      </Button>

      <p
        role="status"
        className={
          feedback.type === "error"
            ? "mt-3 text-sm font-medium text-destructive"
            : "mt-3 text-sm font-medium text-success"
        }
      >
        {feedback.text}
      </p>

      <p className="mt-6 text-sm text-(--text)">
        Có mã xác thực?{" "}
        <Link to="/verify-email" className="font-bold text-primary hover:underline">
          Nhập mã
        </Link>
      </p>

      <p className="mt-2 text-sm text-(--text)">
        Đã xác thực xong?{" "}
        <Link to="/login" className="font-bold text-primary hover:underline">
          Đăng nhập
        </Link>
      </p>
    </div>
  );
}
