import React from 'react';
import { BookOpen, ShieldCheck, FileText, Info, TrendingUp } from 'lucide-react';

const InfoArticles = () => {
    return (
        <section className="mt-24 space-y-16">
            {/* ARTICLE 1: Legal Vacation Knowledge */}
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm leading-relaxed">
                <div className="flex items-center gap-3 mb-6 text-blue-600">
                    <BookOpen size={28} />
                    <h2 className="text-2xl md:text-3xl font-black text-slate-800">직장인 필독: 2026년 연차 및 근로기준법 가이드</h2>
                </div>
                <div className="space-y-6 text-slate-600 text-lg">
                    <p>우리나라 근로기준법에 따르면, 1년간 80% 이상 출근한 근로자에게는 15일의 유급휴가가 주어집니다. 2026년은 공휴일과 대체공휴일이 절묘하게 배치되어 있어, 이 15일을 어떻게 배분하느냐에 따라 총 휴식 일수가 30일 이상으로 늘어날 수 있습니다.</p>

                    <h3 className="text-xl font-bold text-slate-800 mt-8">연차 유급휴가의 효력과 발생 요건</h3>
                    <p>연차 휴가는 발생한 날로부터 1년간 사용할 수 있으며, 기간 내 사용하지 못한 연차는 소멸되지만 회사는 연차 유급휴가 미사용 수당을 지급해야 할 의무가 있습니다. **연차나우**를 통해 미리 계획을 세우면 수당보다 더 가치 있는 '진정한 휴식'을 챙길 수 있습니다.</p>

                    <h3 className="text-xl font-bold text-slate-800 mt-4">2026년 대체공휴일 확대 적용</h3>
                    <p>최근 법 개정으로 인해 어린이날, 부처님오신날, 광복절 등 거의 모든 공휴일에 대체공휴일이 확대 적용됩니다. 2026년에는 삼일절(3월 1일), 부처님오신날(5월 24일), 광복절(8월 15일), 개천절(10월 3일)이 모두 주말과 겹치거나 인접해 있어 월요일이 휴무가 되는 경우가 많습니다.</p>
                </div>
            </div>

            {/* ARTICLE 2: Travel Booking Tips */}
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm leading-relaxed">
                <div className="flex items-center gap-3 mb-6 text-amber-500">
                    <TrendingUp size={28} />
                    <h2 className="text-2xl md:text-3xl font-black text-slate-800">검색 엔진이 주목하는 2026 여행 트렌드</h2>
                </div>
                <div className="space-y-6 text-slate-600 text-lg">
                    <p>2026년 추석 황금연휴(9월말~10월초)는 사상 유례없는 긴 연휴가 예상됩니다. 이에 따라 동남아시아는 물론 유럽, 미주 등 장거리 노선에 대한 수요가 2025년 대비 200% 이상 폭증할 것으로 보입니다.</p>

                    <h3 className="text-xl font-bold text-slate-800 mt-8">비행기 표 싸게 사는 골든 타임</h3>
                    <ul className="list-disc list-inside space-y-3">
                        <li><strong>최소 361일 전:</strong> 주요 항공사의 스케줄이 열리는 시점입니다. 2026년 추석 표는 2025년 9월 중순부터 매의 눈으로 확인해야 합니다.</li>
                        <li><strong>화요일 오후 3시:</strong> 통계적으로 항공권 가격이 가장 저렴하게 업데이트되는 시간대입니다.</li>
                        <li><strong>직항보다 경유:</strong> 10일 이상의 연차를 확보했다면, 비싼 직항 대신 경유 노선을 선택해 항공권 비용을 40% 이상 절감할 수 있습니다.</li>
                    </ul>
                </div>
            </div>

            {/* ARTICLE 3: FAQ */}
            <div className="bg-slate-800 rounded-3xl p-8 md:p-12 text-white leading-relaxed">
                <div className="flex items-center gap-3 mb-8 text-blue-400">
                    <Info size={28} />
                    <h2 className="text-2xl md:text-3xl font-black">자주 묻는 질문 (FAQ)</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-bold text-blue-300 mb-2">Q. 대체공휴일에도 휴가 수당이 나오나요?</h4>
                        <p className="text-sm text-slate-300">A. 상시 5인 이상 사업장이라면 대체공휴일도 법정 공휴일과 동일하게 유급휴일로 보장받습니다. 따라서 해당 일에 근무할 경우 휴일근로수당이 지급되어야 합니다.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-blue-300 mb-2">Q. 연차나우의 추천은 정확한가요?</h4>
                        <p className="text-sm text-slate-300">A. 국립천문과학원의 공휴일 공보와 현행 대체공휴일 법령을 기준으로 계산되었습니다. 다만, 개별 사업장의 취업규칙에 따라 차이가 있을 수 있습니다.</p>
                    </div>
                </div>
            </div>

            {/* LEGAL LINKS (AdSense Requirement) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
                    <ShieldCheck className="text-green-500 mb-4" size={40} />
                    <h3 className="font-bold text-xl mb-2">개인정보처리방침</h3>
                    <p className="text-slate-500 text-sm mb-4">연차나우는 사용자의 어떠한 개인정보도 서버에 저장하지 않으며 로컬 브라우저 세션만을 이용합니다.</p>
                    <button className="text-blue-600 text-sm font-bold hover:underline">자세히 보기</button>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
                    <FileText className="text-slate-400 mb-4" size={40} />
                    <h3 className="font-bold text-xl mb-2">이용약관</h3>
                    <p className="text-slate-500 text-sm mb-4">본 서비스의 정보는 참고용이며, 정확한 연차 규정은 각 사의 인사팀에 확인하시기 바랍니다.</p>
                    <button className="text-blue-600 text-sm font-bold hover:underline">자세히 보기</button>
                </div>
            </div>
        </section>
    );
};

export default InfoArticles;
