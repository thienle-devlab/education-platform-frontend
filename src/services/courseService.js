import apiClient from "./apiClient";

/**
 * Course Service (qua Gateway): /api/courses/**
 * Response bọc trong ApiResponse<PageResponse<CourseSummaryResponse>>:
 *   data.content[]  : id, slug, title, thumbnailUrl, skillType, level, price,
 *                     totalLessons, totalEnrollments, averageRating (có thể null), tags, instructorId
 *   data.pageNumber (bắt đầu từ 0), pageSize, totalElements, totalPages, ...
 */

/** GET /api/courses — danh mục khóa học đã PUBLISHED, có lọc và sắp xếp. Công khai, không cần JWT. */
export async function getPublishedCourses(
    { skillType, level, maxPrice, page, size, sortBy, sortDir },
    signal
) {
    const { data } = await apiClient.get("/api/courses", {
        params: { skillType, level, maxPrice, page, size, sortBy, sortDir },
        signal,
    });
    return data.data;
}

/**
 * GET /api/courses/search — tìm theo từ khóa (tiêu đề + mô tả).
 * Endpoint này không nhận bộ lọc và không sắp xếp theo tiêu chí khác.
 */
export async function searchCourses({ keyword, page, size }, signal) {
    const { data } = await apiClient.get("/api/courses/search", {
        params: { keyword, page, size },
        signal,
    });
    return data.data;
}