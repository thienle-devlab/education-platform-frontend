import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * Ô nhập liệu có nhãn, gợi ý và thông báo lỗi — dùng chung cho các form xác thực.
 * Kiểu ô nhập theo Claude Artifact: cao 48px, viền 2px, bo 14px.
 */
export default function FormField({
  id,
  label,
  error,
  hint,
  labelExtra,
  endSlot,
  className,
  ...inputProps
}) {
  const messageId = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-foreground">
          {label}
        </label>
        {labelExtra}
      </div>

      <div className="relative">
        <Input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={messageId}
          className={cn(
            "h-12 rounded-lg border-2 border-border bg-card px-3.5 text-[15px] text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20",
            endSlot && "pr-12",
            className,
          )}
          {...inputProps}
        />
        {endSlot}
      </div>

      {error ? (
        <p id={messageId} role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={messageId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
