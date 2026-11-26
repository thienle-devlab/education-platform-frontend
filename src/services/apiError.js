/**
 * Chuẩn hoá lỗi từ Backend (ApiResponse.error) thành object dễ dùng ở UI.
 *
 * Backend trả: { status, success:false, message, error:{ code, message, fieldErrors } }
 */
export function parseApiError(error) {
  // Không nhận được phản hồi: mất mạng, Gateway tắt, hoặc bị CORS chặn
  if (!error?.response) {
    return {
      status: 0,
      code: "NETWORK_ERROR",
      message:
        "Không kết nối được máy chủ. Vui lòng kiểm tra mạng và thử lại.",
      fieldErrors: {},
    };
  }

  const { status, data } = error.response;

  return {
    status,
    code: data?.error?.code ?? null,
    message: data?.message ?? data?.error?.message ?? null,
    fieldErrors: data?.error?.fieldErrors ?? {},
  };
}
