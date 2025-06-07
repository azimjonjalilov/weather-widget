export const CtoF = (c) => (c * 9) / 5 + 32;
export const FtoC = (f) => ((f - 32) * 5) / 9;

export function calcDailyStats(hourlyArr) {
  const temps = hourlyArr.map((h) => h.main.temp);
  return {
    min: Math.min(...temps),
    max: Math.max(...temps),
    avg: temps.reduce((a, b) => a + b, 0) / temps.length,
  };
}
