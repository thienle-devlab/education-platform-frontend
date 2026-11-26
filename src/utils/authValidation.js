/**
 * Quy tắc kiểm tra form đăng nhập/đăng ký — khớp với validation của Backend
 * (LoginRequest, RegisterRequest). Backend vẫn là nơi quyết định cuối cùng.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[0-9]{10,15}$/;

// Backend chỉ chấp nhận chữ, số và các ký tự đặc biệt @$!%*?&
const PASSWORD_ALLOWED_PATTERN = /^[A-Za-z\d@$!%*?&]+$/;

export const PASSWORD_RULES = [
  { id: "length", label: "Từ 8 đến 100 ký tự", test: (v) => v.length >= 8 && v.length <= 100 },
  { id: "upper", label: "Có chữ in hoa (A-Z)", test: (v) => /[A-Z]/.test(v) },
  { id: "lower", label: "Có chữ thường (a-z)", test: (v) => /[a-z]/.test(v) },
  { id: "digit", label: "Có chữ số (0-9)", test: (v) => /\d/.test(v) },
  { id: "special", label: "Có ký tự đặc biệt @$!%*?&", test: (v) => /[@$!%*?&]/.test(v) },
  {
    id: "allowed",
    label: "Chỉ gồm chữ, số và @$!%*?&",
    test: (v) => v.length > 0 && PASSWORD_ALLOWED_PATTERN.test(v),
  },
];

export function isPasswordValid(password) {
  return PASSWORD_RULES.every((rule) => rule.test(password));
}

function validateEmail(email) {
  const value = email.trim();
  if (!value) return "Vui lòng nhập email.";
  if (value.length > 255) return "Email không được quá 255 ký tự.";
  if (!EMAIL_PATTERN.test(value)) return "Email không hợp lệ.";
  return "";
}

export function validateLogin({ email, password }) {
  const errors = {};

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  if (!password) errors.password = "Vui lòng nhập mật khẩu.";

  return errors;
}

export function validateRegister({
  fullName,
  phoneNumber,
  email,
  password,
  confirmPassword,
}) {
  const errors = {};

  const name = fullName.trim();
  if (!name) errors.fullName = "Vui lòng nhập họ và tên.";
  else if (name.length < 2) errors.fullName = "Họ và tên cần ít nhất 2 ký tự.";
  else if (name.length > 255) errors.fullName = "Họ và tên không được quá 255 ký tự.";

  const phone = phoneNumber.trim();
  if (!phone) errors.phoneNumber = "Vui lòng nhập số điện thoại.";
  else if (!PHONE_PATTERN.test(phone))
    errors.phoneNumber = "Số điện thoại gồm 10-15 chữ số, có thể bắt đầu bằng +.";

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  if (!password) errors.password = "Vui lòng nhập mật khẩu.";
  else if (!isPasswordValid(password))
    errors.password = "Mật khẩu chưa đáp ứng đủ các yêu cầu bên dưới.";

  if (!confirmPassword) errors.confirmPassword = "Vui lòng xác nhận mật khẩu.";
  else if (confirmPassword !== password)
    errors.confirmPassword = "Mật khẩu xác nhận không khớp.";

  return errors;
}

/**
 * Cho phép người dùng dán cả đường link xác thực (…/verify-email?token=abc)
 * hoặc chỉ dán mã token. Trả về chuỗi token đã cắt khoảng trắng.
 */
export function extractVerificationToken(input) {
  const value = input.trim();
  if (!value) return "";

  try {
    const token = new URL(value).searchParams.get("token");
    if (token) return token.trim();
  } catch {
    // Không phải URL → coi như người dùng dán trực tiếp mã token
  }

  return value;
}
