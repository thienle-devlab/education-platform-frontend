import { BookOpen, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { LEVEL_BY_VALUE, SKILL_BY_VALUE, formatPrice } from "@/utils/courseOptions";

/**
 * Thẻ khóa học cho danh sách (CourseSummaryResponse).
 * Chưa hiển thị tên giảng viên và số giờ học vì API danh sách chỉ trả instructorId,
 * không có durationHours. Cần Backend bổ sung nếu muốn hiện như mẫu artifact.
 */
export default function CourseCard({ course }) {
    const skill = SKILL_BY_VALUE[course.skillType];
    const SkillIcon = skill?.icon ?? BookOpen;
    const level = LEVEL_BY_VALUE[course.level];
    const isFree = Number(course.price ?? 0) === 0;
    const hasRating = course.averageRating !== null && course.averageRating !== undefined;

    return (
        <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-card transition-shadow focus-within:ring-3 focus-within:ring-ring/50 hover:shadow-lg">
            {/* Ảnh bìa (decorative — tiêu đề bên dưới đã mô tả khóa học) */}
            <div className="aspect-16/10 overflow-hidden bg-linear-to-br from-primary/15 to-chart-5/15">
                {course.thumbnailUrl ? (
                    <img
                        src={course.thumbnailUrl}
                        alt=""
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex size-full items-center justify-center text-primary/40">
                        <SkillIcon className="size-14" aria-hidden="true" />
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap items-center gap-2">
                    <span
                        className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold",
                            skill?.tone ?? "bg-secondary text-(--text)"
                        )}
                    >
                        <SkillIcon className="size-3.5" aria-hidden="true" />
                        {skill?.label ?? course.skillType}
                    </span>
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-(--text)">
                        {level?.label ?? course.level}
                    </span>
                </div>

                <h3 className="mt-3 line-clamp-2 text-base leading-snug font-bold text-foreground">
                    {/* after:absolute làm cả thẻ trở thành vùng bấm của liên kết này */}
                    <Link
                        to={`/courses/${course.slug}`}
                        className="outline-none after:absolute after:inset-0 after:content-['']"
                    >
                        {course.title}
                    </Link>
                </h3>

                <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-muted-foreground">
                    <li className="flex items-center gap-1.5">
                        <BookOpen className="size-3.5" aria-hidden="true" />
                        {course.totalLessons ?? 0} bài
                    </li>
                    <li className="flex items-center gap-1.5">
                        <Users className="size-3.5" aria-hidden="true" />
                        {course.totalEnrollments ?? 0} học viên
                    </li>
                    <li className="flex items-center gap-1.5">
                        <Star
                            className={cn("size-3.5", hasRating && "fill-warning text-warning")}
                            aria-hidden="true"
                        />
                        {hasRating ? Number(course.averageRating).toFixed(1) : "Chưa có đánh giá"}
                    </li>
                </ul>

                <p
                    className={cn(
                        "mt-auto pt-4 text-lg font-extrabold",
                        isFree ? "text-success" : "text-foreground"
                    )}
                >
                    {formatPrice(course.price)}
                </p>
            </div>
        </article>
    );
}