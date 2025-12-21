import { holidays2026 } from '../data/holidays2026';

export const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0: Sunday, 6: Saturday
};

export const isHoliday = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return holidays2026.some(h => h.date === dateStr);
};

export const isOffDay = (date) => {
    return isWeekend(date) || isHoliday(date);
};

export const calculateVacationPlans = (month) => {
    const year = 2026;
    const plans = [];

    const startMonth = month !== undefined ? month : 0;
    const endMonth = month !== undefined ? month : 11;

    const allDays = [];
    const startYear = new Date(2025, 11, 26);
    const endYear = new Date(2027, 0, 5);

    let curr = new Date(startYear);
    while (curr <= endYear) {
        allDays.push({
            date: new Date(curr),
            isOff: isOffDay(curr),
            dateStr: curr.toISOString().split('T')[0]
        });
        curr.setDate(curr.getDate() + 1);
    }

    for (let i = 0; i < allDays.length; i++) {
        if (allDays[i].isOff) continue;

        for (let take = 1; take <= 3; take++) {
            if (i + take > allDays.length) break;
            const leaveDays = allDays.slice(i, i + take);

            let beforeCount = 0;
            for (let j = i - 1; j >= 0; j--) {
                if (allDays[j].isOff) beforeCount++;
                else break;
            }

            let afterCount = 0;
            for (let j = i + take; j < allDays.length; j++) {
                if (allDays[j].isOff) afterCount++;
                else break;
            }

            if (beforeCount > 0 || afterCount > 0) {
                const totalConsecutive = beforeCount + take + afterCount;
                if (totalConsecutive > take + 1) {
                    plans.push({
                        startDate: new Date(allDays[i - beforeCount].date),
                        endDate: new Date(allDays[i + take + afterCount - 1].date),
                        totalDays: totalConsecutive,
                        leaveDays: take,
                        efficiency: totalConsecutive / take,
                        dates: allDays.slice(i - beforeCount, i + take + afterCount).map(d => d.dateStr),
                        leaveDates: leaveDays.map(d => d.dateStr)
                    });
                }
            }
        }
    }

    const uniquePlans = plans.filter((plan, index, self) =>
        index === self.findIndex((t) => (
            t.startDate.getTime() === plan.startDate.getTime() &&
            t.endDate.getTime() === plan.endDate.getTime()
        ))
    ).sort((a, b) => b.efficiency - a.efficiency || b.totalDays - a.totalDays);

    return uniquePlans;
};

export const getRecommendedSchedule = (leaveBudget) => {
    const allPlans = calculateVacationPlans();
    const selectedPlans = [];
    let remainingBudget = leaveBudget;

    const sortedPlans = [...allPlans].sort((a, b) => b.efficiency - a.efficiency || b.totalDays - a.totalDays);

    const isOverlapping = (plan, selected) => {
        return selected.some(s => {
            const pStart = new Date(plan.startDate).getTime();
            const pEnd = new Date(plan.endDate).getTime();
            const sStart = new Date(s.startDate).getTime();
            const sEnd = new Date(s.endDate).getTime();
            return (pStart <= sEnd && pEnd >= sStart);
        });
    };

    for (const plan of sortedPlans) {
        if (plan.leaveDays <= remainingBudget && !isOverlapping(plan, selectedPlans)) {
            selectedPlans.push(plan);
            remainingBudget -= plan.leaveDays;
        }
        if (remainingBudget <= 0) break;
    }

    return {
        plans: selectedPlans.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()),
        totalVacationDays: selectedPlans.reduce((sum, p) => sum + p.totalDays, 0),
        usedLeaveDays: leaveBudget - remainingBudget
    };
};
