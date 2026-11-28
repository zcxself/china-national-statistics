// China by the Numbers — the figures behind the site.
//
// Every number below is a published 2024 figure (or a 2015-2024 series from the
// same publications), with its source named next to it on the Sources page.
// Money is in current US dollars unless a row says yuan or PPP. Population
// figures from the National Bureau of Statistics (NBS) are year-end permanent
// residents of mainland China (excluding Hong Kong, Macao and Taiwan); the
// World Bank series are mid-year estimates, which is why the two differ by
// about 0.7 million people. Per-capita dollars for 2016-2023 are computed
// here from the GDP and population series and marked "derived" on the page.

export const META = {
  country: 'China',
  year: 2024,
  scope: 'Mainland China (excluding Hong Kong, Macao and Taiwan)',
  updated: '2024 data, published 2025',
};

// Headline indicators for the Overview page (NBS 2024 communique, WDI July 2026).
export const HEADLINE = [
  {
    id: 'population',
    label: 'Population, year-end',
    value: '1,408.28m',
    sub: 'down 1.39m on 2023',
    source: 'NBS 2024 communique',
  },
  {
    id: 'gdp',
    label: 'GDP, current US$',
    value: '$18.73tn',
    sub: '2nd largest in the world',
    source: 'World Bank WDI, Jul 2026',
  },
  {
    id: 'gdpPerCapita',
    label: 'GDP per capita',
    value: '$13,293',
    sub: '¥95,749 per person',
    source: 'World Bank WDI, Jul 2026',
  },
  {
    id: 'urban',
    label: 'Urbanisation rate',
    value: '67.00%',
    sub: 'up 0.84 pp on 2023',
    source: 'NBS 2024 communique',
  },
  {
    id: 'growth',
    label: 'Real GDP growth',
    value: '5.0%',
    sub: 'Q4 2024: 5.4% year on year',
    source: 'NBS 2024 communique',
  },
  {
    id: 'aged60',
    label: 'People aged 60+',
    value: '310.31m',
    sub: 'first time above 300m · 22.0% of all people',
    source: 'NBS 2024 communique',
  },
];

// GDP in current US dollars, $ trillion (World Bank WDI, July 2026 update).
// The 2020-2021 jump is mostly the yuan's appreciation, not a surge in output.
export const GDP_USD = [
  { year: 2015, value: 11.28 },
  { year: 2016, value: 11.46 },
  { year: 2017, value: 12.54 },
  { year: 2018, value: 14.15 },
  { year: 2019, value: 14.56 },
  { year: 2020, value: 15.0 },
  { year: 2021, value: 18.2 },
  { year: 2022, value: 18.32 },
  { year: 2023, value: 18.27 },
  { year: 2024, value: 18.73 },
];

// Mid-year population estimates, 100 million people (World Bank WDI).
export const POPULATION_MID = [
  { year: 2015, value: 13.799 },
  { year: 2016, value: 13.878 },
  { year: 2017, value: 13.962 },
  { year: 2018, value: 14.028 },
  { year: 2019, value: 14.077 },
  { year: 2020, value: 14.111 },
  { year: 2021, value: 14.124 },
  { year: 2022, value: 14.122 },
  { year: 2023, value: 14.107 },
  { year: 2024, value: 14.09 },
];

// GDP per capita, current US$ — the two endpoints are published (WDI);
// the years between are GDP divided by population, computed from the series above.
// Units: GDP in $ trillion is $1,000bn; population in 100m is 100m people, so
// ($tn x 10,000) / (100m people) gives dollars per person.
export const GDP_PER_CAPITA = GDP_USD.map((d, i) => ({
  year: d.year,
  value: Math.round((d.value * 10000) / POPULATION_MID[i].value),
}));

// Real GDP growth, % year on year (NBS). 2024 by quarter.
export const GROWTH_ANNUAL = [
  { year: 2021, value: 8.1 },
  { year: 2022, value: 3.0 },
  { year: 2023, value: 5.2 },
  { year: 2024, value: 5.0 },
];
export const GROWTH_QUARTER_2024 = [
  { label: 'Q1', value: 5.3 },
  { label: 'Q2', value: 4.7 },
  { label: 'Q3', value: 4.6 },
  { label: 'Q4', value: 5.4 },
];

// What drove 2024 growth, percentage points of the 5.0% (NBS 2024 communique).
export const GROWTH_DRIVERS = [
  { label: 'Final consumption', value: 2.2 },
  { label: 'Capital formation', value: 1.3 },
  { label: 'Net exports of goods & services', value: 1.5 },
];

// Value added by industry, 2024, billion yuan (NBS 2024 communique).
// Total GDP 2024: ¥1,349,084.4bn.
export const INDUSTRY_2024 = [
  { name: 'Primary (farming, forestry, fishing)', value: 9141.4, growth: 3.5, share: 6.8 },
  { name: 'Secondary (manufacturing, construction)', value: 49208.7, growth: 5.3, share: 36.5 },
  { name: 'Tertiary (services)', value: 76558.3, growth: 5.0, share: 56.7 },
];

// Births and deaths, millions (NBS communiques 2021-2024).
export const BIRTHS_DEATHS = [
  { year: 2021, births: 10.62, deaths: 10.14 },
  { year: 2022, births: 9.56, deaths: 10.41 },
  { year: 2023, births: 9.02, deaths: 11.1 },
  { year: 2024, births: 9.54, deaths: 10.93 },
];
export const VITAL_2024 = {
  births: '9.54m (6.77 per 1,000 people)',
  deaths: '10.93m (7.76 per 1,000 people)',
  naturalChange: '-0.99 per 1,000 people',
};

// Urbanisation rate, % of permanent residents in urban areas (NBS).
export const URBAN_RATE = [
  { year: 2015, value: 56.1 },
  { year: 2016, value: 57.35 },
  { year: 2017, value: 58.52 },
  { year: 2018, value: 59.58 },
  { year: 2019, value: 60.6 },
  { year: 2020, value: 63.89 },
  { year: 2021, value: 64.72 },
  { year: 2022, value: 65.22 },
  { year: 2023, value: 66.16 },
  { year: 2024, value: 67.0 },
];
export const URBAN_2024 = { urban: '943.50m', rural: '464.78m' };

// Age structure, year-end 2024 (NBS 2024 communique).
export const AGE_2024 = [
  { band: 'Aged 0-15', value: 240.09, share: 17.0 },
  { band: 'Aged 16-59', value: 857.88, share: 60.9 },
  { band: 'Aged 60+', value: 310.31, share: 22.0 },
];
export const AGEING = {
  aged60: '310.31m (22.0%) — first time above 300m',
  aged65: '220.35m (15.6%)',
};

// 2024, four economies (World Bank WDI, July 2026 update).
// Population in 100m; GDP in $ trillion; GDP per capita in $; growth in %.
export const COMPARE_2024 = [
  { name: 'United States', gdp: 29.3, gdpPerCapita: 86170, pop: 3.4, growth: 2.8, life: 78.9 },
  { name: 'China', gdp: 18.73, gdpPerCapita: 13293, pop: 14.09, growth: 5.0, life: 78.0 },
  { name: 'Japan', gdp: 4.19, gdpPerCapita: 33797, pop: 1.24, growth: -0.2, life: 84.0 },
  { name: 'India', gdp: 3.76, gdpPerCapita: 2592, pop: 14.51, growth: 7.1, life: 72.0 },
];

// GDP on a purchasing-power-parity basis, 2024, $ trillion (World Bank WDI).
export const GDP_PPP_2024 = [
  { name: 'China', value: 38.19 },
  { name: 'United States', value: 29.3 },
  { name: 'India', value: 15.6 },
];
export const PPP_NOTE = 'On a PPP basis China is the world’s largest economy: $38.19tn in 2024, $27,105 per person.';

// ---- Employment, 2024 (NBS 2024 communique; sector shares: Ministry of
// Human Resources and Social Security 2024 statistical bulletin) ----------
export const EMPLOYMENT_2024 = {
  employed: '734.39m',
  urbanEmployed: '473.45m',
  urbanShare: 64.5,
  newUrbanJobs: '12.56m',
  unemployment: 5.1,
  migrantWorkers: '299.73m',
  migrantGrowth: 0.7,
  migrantAway: '178.71m',
  migrantLocal: '121.02m',
};
export const EMPLOYMENT_SECTORS = [
  { name: 'Primary', value: 22.2, color: '#c08a00' },
  { name: 'Secondary', value: 29.0, color: '#16324f' },
  { name: 'Tertiary (services)', value: 48.8, color: '#b42318' },
];

// ---- Goods trade, 2024 (General Administration of Customs, via Xinhua) ---
// Total ¥43.85tn, up 5.0%, a record high and the 8th straight year as the
// world's largest goods trader. Dollar figures are derived at the 2024
// average rate of ¥7.1217 per US$; the surplus is exports minus imports.
export const TRADE_2024 = {
  total: 43.85,
  totalUsd: 6.16,
  exports: 25.45,
  exportsUsd: 3.57,
  exportsGrowth: 7.1,
  imports: 18.39,
  importsUsd: 2.58,
  importsGrowth: 2.3,
  growth: 5.0,
  surplus: 7.06,
};

// ---- Energy, 2024 (NBS 2024 communique; NEV output: Xinhua) -------------
export const ENERGY_2024 = {
  selfSufficiency: 'above 80%',
  co2PerGdp: -3.4,
  energyIntensity: -3.8,
  nevOutput: '13.17m',
};
