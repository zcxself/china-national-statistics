# china-national-statistics

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/zcxself/china-national-statistics/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/zcxself/china-national-statistics/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

China by the Numbers — an independent national statistics site for China in 2024: population, GDP, growth, urbanisation and ageing, with every figure sourced and dated. Eleven pages (Overview, Economy, People, Trends, Provinces, Regions, Employment, Trade, Energy, Compare, Sources), hand-drawn SVG charts, working toggles and sortable tables, all as static files that run offline with no network requests. The Provinces page covers all 31 provinces with population, GDP, GDP per capita and growth; the Trends page follows GDP, population and GDP per person across 2015–2024; the Regions page measures the gaps between provinces (top-5 share 39.7%, richest vs poorest per person 4.3×); Employment, Trade and Energy add the 2024 jobs, goods-trade and energy figures.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080. Or serve `app/` with any static HTTP server — `app/index.html` is the front page. To build the submission output (what `main.ts` hands in):

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Data

All figures are 2024 (or 2015–2024 series from the same publications): National Bureau of Statistics of China, Statistical Communiqué on 2024 National Economic and Social Development (28 Feb 2025); World Bank, World Development Indicators (July 2026 update). Provincial figures come from each province’s 2024 statistical communique; trade figures from the General Administration of Customs (via Xinhua, 14 Jan 2025); employment sector shares from the Ministry of Human Resources and Social Security 2024 bulletin. See the Sources page in the site for every figure's origin, year and definition.

---

<sub>Entered on [make.fun](https://make.fun/?ref=hnzwb0g9&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
