import React from 'react';
import { holidays2026 } from '../data/holidays2026';
import { motion } from 'framer-motion';

const MonthCard = ({ month, recommendedLeaveDates = [] }) => {
    const year = 2026;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const monthName = new Intl.DateTimeFormat('ko-KR', { month: 'long' }).format(new Date(year, month, 1));

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDay }, (_, i) => i);

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="glass-card rounded-2xl p-4 flex flex-col h-full transition-all duration-300"
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800">{monthName}</h3>
                {recommendedLeaveDates.length > 0 && (
                    <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-full">
                        꿀휴식 추천
                    </span>
                )}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-slate-400 font-medium">
                <div className="text-red-400">일</div>
                <div>월</div>
                <div>화</div>
                <div>수</div>
                <div>목</div>
                <div>금</div>
                <div className="text-blue-400">토</div>
            </div>

            <div className="grid grid-cols-7 gap-1 flex-grow">
                {blanks.map(b => <div key={`blank-${b}`} />)}
                {days.map(d => {
                    const date = new Date(year, month, d);
                    const dateStr = date.toISOString().split('T')[0];
                    const holiday = holidays2026.find(h => h.date === dateStr);
                    const isSun = date.getDay() === 0;
                    const isSat = date.getDay() === 6;
                    const isRecommended = recommendedLeaveDates.includes(dateStr);

                    let dayClass = "h-8 flex items-center justify-center rounded-lg relative text-sm ";
                    if (holiday || isSun) dayClass += "text-red-500 font-bold ";
                    else if (isSat) dayClass += "text-blue-500 font-bold ";
                    else dayClass += "text-slate-600 ";

                    if (isRecommended) dayClass += "bg-amber-100 ring-1 ring-amber-400 ring-offset-1 ";
                    else if (holiday || isSun || isSat) dayClass += "bg-slate-50 ";

                    return (
                        <div key={d} className={dayClass} title={holiday?.name}>
                            {d}
                            {holiday && (
                                <div className="absolute -bottom-1 w-1 h-1 bg-red-400 rounded-full" />
                            )}
                        </div>
                    );
                })}
            </div>

            {holidays2026.filter(h => new Date(h.date).getMonth() === month).length > 0 && (
                <div className="mt-4 space-y-1">
                    {holidays2026
                        .filter(h => new Date(h.date).getMonth() === month)
                        .map(h => (
                            <div key={h.date} className="text-[10px] text-slate-500 flex items-center">
                                <span className="w-2 h-2 bg-red-400 rounded-full mr-1.5" />
                                <span className="font-medium mr-1">{new Date(h.date).getDate()}일:</span>
                                {h.name}
                            </div>
                        ))}
                </div>
            )}
        </motion.div>
    );
};

export default MonthCard;
