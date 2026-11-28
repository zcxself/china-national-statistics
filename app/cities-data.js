// The ten largest city economies in China, 2024.
//
// GDP and growth: each city's 2024 statistical communique, as tabulated in
// the Quanzhou Statistical Yearbook 2025 appendix ("National key cities,
// main statistical indicators, 2024"). Population: year-end permanent
// residents from each city's 2024 statistical communique (Shanghai 24.80m
// is the Shanghai 2024 communique; Beijing 21.83m the Beijing 2024
// communique; Chongqing 31.91m, Guangzhou 18.98m, Shenzhen 17.99m, Chengdu
// 21.47m, Suzhou 12.99m, Hangzhou 12.62m, Wuhan 13.81m and Nanjing 9.58m
// from the cities' 2024 communiques as reported in 2025).
// Per-capita GDP is derived here as GDP ÷ population and marked "derived"
// on the page: GDP in ¥bn divided by population in millions gives
// ¥1,000 per person, so (gdpBn * 100 / popM) is yuan per person.

export const CITIES_2024 = [
  { name: 'Shanghai', gdpBn: 53926.7, growth: 5.0, popM: 24.8026 },
  { name: 'Beijing', gdpBn: 49843.1, growth: 5.2, popM: 21.832 },
  { name: 'Shenzhen', gdpBn: 36801.9, growth: 5.8, popM: 17.9895 },
  { name: 'Chongqing', gdpBn: 32193.2, growth: 5.7, popM: 31.9143 },
  { name: 'Guangzhou', gdpBn: 31032.5, growth: 2.1, popM: 18.978 },
  { name: 'Suzhou', gdpBn: 26727.0, growth: 6.0, popM: 12.987 },
  { name: 'Chengdu', gdpBn: 23511.3, growth: 5.7, popM: 21.474 },
  { name: 'Hangzhou', gdpBn: 21860.0, growth: 4.7, popM: 12.624 },
  { name: 'Wuhan', gdpBn: 21106.2, growth: 5.2, popM: 13.809 },
  { name: 'Nanjing', gdpBn: 18500.8, growth: 4.5, popM: 9.577 },
];

// Same rows with GDP per person added (derived, yuan per person).
export const CITIES_WITH_PER_CAPITA = CITIES_2024.map((c) => ({
  ...c,
  perCapita: Math.round((c.gdpBn * 100) / c.popM),
}));

export const CITY_NOTES = {
  trillionCities: 27,
  fastestGrowth: 'Suzhou, 6.0%',
  slowestGrowth: 'Guangzhou, 2.1%',
  mostPopulous: 'Chongqing, 31.91m — the only city above 30m',
  richestPerCapita: 'Beijing, ¥228,303 per person',
  poorestPerCapita: 'Chongqing, ¥100,874 per person',
  top10Share: 'The top 10 cities produced ¥315,503bn of GDP in 2024',
};
