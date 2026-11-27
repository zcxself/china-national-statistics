// China by the Numbers — the 31 provinces, 2024.
//
// Every row is a published 2024 figure for mainland China's 31 provinces,
// autonomous regions and municipalities (excluding Hong Kong, Macao and
// Taiwan). Population is the year-end permanent (resident) population from
// each province's 2024 statistical communique. GDP is the preliminary
// regional GDP from the same communiques and the National Bureau of
// Statistics; dollars use the 2024 average rate of 7.1217 yuan per US$.
// GDP per capita is GDP divided by the year-end population.
//
// Two totals do not match the national figure exactly, and the site says so
// rather than forcing them to agree: the 31 provinces' population sums to
// 1,406.28 million against the national 1,408.28 million (the difference is
// mainly military personnel, who are counted nationally but not by any
// province), and their GDP sums to 134,031 billion yuan against the national
// 134,908 billion (a 0.65% gap, the usual difference between provincial
// aggregation and national accounting).

export const PROVINCES = [
  { name: 'Guangdong', pop10k: 12780, popChange10k: 74, gdpBn: 141634, gdpUsdBn: 1989, growth: 3.5, perCapita: 110825, perCapitaUsd: 15562 },
  { name: 'Jiangsu', pop10k: 8526, popChange10k: 0, gdpBn: 137008, gdpUsdBn: 1924, growth: 5.8, perCapita: 160694, perCapitaUsd: 22564 },
  { name: 'Shandong', pop10k: 10080, popChange10k: -43, gdpBn: 98566, gdpUsdBn: 1384, growth: 5.7, perCapita: 97784, perCapitaUsd: 13730 },
  { name: 'Zhejiang', pop10k: 6670, popChange10k: 43, gdpBn: 90131, gdpUsdBn: 1266, growth: 5.5, perCapita: 135128, perCapitaUsd: 18974 },
  { name: 'Sichuan', pop10k: 8364, popChange10k: -4, gdpBn: 64697, gdpUsdBn: 908, growth: 5.7, perCapita: 77352, perCapitaUsd: 10861 },
  { name: 'Henan', pop10k: 9785, popChange10k: -30, gdpBn: 63590, gdpUsdBn: 893, growth: 5.1, perCapita: 64987, perCapitaUsd: 9125 },
  { name: 'Hubei', pop10k: 5834, popChange10k: -4, gdpBn: 60013, gdpUsdBn: 843, growth: 5.8, perCapita: 102868, perCapitaUsd: 14444 },
  { name: 'Fujian', pop10k: 4193, popChange10k: 10, gdpBn: 57761, gdpUsdBn: 811, growth: 5.5, perCapita: 137756, perCapitaUsd: 19343 },
  { name: 'Shanghai', pop10k: 2480, popChange10k: -7, gdpBn: 53927, gdpUsdBn: 757, growth: 5.0, perCapita: 217446, perCapitaUsd: 30533 },
  { name: 'Hunan', pop10k: 6539, popChange10k: -29, gdpBn: 53231, gdpUsdBn: 747, growth: 4.8, perCapita: 81405, perCapitaUsd: 11431 },
  { name: 'Anhui', pop10k: 6123, popChange10k: 2, gdpBn: 50625, gdpUsdBn: 711, growth: 5.8, perCapita: 82680, perCapitaUsd: 11610 },
  { name: 'Beijing', pop10k: 2183, popChange10k: -3, gdpBn: 49843, gdpUsdBn: 700, growth: 5.2, perCapita: 228324, perCapitaUsd: 32060 },
  { name: 'Hebei', pop10k: 7378, popChange10k: -15, gdpBn: 47527, gdpUsdBn: 667, growth: 5.4, perCapita: 64417, perCapitaUsd: 9045 },
  { name: 'Shaanxi', pop10k: 3953, popChange10k: 1, gdpBn: 35539, gdpUsdBn: 499, growth: 5.3, perCapita: 89903, perCapitaUsd: 12624 },
  { name: 'Jiangxi', pop10k: 4502, popChange10k: -13, gdpBn: 34203, gdpUsdBn: 480, growth: 5.1, perCapita: 75972, perCapitaUsd: 10668 },
  { name: 'Liaoning', pop10k: 4155, popChange10k: -27, gdpBn: 32613, gdpUsdBn: 458, growth: 5.1, perCapita: 78490, perCapitaUsd: 11021 },
  { name: 'Chongqing', pop10k: 3190, popChange10k: -1, gdpBn: 32193, gdpUsdBn: 452, growth: 5.7, perCapita: 100919, perCapitaUsd: 14171 },
  { name: 'Yunnan', pop10k: 4655, popChange10k: -18, gdpBn: 31534, gdpUsdBn: 443, growth: 3.3, perCapita: 67742, perCapitaUsd: 9512 },
  { name: 'Guangxi', pop10k: 5013, popChange10k: -14, gdpBn: 28649, gdpUsdBn: 402, growth: 4.2, perCapita: 57150, perCapitaUsd: 8025 },
  { name: 'Inner Mongolia', pop10k: 2388, popChange10k: -8, gdpBn: 26315, gdpUsdBn: 369, growth: 5.8, perCapita: 110195, perCapitaUsd: 15473 },
  { name: 'Shanxi', pop10k: 3446, popChange10k: -20, gdpBn: 25495, gdpUsdBn: 358, growth: 2.3, perCapita: 73983, perCapitaUsd: 10388 },
  { name: 'Guizhou', pop10k: 3860, popChange10k: -5, gdpBn: 22667, gdpUsdBn: 318, growth: 5.3, perCapita: 58723, perCapitaUsd: 8246 },
  { name: 'Xinjiang', pop10k: 2623, popChange10k: 25, gdpBn: 20534, gdpUsdBn: 288, growth: 6.1, perCapita: 78285, perCapitaUsd: 10992 },
  { name: 'Tianjin', pop10k: 1364, popChange10k: 0, gdpBn: 18024, gdpUsdBn: 253, growth: 5.1, perCapita: 132143, perCapitaUsd: 18555 },
  { name: 'Heilongjiang', pop10k: 3029, popChange10k: -33, gdpBn: 16477, gdpUsdBn: 231, growth: 3.2, perCapita: 54397, perCapitaUsd: 7638 },
  { name: 'Jilin', pop10k: 2317, popChange10k: -22, gdpBn: 14361, gdpUsdBn: 202, growth: 4.3, perCapita: 61982, perCapitaUsd: 8703 },
  { name: 'Gansu', pop10k: 2458, popChange10k: -7, gdpBn: 13003, gdpUsdBn: 183, growth: 5.8, perCapita: 52900, perCapitaUsd: 7428 },
  { name: 'Hainan', pop10k: 1048, popChange10k: 5, gdpBn: 7936, gdpUsdBn: 111, growth: 3.7, perCapita: 75722, perCapitaUsd: 10633 },
  { name: 'Ningxia', pop10k: 729, popChange10k: 0, gdpBn: 5503, gdpUsdBn: 77, growth: 5.4, perCapita: 75484, perCapitaUsd: 10599 },
  { name: 'Qinghai', pop10k: 593, popChange10k: -1, gdpBn: 3951, gdpUsdBn: 55, growth: 2.7, perCapita: 66624, perCapitaUsd: 9355 },
  { name: 'Tibet', pop10k: 370, popChange10k: 5, gdpBn: 2765, gdpUsdBn: 39, growth: 6.3, perCapita: 74727, perCapitaUsd: 10493 },
];

// Read-outs the page states in words, computed from the table above so the
// text and the table cannot disagree.
export const PROVINCE_NOTES = {
  top5Share: '39.7%',
  top10Share: '61.2%',
  growingCount: 8,
  fastestGrowth: 'Tibet, 6.3%',
  slowestGrowth: 'Shanxi, 2.3%',
  richestPerCapita: 'Beijing, ¥228,324 ($32,060)',
  poorestPerCapita: 'Gansu, ¥52,900 ($7,428)',
  nationalPerCapita: '¥95,749',
};
