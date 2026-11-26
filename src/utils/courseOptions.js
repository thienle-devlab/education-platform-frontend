import { BookOpen, Headphones, Mic, PenLine } from "lucide-react";

/**
 * Giá trị enum khớp với Backend: SkillType, CourseLevel (course-service).
 * "Tất cả" dùng value rỗng để không gửi tham số lọc lên API.
 */
export const ALL_OPTION = { value: "", label: "Tất cả" };

export const SKILL_OPTIONS = [
    { value: "LISTENING", label: "Listening", icon: Headphones, tone: "bg-chart-3/10 text-chart-3" },
    { value: "SPEAKING", label: "Speaking", icon: Mic, tone: "bg-success/10 text-success" },
    { value: "READING", label: "Reading", icon: BookOpen, tone: "bg-primary/10 text-primary" },
    { value: "WRITING", label: "Writing", icon: PenLine, tone: "bg-warning/10 text-warning" },
];

export const LEVEL_OPTIONS = [
    { value: "BEGINNER", label: "Beginner" },
    { value: "ELEMENTARY", label: "Elementary" },
    { value: "INTERMEDIATE", label: "Intermediate" },
    { value: "UPPER_INTERMEDIATE", label: "Upper-Intermediate" },
    { value: "ADVANCED", label: "Advanced" },
];

export const PRICE_OPTIONS = [{ value: "free", label: "Miễn phí" }];

/** Chỉ cho phép các trường sắp xếp đã biết — Backend sẽ lỗi nếu nhận tên trường sai. */
export const SORT_OPTIONS = [
    { value: "popular", label: "Phổ biến nhất", sortBy: "totalEnrollments", sortDir: "desc" },
    { value: "rating", label: "Đánh giá cao nhất", sortBy: "averageRating", sortDir: "desc" },
    { value: "newest", label: "Mới nhất", sortBy: "publishedAt", sortDir: "desc" },
    { value: "price-asc", label: "Giá thấp đến cao", sortBy: "price", sortDir: "asc" },
    { value: "price-desc", label: "Giá cao đến thấp", sortBy: "price", sortDir: "desc" },
];

export const DEFAULT_SORT = SORT_OPTIONS[0].value;

export const SKILL_BY_VALUE = Object.fromEntries(
    SKILL_OPTIONS.map((option) => [option.value, option])
);

export const LEVEL_BY_VALUE = Object.fromEntries(
    LEVEL_OPTIONS.map((option) => [option.value, option])
);

const priceFormatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
});

/**
 * Lưu ý: CourseSummaryResponse có field boolean `isFree`, nhưng Lombok sinh getter `isFree()`
 * nên JSON trả về tên `free`, không phải `isFree`. Vì vậy dựa vào `price === 0` cho chắc chắn.
 */
export function formatPrice(price) {
    const value = Number(price ?? 0);
    return value === 0 ? "Miễn phí" : priceFormatter.format(value);
}