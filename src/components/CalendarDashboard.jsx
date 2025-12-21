import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, Calendar, Share2, TrendingUp, ChevronRight, Clock, Download } from 'lucide-react';
import MonthCard from './MonthCard';
import InfoArticles from './InfoArticles';
import BlogSection from './BlogSection';
import { calculateVacationPlans, getRecommendedSchedule } from '../utils/calculator';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';
import Lottie from 'lottie-react';

const CalendarDashboard = () => {
    const [leaveCount, setLeaveCount] = useState(15);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [animationData, setAnimationData] = useState(null);
    const dashboardRef = useRef(null);

    useEffect(() => {
        // Fetch a high-quality airplane/travel animation
        fetch('https://lottie.host/64299b92-9599-4d94-9844-486a4e3df592/yUvQv05oWJ.json')
            .then(res => res.json())
            .then(data => setAnimationData(data))
            .catch(err => console.error('Lottie load error:', err));
    }, []);

    const allPlans = calculateVacationPlans();
    const top3Plans = allPlans.slice(0, 3);

    // Get schedule based on budget
    const recommendation = getRecommendedSchedule(leaveCount);

    const recommendedLeaveDates = allPlans
        .filter(p => p.efficiency >= 3)
        .flatMap(p => p.leaveDates);

    const handleUnlock = () => {
        const adLinks = ['https://deg.kr/2a1deeb', 'https://deg.kr/799c1ba'];
        const randomLink = adLinks[Math.floor(Math.random() * adLinks.length)];

        // Open ad in new tab
        window.open(randomLink, '_blank');

        // Unlock content
        setIsUnlocked(true);
    };

    const handleShare = async () => {
        if (!isUnlocked) {
            alert('일정 잠금을 해제한 후 이미지로 저장할 수 있습니다.');
            return;
        }
        if (dashboardRef.current) {
            try {
                const canvas = await html2canvas(dashboardRef.current, {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: '#f8fafc',
                    logging: false,
                    ignoreElements: (element) => element.getAttribute('data-html2canvas-ignore') === 'true'
                });

                const image = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = image;
                link.download = `연차나우_2026_연차계획_${leaveCount}개.png`;
                link.click();

                // Fun effect!
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#3b82f6', '#fbbf24', '#ef4444']
                });
            } catch (error) {
                console.error('이미지 저장 중 오류 발생:', error);
                alert('이미지 저장에 실패했습니다. 잠시 후 다시 시도해주세요.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20 overflow-x-hidden">
            <header className="relative bg-gradient-to-br from-blue-600 to-blue-400 text-white pt-16 pb-32 px-6 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl" />
                </div>

                <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between">
                    <div className="flex-1 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 mb-4 bg-white/20 backdrop-blur-md w-fit px-4 py-1.5 rounded-full border border-white/30 mx-auto md:mx-0"
                        >
                            <Clock size={16} />
                            <span className="text-sm font-medium">2026년 최적의 휴가 타이밍</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-black mb-6 leading-tight"
                        >
                            연차 쓰고 휴가가기 <br />
                            <span className="text-amber-300">딱 좋은 날</span>만 골라드립니다
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-blue-50 mb-10 max-w-2xl font-light leading-relaxed"
                        >
                            2026년 공휴일 분석 데이터를 바탕으로 연차 1~2개만 쓰고 즐기는 최장의 연휴를 설계했습니다. 지금 바로 내 연차 계획을 세워보세요. ✈️
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-4 justify-center md:justify-start mb-10 md:mb-0"
                        >
                            <button
                                onClick={() => document.getElementById('month-grid')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-900/20 hover:bg-blue-50 transition-all flex items-center gap-2"
                            >
                                <Calendar size={20} />
                                연간 달력 보기
                            </button>
                            <button
                                onClick={handleShare}
                                className="bg-blue-700/30 text-white border border-white/30 px-8 py-4 rounded-2xl font-bold backdrop-blur-md hover:bg-white/20 transition-all flex items-center gap-2"
                            >
                                <Share2 size={20} />
                                이미지로 저장
                            </button>
                        </motion.div>
                    </div>

                    {animationData && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="w-full max-w-[400px] h-auto pointer-events-none"
                            data-html2canvas-ignore="true"
                        >
                            <Lottie
                                animationData={animationData}
                                loop={true}
                                className="drop-shadow-2xl"
                            />
                        </motion.div>
                    )}
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 -mt-16 relative z-20" ref={dashboardRef}>
                <div data-html2canvas-ignore="true" className="w-full h-24 bg-white/50 border border-dashed border-slate-300 rounded-2xl mb-12 flex items-center justify-center text-slate-400 text-sm overflow-hidden">
                    <span>광고 영역 (Ad Slot)</span>
                </div>

                <section className="mb-16">
                    <div className="flex items-center gap-2 mb-6">
                        <TrendingUp className="text-blue-500" />
                        <h2 className="text-2xl font-bold text-slate-800">2026년 가성비 끝판왕 연휴 TOP 3</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {top3Plans.map((plan, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col relative overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl text-xs font-bold text-white ${idx === 0 ? 'bg-amber-400' : 'bg-slate-400'}`}>
                                    {idx + 1}위 {idx === 0 && '👑'}
                                </div>

                                <div className="text-3xl font-black text-blue-600 mb-2">
                                    {plan.totalDays} <span className="text-lg font-bold">일 휴식</span>
                                </div>

                                <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4">
                                    <Plane size={14} />
                                    <span>연차 단 <b>{plan.leaveDays}개</b> 사용</span>
                                </div>

                                <div className="bg-slate-50 rounded-xl p-3 mb-6">
                                    <div className="text-xs text-slate-400 mb-1">여정 정보</div>
                                    <div className="text-sm font-bold text-slate-700">
                                        {new Date(plan.startDate).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
                                        ~ {new Date(plan.endDate).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <div className="w-full bg-blue-50 text-blue-600 py-2.5 rounded-xl text-center font-bold text-sm tracking-tight">
                                        효율성 {plan.efficiency.toFixed(1)}배 달성!
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="bg-blue-600 rounded-3xl p-8 mb-16 text-white shadow-2xl shadow-blue-500/20">
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-2">내 연차 개수 맞춤 분석</h3>
                            <p className="text-blue-100 mb-6 font-light">올해 사용 가능한 총 연차 수를 입력하면 가장 효율적인 일정을 추천해드립니다.</p>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="1"
                                    max="30"
                                    value={leaveCount}
                                    onChange={(e) => setLeaveCount(parseInt(e.target.value))}
                                    className="w-full h-2 bg-blue-400 rounded-lg appearance-none cursor-pointer accent-amber-400"
                                />
                                <span className="text-2xl font-black w-12">{leaveCount}개</span>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 w-full md:w-64">
                            <div className="text-sm text-blue-100 mb-1 uppercase tracking-wider font-bold">Total Result</div>
                            <div className="text-3xl font-black mb-2">총 {recommendation.totalVacationDays}일</div>
                            <div className="text-xs text-blue-200">연차 {recommendation.usedLeaveDays}개를 사용하여 가장 효율적으로 쉴 수 있는 일정입니다.</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative min-h-[200px]">
                        {!isUnlocked && (
                            <div className="absolute inset-0 bg-blue-600/40 backdrop-blur-md z-10 rounded-2xl flex flex-col items-center justify-center p-6 text-center">
                                <TrendingUp size={48} className="text-amber-300 mb-4 animate-bounce" />
                                <h4 className="text-xl font-bold mb-2">나만의 맞춤 추천 일정 잠겨있음</h4>
                                <p className="text-blue-100 text-sm mb-6">아래 버튼을 클릭하여 스폰서 정보를 확인하면<br />2026년 최적의 연차 조합이 즉시 공개됩니다.</p>
                                <button
                                    onClick={handleUnlock}
                                    className="bg-amber-400 hover:bg-amber-300 text-blue-900 px-8 py-3 rounded-xl font-black shadow-lg transition-all transform hover:scale-105"
                                >
                                    무료로 일정 잠금 해제하기
                                </button>
                            </div>
                        )}

                        {recommendation.plans.map((plan, idx) => (
                            <div key={idx} className={`bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-2xl flex items-center justify-between transition-all ${!isUnlocked ? 'blur-sm grayscale' : ''}`}>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-bold">
                                        {new Date(plan.startDate).getMonth() + 1}월
                                    </div>
                                    <div>
                                        <div className="font-bold">
                                            {new Date(plan.startDate).getDate()}일 ~ {new Date(plan.endDate).getDate()}일
                                        </div>
                                        <div className="text-xs text-blue-200">
                                            {plan.totalDays}일 휴식 (연차 {plan.leaveDays}개)
                                        </div>
                                    </div>
                                </div>
                                <div className="text-amber-300 font-bold text-sm">
                                    {plan.efficiency.toFixed(1)}x
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="month-grid">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-800">2026년 전체 달력 & 연차 명당</h2>
                        <div className="flex gap-4 text-xs">
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 bg-red-100 border border-red-200 rounded-sm" />
                                <span className="text-slate-500">공휴일</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 bg-amber-100 border border-amber-300 rounded-sm" />
                                <span className="text-slate-500">연차 권장</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 12 }, (_, i) => (
                            <MonthCard
                                key={i}
                                month={i}
                                recommendedLeaveDates={recommendedLeaveDates}
                            />
                        ))}
                    </div>
                </section>

                <section data-html2canvas-ignore="true" className="mt-24 bg-white rounded-3xl p-10 border border-slate-100 shadow-sm leading-relaxed text-slate-600">
                    <h2 className="text-3xl font-black text-slate-800 mb-8">2026년 황금연휴 완벽 가이드: 최강의 연차 효율 활용법</h2>
                    <div className="space-y-6 text-lg">
                        <p>2026년은 직장인들에게 그야말로 '기회의 해'입니다. 특히 **추석 연휴**를 기점으로 형성되는 황금연휴 기간은 연차를 단 1~2개만 활용해도 일주일 이상의 긴 휴가를 즐길 수 있는 천혜의 환경을 제공합니다. <b>연차나우(LeaveNow)</b>가 분석한 2026년 최고의 연차 타이밍을 지금 바로 확인하시고 항공권 예약을 서두르세요.</p>

                        <h3 className="text-xl font-bold text-slate-800 mt-8">1. 2026년 추석 연휴: 10일간의 기적</h3>
                        <p>9월 말부터 10월 초까지 이어지는 연휴는 올해 최고의 하이라이트입니다. 추석 연휴(9/24-26)와 대체공휴일(9/28)을 징검다리로 삼아 개천절(10/3)과 한글날(10/9)까지 이어지는 일정을 잘 설계하면, 단 2-3일의 연차로 9일에서 10일까지 쉬는 초대형 황금연휴를 만들 수 있습니다. **제주도 호텔 특가 예약 타이밍**이나 **항공권 최저가 비교 사이트**를 미리 활용해 보세요.</p>

                        <h3 className="text-xl font-bold text-slate-800 mt-8">2. 설날 및 삼일절 연휴: 연초 리프레시</h3>
                        <p>2월에 위치한 설날 연휴는 월요일부터 수요일까지입니다 (16-18일). 앞뒤 주말을 포함하면 기본 5일 휴식이 확보되며, 금요일에 연차를 붙인다면 동남아 **연차 쓰고 가기 좋은 해외 여행지 추천** 명단에 있는 태국이나 베트남으로의 짧은 여행이 가능해집니다.</p>

                        <h3 className="text-xl font-bold text-slate-800 mt-8">3. 가정의 달 5월: 최강의 징검다리</h3>
                        <p>5월 5일 어린이날은 화요일입니다. 월요일인 5월 4일에 연차 1개만 사용하면 4일간의 여유로운 휴식이 가능합니다. 또한 부처님 오신 날(5/24)이 일요일이라 월요일(5/25)이 대체공휴일로 지정되어 3일 연휴가 자동 완성됩니다.</p>

                        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-2xl my-8">
                            <h4 className="font-bold text-blue-800 mb-2">💡 스마트한 연차 사용 팁</h4>
                            <ul className="list-disc list-inside space-y-2 text-blue-700 text-base">
                                <li>대체공휴일 법안 확대 적용으로 인해 대부분의 공휴일이 월요일 휴식으로 보장됩니다.</li>
                                <li>항공권은 연휴 시작 최소 6개월 전, 숙박은 3개월 전에 예약하는 것이 가장 저렴합니다.</li>
                                <li>연차나우의 '이미지로 저장' 기능을 통해 팀원들과 일정을 공유하고 먼저 선점하세요!</li>
                            </ul>
                        </div>

                        <p className="text-sm text-slate-400">
                            핵심 키워드: 2026년 공휴일, 2026년 황금연휴 마스터 플랜, 직장인 연차 효율 계산기, 연차 쓰고 해외 여행지 추천, 항공권 최저가 비교, 2026년 추석 연휴 날짜, 대체공휴일 확정 안내.
                        </p>
                    </div>
                </section>

                <div data-html2canvas-ignore="true">
                    <InfoArticles />
                    <BlogSection />
                </div>

                <footer data-html2canvas-ignore="true" className="mt-16 text-center border-t border-slate-200 pt-16">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 max-w-sm">
                            <h4 className="font-bold text-slate-800 mb-2">내 연차 수당, 세금 떼면 얼마?</h4>
                            <p className="text-sm text-slate-500 mb-4">페이리포트에서 확인해보세요.</p>
                            <a href="https://ppay-report.web.app" target="_blank" className="text-blue-600 font-bold flex items-center justify-center gap-1 hover:underline">
                                페이리포트 바로가기 <ChevronRight size={16} />
                            </a>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 max-w-sm">
                            <h4 className="font-bold text-slate-800 mb-2">앱으로 더 편하게 확인하세요</h4>
                            <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 mx-auto">
                                <Download size={16} />
                                PWA 앱 설치하기
                            </button>
                        </div>
                    </div>
                    <div className="mt-12 flex flex-wrap justify-center gap-6 text-xs text-slate-400">
                        <a href="/sitemap.xml" className="hover:text-blue-500 hover:underline">사이트맵 (Sitemap)</a>
                        <button className="hover:text-blue-500 hover:underline">개인정보처리방침</button>
                        <button className="hover:text-blue-500 hover:underline">이용약관</button>
                        <a href="mailto:contact@payreport.kr" className="hover:text-blue-500 hover:underline">문의하기</a>
                    </div>
                    <div className="text-slate-400 text-sm mt-8">
                        © 2025 PayReport Media. All rights reserved.
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default CalendarDashboard;
