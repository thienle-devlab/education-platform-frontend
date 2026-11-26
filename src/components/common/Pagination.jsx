import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

/** Trả về danh sách số trang (0-based) kèm "gap" khi bị rút gọn. */
function getPageItems(current, total) {
    const visible = [...new Set([0, total - 1, current - 1, current, current + 1])]
        .filter((page) => page >= 0 && page < total)
        .sort((a, b) => a - b);

    const items = [];
    visible.forEach((page, index) => {
        if (index > 0 && page - visible[index - 1] > 1) items.push(`gap-${page}`);
        items.push(page);
    });
    return items;
}

const buttonClass =
    "flex size-10 items-center justify-center rounded-lg text-sm font-bold transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-40";

/** Phân trang. `page` bắt đầu từ 0 (giống PageResponse của Backend). */
export default function Pagination({ page, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    return (
        <nav aria-label="Phân trang" className="flex flex-wrap items-center justify-center gap-1.5">
            <button
                type="button"
                aria-label="Trang trước"
                disabled={page === 0}
                onClick={() => onPageChange(page - 1)}
                className={cn(buttonClass, "bg-card text-(--text) hover:bg-secondary")}
            >
                <ChevronLeft className="size-5" aria-hidden="true" />
            </button>

            {getPageItems(page, totalPages).map((item) =>
                typeof item === "string" ? (
                    <span key={item} aria-hidden="true" className="px-1 text-muted-foreground">
                        …
                    </span>
                ) : (
                    <button
                        key={item}
                        type="button"
                        aria-label={`Trang ${item + 1}`}
                        aria-current={item === page ? "page" : undefined}
                        onClick={() => onPageChange(item)}
                        className={cn(
                            buttonClass,
                            item === page
                                ? "bg-primary text-primary-foreground"
                                : "bg-card text-(--text) hover:bg-secondary"
                        )}
                    >
                        {item + 1}
                    </button>
                )
            )}

            <button
                type="button"
                aria-label="Trang sau"
                disabled={page >= totalPages - 1}
                onClick={() => onPageChange(page + 1)}
                className={cn(buttonClass, "bg-card text-(--text) hover:bg-secondary")}
            >
                <ChevronRight className="size-5" aria-hidden="true" />
            </button>
        </nav>
    );
}