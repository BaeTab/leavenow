import React from 'react';
import { ChevronRight, Newspaper } from 'lucide-react';

const blogPosts = [
    {
        title: "2026년 추석 연휴에 연차 딱 3개로 10일 쉬는 법",
        description: "9월 24일부터 시작되는 추석 연휴와 대체공휴일, 개천절까지 이어지는 '기적의 라인업'을 분석합니다. 비행기 표 예매는 지금이 적기!",
        category: "연차 꿀팁",
        date: "2025.12.21"
    },
    {
        title: "대체공휴일 확정 안내: 2026년에 적용되는 휴일은?",
        description: "2026년에는 삼일절, 부처님오신날 등 총 4번의 대체공휴일이 발생합니다. 법적 근거와 적용 대상 사업장을 정리해 드립니다.",
        category: "공지사항",
        date: "2025.12.20"
    },
    {
        title: "직장인 90%가 모르는 '연차 유급휴가 미사용 수당' 계산기",
        description: "남은 연차를 돈으로 받을 수 있을까요? 통상임금 기준 수당 계산 방법과 실무 팁을 공개합니다.",
        category: "인사 정보",
        date: "2025.12.19"
    },
    {
        title: "2026년 해외여행지 추천: 연휴 기간별 베스트 노선",
        description: "3일 단기 휴가부터 10일 대장정까지, 연차나우가 분석한 시기별 가장 저렴하고 날씨 좋은 여행지 리스트.",
        category: "여행 가이드",
        date: "2025.12.18"
    },
    {
        title: "여름 휴가 언제 써야 욕 안 먹을까? '연차 눈치 싸움' 승리법",
        description: "팀원들과 겹치지 않게, 하지만 가장 좋은 날을 선점하는 비즈니스 매너와 스마트한 연차 사용 전략.",
        category: "직장 생활",
        date: "2025.12.17"
    },
    {
        title: "2026년 관공서 공휴일 규정 및 유급휴일 확대 적용",
        description: "상시 5인 이상 사업장이라면 반드시 알아야 할 2026년 관공서 공휴일 유급 의무화 내용을 정리했습니다.",
        category: "노무 상식",
        date: "2025.12.16"
    }
];

const BlogSection = () => {
    return (
        <section className="mt-24">
            <div className="flex items-center gap-2 mb-8">
                <Newspaper className="text-blue-500" />
                <h2 className="text-2xl md:text-3xl font-black text-slate-800">최신 연차 & 휴가 정보 (Blog)</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogPosts.map((post, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all cursor-pointer group">
                        <div className="text-xs font-bold text-blue-500 mb-3 px-2 py-1 bg-blue-50 rounded-full w-fit">
                            {post.category}
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                            {post.title}
                        </h3>
                        <p className="text-slate-500 text-sm mb-4 line-clamp-3">
                            {post.description}
                        </p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                            <span className="text-xs text-slate-400">{post.date}</span>
                            <div className="flex items-center gap-1 text-blue-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                읽어보기 <ChevronRight size={14} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="mt-10 mx-auto block bg-slate-100 hover:bg-slate-200 text-slate-600 px-10 py-3 rounded-xl font-bold transition-all">
                전체 포스팅 더보기
            </button>
        </section>
    );
};

export default BlogSection;
