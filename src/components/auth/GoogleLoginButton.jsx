import { Button } from "@/components/ui/button";

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5 w-5 shrink-0">
      <path
        fill="#4285F4"
        d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.7c3.9-3.6 6-8.9 6-15Z"
      />
      <path
        fill="#34A853"
        d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.7-5.1c-1.8 1.2-4 2-6.8 2-5.2 0-9.7-3.5-11.3-8.2H5.8v5.3A20 20 0 0 0 24 44Z"
      />
      <path
        fill="#FBBC05"
        d="M12.7 27.9a12 12 0 0 1 0-7.8v-5.3H5.8a20 20 0 0 0 0 18.4l6.9-5.3Z"
      />
      <path
        fill="#EA4335"
        d="M24 11.9c3 0 5.7 1 7.8 3.1l5.8-5.8A19.5 19.5 0 0 0 24 4a20 20 0 0 0-18.2 10.8l6.9 5.3c1.6-4.7 6.1-8.2 11.3-8.2Z"
      />
    </svg>
  );
}

/**
 * Nút đăng nhập Google.
 * Auth Service chưa có endpoint OAuth (mới có entity OAuthIdentity) nên nút bị vô hiệu hoá.
 * TODO: bật lại khi Backend cung cấp endpoint Google OAuth.
 */
export default function GoogleLoginButton() {
  return (
    <div className="mt-6 space-y-5">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-semibold text-muted-foreground">HOẶC</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <Button
        type="button"
        variant="outline"
        disabled
        className="h-12 w-full gap-3 rounded-lg border-2 border-border bg-card text-[15px] font-bold text-foreground"
      >
        <GoogleIcon />
        Tiếp tục với Google
        <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
          Sắp ra mắt
        </span>
      </Button>
    </div>
  );
}
