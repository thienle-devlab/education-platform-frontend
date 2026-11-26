import { useSearchParams } from "react-router-dom";

import CourseCard from "@/components/courses/CourseCard";
import CourseFilters from "@/components/courses/CourseFilters";
import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { COURSES_PAGE_SIZE, useCourses } from "@/hooks/useCourses";
import {
    DEFAULT_SORT,
    LEVEL_OPTIONS,
    PRICE_OPTIONS,
    SKILL_OPTIONS,
    SORT_OPTIONS,
} from "@/utils/courseOptions";

/** Chỉ nhận giá trị hợp lệ từ URL — tránh gửi enum sai lên Backend (sẽ bị 400). */
function pick(value, options, fallback = "") {
    return options.some((option) => option.value === value) ? value : fallback;
}

/** URL dùng số trang bắt đầu từ 1; Backend dùng từ 0. */
function readFilters(searchParams) {
    const pageNumber = Number.parseInt(searchParams.get("page") ?? "1", 10);

    return {
        keyword: (searchParams.get("q") ?? "").trim().slice(0, 100),
        skillType: pick(searchParams.get("skill"), SKILL_OPTIONS),
        level: pick(searchParams.get("level"), LEVEL_OPTIONS),
        price: pick(searchParams.get("price"), PRICE_OPTIONS),
        sort: pick(searchParams.get("sort"), SORT_OPTIONS, DEFAULT_SORT),
        page: Number.isNaN(pageNumber) ? 0 : Math.max(pageNumber - 1, 0),
    };
}

function CourseCardSkeleton() {
    return (
        <div aria-hidden="true" className="animate-pulse overflow-hidden rounded-2xl bg-card">
            <div className="aspect-16/10 bg-secondary" />
            <div className="space-y-3 p-5">
                <div className="h-5 w-1/2 rounded-full bg-secondary" />
                <div className="h-4 w-full rounded-full bg-secondary" />
                <div className="h-4 w-2/3 rounded-full bg-secondary" />
                <div className="h-6 w-1/3 rounded-full bg-secondary" />
            </div>
        </div>
    );
}

export default function CoursesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const filters = readFilters(searchParams);
    const { status, data, error, reload } = useCourses(filters);

    const hasActiveFilters = Boolean(
        filters.skillType ||
            filters.level ||
            filters.price ||
            filters.sort !== DEFAULT_SORT
    );

    /** Cập nhật URL; đổi bộ lọc luôn quay về trang 1. */
    function updateParams(changes) {
        const next = new URLSearchParams(searchParams);

        Object.entries(changes).forEach(([name, value]) => {
            if (value) next.set(name, value);
            else next.delete(name);
        });
        if (!("page" in changes)) next.delete("page");

        setSearchParams(next);
    }

    function handleSearch(keyword) {
        updateParams({ q: keyword });
    }

    function handleClear() {
        setSearchParams(new URLSearchParams());
    }

    function handlePageChange(pageIndex) {
        updateParams({ page: pageIndex > 0 ? String(pageIndex + 1) : "" });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const courses = data?.content ?? [];
    const total = data?.totalElements ?? 0;
    const from = data ? data.pageNumber * data.pageSize + 1 : 0;
    const to = data ? from + courses.length - 1 : 0;

    return (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    Khám phá khóa học
                </h1>
                <p className="mt-2 text-[15px] text-(--text)">
                    Chọn khóa học phù hợp với trình độ và mục tiêu của bạn.
                </p>
            </header>

            <CourseFilters
                filters={filters}
                hasActiveFilters={hasActiveFilters}
                onSearch={handleSearch}
                onChange={updateParams}
                onClear={handleClear}
            />

            <p
                role="status"
                aria-live="polite"
                className="mt-6 mb-4 min-h-5 text-sm font-medium text-muted-foreground"
            >
                {status === "success" && total > 0
                    ? `Hiển thị ${from}–${to} trong ${total} khóa học`
                    : ""}
            </p>

            {status === "loading" && (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: COURSES_PAGE_SIZE }, (_, index) => (
                        <CourseCardSkeleton key={index} />
                    ))}
                </div>
            )}

            {status === "error" && (
                <div role="alert" className="rounded-2xl bg-card px-6 py-12 text-center">
                    <h2 className="text-lg font-bold">Không tải được danh sách khóa học</h2>
                    <p className="mt-2 text-sm text-(--text)">
                        {error?.message ?? "Đã có lỗi xảy ra. Vui lòng thử lại."}
                    </p>
                    <Button
                        type="button"
                        onClick={reload}
                        className="mt-6 h-11 rounded-lg px-6 font-bold hover:bg-(--primary-hover)"
                    >
                        Thử lại
                    </Button>
                </div>
            )}

            {status === "success" && courses.length === 0 && (
                <div className="rounded-2xl bg-card px-6 py-12 text-center">
                    <h2 className="text-lg font-bold">Không tìm thấy khóa học phù hợp</h2>
                    <p className="mt-2 text-sm text-(--text)">
                        Thử đổi từ khóa hoặc bỏ bớt bộ lọc.
                    </p>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClear}
                        className="mt-6 h-11 rounded-lg border-2 px-6 font-bold"
                    >
                        Xóa bộ lọc
                    </Button>
                </div>
            )}

            {status === "success" && courses.length > 0 && (
                <>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>

                    <div className="mt-10">
                        <Pagination
                            page={data.pageNumber}
                            totalPages={data.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </>
            )}
        </section>
    );
}