import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    ALL_OPTION,
    LEVEL_OPTIONS,
    PRICE_OPTIONS,
    SKILL_OPTIONS,
    SORT_OPTIONS,
} from "@/utils/courseOptions";

function FilterSelect({ id, label, value, options, onChange, disabled }) {
    return (
        <div className="space-y-1.5">
            <label htmlFor={id} className="text-xs font-bold text-(--text)">
                {label}
            </label>
            <select
                id={id}
                value={value}
                disabled={disabled}
                onChange={(event) => onChange(event.target.value)}
                className="h-11 w-full rounded-lg border-2 border-border bg-card px-3 text-sm font-medium text-foreground outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

const withAll = (options) => [ALL_OPTION, ...options];

/**
 * Thanh tìm kiếm + bộ lọc (theo Claude Artifact — trang Khóa học).
 * Khi đang tìm theo từ khóa, các bộ lọc bị khóa vì endpoint /search không hỗ trợ.
 */
export default function CourseFilters({ filters, hasActiveFilters, onSearch, onChange, onClear }) {
    const isSearching = Boolean(filters.keyword);

    function handleSubmit(event) {
        event.preventDefault();
        const keyword = new FormData(event.currentTarget).get("q");
        onSearch(String(keyword ?? "").trim());
    }

    return (
        <section aria-label="Tìm kiếm và bộ lọc khóa học" className="rounded-2xl bg-card p-5">
            <form onSubmit={handleSubmit} role="search" className="flex gap-3">
                <div className="relative flex-1">
                    <label htmlFor="course-search" className="sr-only">
                        Tìm khóa học
                    </label>
                    <Search
                        className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted-foreground"
                        aria-hidden="true"
                    />
                    {/* key: khi từ khóa trong URL đổi (ví dụ bấm Xóa bộ lọc) ô nhập được làm mới */}
                    <Input
                        key={filters.keyword}
                        id="course-search"
                        name="q"
                        type="search"
                        defaultValue={filters.keyword}
                        maxLength={100}
                        placeholder="Tìm theo tên hoặc mô tả khóa học"
                        className="h-12 rounded-lg border-2 border-border bg-card pr-3.5 pl-11 text-[15px] focus-visible:border-primary focus-visible:ring-primary/20"
                    />
                </div>
                <Button
                    type="submit"
                    className="h-12 rounded-lg px-6 text-[15px] font-bold hover:bg-(--primary-hover)"
                >
                    Tìm
                </Button>
            </form>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <FilterSelect
                    id="filter-skill"
                    label="Kỹ năng"
                    value={filters.skillType}
                    options={withAll(SKILL_OPTIONS)}
                    disabled={isSearching}
                    onChange={(value) => onChange({ skill: value })}
                />
                <FilterSelect
                    id="filter-level"
                    label="Trình độ"
                    value={filters.level}
                    options={withAll(LEVEL_OPTIONS)}
                    disabled={isSearching}
                    onChange={(value) => onChange({ level: value })}
                />
                <FilterSelect
                    id="filter-price"
                    label="Học phí"
                    value={filters.price}
                    options={withAll(PRICE_OPTIONS)}
                    disabled={isSearching}
                    onChange={(value) => onChange({ price: value })}
                />
                <FilterSelect
                    id="filter-sort"
                    label="Sắp xếp"
                    value={filters.sort}
                    options={SORT_OPTIONS}
                    disabled={isSearching}
                    onChange={(value) => onChange({ sort: value })}
                />
            </div>

            {(isSearching || hasActiveFilters) && (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <p role="status" className="text-xs font-medium text-muted-foreground">
                        {isSearching
                            ? "Đang tìm theo từ khóa — bộ lọc và sắp xếp tạm thời không áp dụng."
                            : ""}
                    </p>
                    <button
                        type="button"
                        onClick={onClear}
                        className="rounded-lg text-sm font-bold text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                        Xóa bộ lọc
                    </button>
                </div>
            )}
        </section>
    );
}