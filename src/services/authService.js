import apiClient from "./apiClient";

/**
 * Auth Service (qua Gateway): /api/auth/**
 * Request/response lấy từ AuthController, RegisterRequest, LoginRequest, LoginResponse.
 */

/** POST /api/auth/register → ApiResponse<RegisterResponse> */
export async function register({
  fullName,
  phoneNumber,
  email,
  password,
  confirmPassword,
}) {
  const { data } = await apiClient.post("/api/auth/register", {
    fullName,
    phoneNumber,
    email,
    password,
    confirmPassword,
  });
  return data.data;
}

/** POST /api/auth/login → ApiResponse<LoginResponse> (accessToken, refreshToken, expiresIn…) */
export async function login({ email, password, rememberMe }) {
  const { data } = await apiClient.post("/api/auth/login", {
    email,
    password,
    rememberMe,
  });
  return data.data;
}

/** POST /api/auth/resend-verification?email=... */
export async function resendVerification(email) {
  const { data } = await apiClient.post("/api/auth/resend-verification", null, {
    params: { email },
  });
  return data;
}

/** GET /api/auth/verify-email?token=... → ApiResponse<Void> */
export async function verifyEmail(token) {
  const { data } = await apiClient.get("/api/auth/verify-email", {
    params: { token },
  });
  return data;
}
