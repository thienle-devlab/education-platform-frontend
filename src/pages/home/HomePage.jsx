import { Link } from "react-router-dom";
import {
    ArrowRight,
    BookOpen,
    Brain,
    ChartNoAxesCombined,
    Headphones,
    MessageCircle,
    NotebookPen,
    Target,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

const features = [
    {
        icon: BookOpen,
        title: "Lộ trình học rõ ràng",
        description:
            "Học theo từng chủ đề và trình độ, giúp bạn biết mình cần học gì tiếp theo.",
    },
    {
        icon: Headphones,
        title: "Luyện nghe và đọc",
        description:
            "Rèn luyện kỹ năng tiếng Anh qua các bài học và bài tập có cấu trúc.",
    },
    {
        icon: MessageCircle,
        title: "Phát triển kỹ năng nói",
        description:
            "Từng bước luyện tập diễn đạt và nâng cao khả năng giao tiếp tiếng Anh.",
    },
    {
        icon: Brain,
        title: "Luyện tập cá nhân hóa",
        description:
            "Định hướng luyện tập dựa trên kết quả và những kiến thức bạn cần củng cố.",
    },
];

const learningPaths = [
    {
        icon: Headphones,
        title: "Listening",
        subtitle: "Luyện nghe tiếng Anh",
        color: "bg-chart-3/10 text-chart-3",
        to: "/courses?skill=LISTENING",
    },
    {
        icon: NotebookPen,
        title: "Reading",
        subtitle: "Nâng cao kỹ năng đọc",
        color: "bg-primary/10 text-primary",
        to: "/courses?skill=READING",
    },
    {
        icon: MessageCircle,
        title: "Speaking",
        subtitle: "Tự tin giao tiếp",
        color: "bg-success/10 text-success",
        to: "/courses?skill=SPEAKING",
    },
    {
        icon: Target,
        title: "TOEIC Practice",
        subtitle: "Ôn luyện theo định dạng TOEIC",
        color: "bg-chart-5/10 text-chart-5",
        to: "/assessment",
    },
];

export default function HomePage() {
    return (
        <div>
            {/* Hero */}
            <section className="overflow-hidden">
                <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
                    <div>
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                            <Brain size={16} />
                            Học tập theo lộ trình của riêng bạn
                        </div>

                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                            Chinh phục tiếng Anh,
                            <span className="block text-primary">
                                từng bước mỗi ngày.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-8 text-(--text) sm:text-lg">
                            Học tiếng Anh có định hướng, luyện tập theo kỹ năng và theo dõi
                            tiến độ để từng bước đạt được mục tiêu của bạn.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                to="/courses"
                                className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 text-[15px] font-bold text-primary-foreground shadow-sm transition-colors hover:bg-(--primary-hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                Khám phá khóa học
                                <ArrowRight className="ml-2" size={18} />
                            </Link>

                            <Link
                                to="/assessment"
                                className="inline-flex h-12 items-center justify-center rounded-lg border-2 border-border bg-card px-6 text-[15px] font-bold text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                Thử sức với bài thi
                                <ArrowRight className="ml-2" size={18} />
                            </Link>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                                <BookOpen size={17} className="text-primary" />
                                Học theo kỹ năng
                            </span>
                            <span className="flex items-center gap-2">
                                <ChartNoAxesCombined size={17} className="text-primary" />
                                Theo dõi tiến độ
                            </span>
                        </div>
                    </div>

                    {/* Hero visual */}
                    <div className="relative mx-auto w-full max-w-xl">
                        <div className="absolute -left-5 top-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
                        <div className="absolute -right-5 bottom-5 h-40 w-40 rounded-full bg-chart-5/20 blur-3xl" />

                        <Card className="relative border-border shadow-xl shadow-foreground/5">
                            <CardHeader>
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <CardDescription>Không gian học tập</CardDescription>
                                        <CardTitle className="mt-1 text-xl">
                                            Hành trình của bạn
                                        </CardTitle>
                                    </div>
                                    <div className="rounded-xl bg-primary/10 p-3 text-primary">
                                        <ChartNoAxesCombined size={24} />
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-5">
                                <div className="rounded-xl bg-secondary p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Mục tiêu học tập
                                            </p>
                                            <p className="mt-1 font-semibold text-foreground">
                                                Tiến bộ mỗi ngày
                                            </p>
                                        </div>
                                        <div className="rounded-full bg-success/10 p-2 text-success">
                                            <Target size={20} />
                                        </div>
                                    </div>
                                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-border">
                                        <div className="h-full w-3/5 rounded-full bg-primary" />
                                    </div>
                                    <p className="mt-2 text-xs text-muted-foreground">
                                        Minh họa giao diện theo dõi học tập
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="rounded-xl border border-border p-4">
                                        <Headphones className="text-primary" size={22} />
                                        <p className="mt-3 text-sm font-semibold text-foreground">
                                            Listening
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            Luyện nghe
                                        </p>
                                    </div>
                                    <div className="rounded-xl border border-border p-4">
                                        <NotebookPen className="text-chart-5" size={22} />
                                        <p className="mt-3 text-sm font-semibold text-foreground">
                                            Reading
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            Luyện đọc
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Learning paths */}
            <section className="border-y border-border bg-card py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                            Learning paths
                        </p>
                        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                            Chọn kỹ năng bạn muốn cải thiện
                        </h2>
                        <p className="mt-4 leading-7 text-(--text)">
                            Bắt đầu từ mục tiêu của bạn và xây dựng thói quen học tập phù hợp.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {learningPaths.map((path) => {
                            const Icon = path.icon;

                            return (
                                <Card
                                    key={path.title}
                                    className="group transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <CardContent className="p-6">
                                        <div
                                            className={`inline-flex rounded-xl p-3 ${path.color}`}
                                        >
                                            <Icon size={24} />
                                        </div>
                                        <h3 className="mt-5 font-semibold text-foreground">
                                            {path.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                            {path.subtitle}
                                        </p>
                                        <Link
                                            to={path.to}
                                            className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                                        >
                                            Khám phá
                                            <ArrowRight size={16} />
                                        </Link>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                            Why 4Q?
                        </p>
                        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                            Học có phương pháp, tiến bộ có định hướng
                        </h2>
                        <p className="mt-4 leading-7 text-(--text)">
                            Kết hợp bài học, luyện tập và đánh giá để bạn hiểu rõ hơn về quá
                            trình học tiếng Anh của mình.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <Card
                                    key={feature.title}
                                    className="border-border shadow-sm"
                                >
                                    <CardContent className="p-6">
                                        <div className="inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                                            <Icon size={24} />
                                        </div>
                                        <h3 className="mt-5 font-semibold text-foreground">
                                            {feature.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-7 text-(--text)">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Call to action */}
            <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
                <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-primary px-6 py-12 text-white sm:px-12 sm:py-16">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                            Bắt đầu hành trình tiếng Anh của bạn hôm nay
                        </h2>
                        <p className="mt-4 leading-7 text-white/80">
                            Xác định mục tiêu, lựa chọn kỹ năng và từng bước tiến gần hơn đến
                            kết quả mong muốn.
                        </p>

                        <Link
                            to="/register"
                            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-[15px] font-bold text-primary shadow-sm transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                        >
                            Tạo tài khoản
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}