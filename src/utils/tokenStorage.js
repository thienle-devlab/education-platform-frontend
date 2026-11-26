/**
 * Lưu token sau khi đăng nhập.
 * - "Ghi nhớ đăng nhập" bật  → localStorage   (giữ sau khi đóng trình duyệt)
 * - "Ghi nhớ đăng nhập" tắt → sessionStorage (mất khi đóng tab)
 *
 * Lưu ý: Backend đang trả token trong body (không dùng cookie HttpOnly),
 * nên token nằm trong Web Storage. Tuyệt đối không log token ra console.
 */
const ACCESS_KEY = "4q_access_token";
const REFRESH_KEY = "4q_refresh_token";

export function saveTokens({ accessToken, refreshToken }, remember) {
  clearTokens();
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(ACCESS_KEY, accessToken);
  storage.setItem(REFRESH_KEY, refreshToken);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY) ?? sessionStorage.getItem(ACCESS_KEY);
}

export function clearTokens() {
  [localStorage, sessionStorage].forEach((storage) => {
    storage.removeItem(ACCESS_KEY);
    storage.removeItem(REFRESH_KEY);
  });
}
