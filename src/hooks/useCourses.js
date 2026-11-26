import { useEffect, useState } from "react";

import { parseApiError } from "@/services/apiError";
import { getPublishedCourses, searchCourses } from "@/services/courseService";
import { SORT_OPTIONS } from "@/utils/courseOptions";

export const COURSES_PAGE_SIZE = 9;

function fetchCourses(filters, signal) {
    const { keyword, skillType, level, price, sort, page } = filters;

    if (keyword) {
        return searchCourses({ keyword, page, size: COURSES_PAGE_SIZE }, signal);
    }

    const sortOption = SORT_OPTIONS.find((option) => option.value === sort) ?? SORT_OPTIONS[0];

    return getPublishedCourses(
        {
            skillType: skillType || undefined,
            level: level || undefined,
            // maxPrice = 0 → chỉ lấy khóa miễn phí (Backend lọc price <= maxPrice)
            maxPrice: price === "free" ? 0 : undefined,
            page,
            size: COURSES_PAGE_SIZE,
            sortBy: sortOption.sortBy,
            sortDir: sortOption.sortDir,
        },
        signal
    );
}

/**
 * Tải danh sách khóa học theo bộ lọc. `filters.page` bắt đầu từ 0.
 * Trả về { status: "loading" | "success" | "error", data, error, reload }.
 */
export function useCourses(filters) {
    const [attempt, setAttempt] = useState(0);
    const [result, setResult] = useState({ key: null, data: null, error: null });

    // Khóa gồm toàn bộ bộ lọc + số lần thử lại → đổi khóa là tải lại
    const key = JSON.stringify({ filters, attempt });

    useEffect(() => {
        const controller = new AbortController();
        const { filters: currentFilters } = JSON.parse(key);

        fetchCourses(currentFilters, controller.signal)
            .then((data) => setResult({ key, data, error: null }))
            .catch((error) => {
                if (error?.code === "ERR_CANCELED") return;
                setResult({ key, data: null, error: parseApiError(error) });
            });

        // Hủy request cũ khi người dùng đổi bộ lọc nhanh
        return () => controller.abort();
    }, [key]);

    const isLoading = result.key !== key;

    return {
        status: isLoading ? "loading" : result.error ? "error" : "success",
        data: isLoading ? null : result.data,
        error: isLoading ? null : result.error,
        reload: () => setAttempt((value) => value + 1),
    };
}