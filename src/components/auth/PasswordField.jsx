import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import FormField from "@/components/auth/FormField";

/** Ô mật khẩu có nút ẩn/hiện. Trạng thái hiển thị chỉ là state cục bộ. */
export default function PasswordField(props) {
  const [visible, setVisible] = useState(false);
  const Icon = visible ? EyeOff : Eye;

  return (
    <FormField
      {...props}
      type={visible ? "text" : "password"}
      endSlot={
        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          aria-label={visible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-lg text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-primary"
        >
          <Icon className="size-5" aria-hidden="true" />
        </button>
      }
    />
  );
}
