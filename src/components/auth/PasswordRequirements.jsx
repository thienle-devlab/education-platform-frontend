import { Check, Circle } from "lucide-react";

import { PASSWORD_RULES } from "@/utils/authValidation";
import { cn } from "@/lib/utils";

/** Checklist yêu cầu mật khẩu — cập nhật theo từng ký tự người dùng gõ. */
export default function PasswordRequirements({ password }) {
  return (
    <ul
      aria-label="Yêu cầu mật khẩu"
      className="grid gap-x-4 gap-y-1.5 rounded-xl bg-secondary p-4 sm:grid-cols-2"
    >
      {PASSWORD_RULES.map((rule) => {
        const passed = rule.test(password);
        const Icon = passed ? Check : Circle;

        return (
          <li
            key={rule.id}
            className={cn(
              "flex items-center gap-2 text-xs font-medium",
              passed ? "text-success" : "text-muted-foreground",
            )}
          >
            <Icon className="size-3.5 shrink-0" aria-hidden="true" />
            {rule.label}
            <span className="sr-only">{passed ? " - đã đạt" : " - chưa đạt"}</span>
          </li>
        );
      })}
    </ul>
  );
}
