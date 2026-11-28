// Wiring for every page: renders the SVG charts from data.js into the
// placeholders, makes the toggle buttons switch what a chart shows, and
// makes the comparison table sortable. Runs entirely offline.
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import {
  AGE_2024,
  BIRTHS_DEATHS,
  COMPARE_2024,
  EMPLOYMENT_2024,
  EMPLOYMENT_SECTORS,
  ENERGY_2024,
  GDP_USD,
  GDP_PER_CAPITA,
  GDP_PPP_2024,
  GROWTH_ANNUAL,
  GROWTH_DRIVERS,
  GROWTH_QUARTER_2024,
  INDUSTRY_2024,
  POPULATION_MID,
  TRADE_2024,
  URBAN_RATE,
} from './data.js';
import { barChart, donut, groupedBars, hbarChart, lineChart } from './charts.js';

window.__shotReady = false;

const byId = (id) => document.getElementById(id);
const CHINA = '#b42318';
const NAVY = '#16324f';
const TEAL = '#2e7d6b';
const GOLD = '#c08a00';

function renderInto(node, svg) {
  node.innerHTML = svg;
}

// ---- Overview -------------------------------------------------------------
function renderOverview() {
  const gdp = byId('chart-gdp');
  if (gdp) {
    const draw = (mode) => {
      const series = mode === 'per-capita' ? GDP_PER_CAPITA : GDP_USD;
      const points = series.map((d) => ({ label: d.year, value: d.value }));
      renderInto(
        gdp,
        lineChart(points, {
          decimals: mode === 'per-capita' ? 0 : 2,
          color: mode === 'per-capita' ? TEAL : CHINA,
        }),
      );
      const cap = byId('gdp-caption');
      if (cap) {
        cap.textContent =
          mode === 'per-capita'
            ? 'GDP per capita, current US$ (World Bank WDI; 2016-2023 computed from GDP ÷ population).'
            : 'GDP in current US$ (World Bank WDI, July 2026 update). The 2020-2021 jump is mostly the yuan’s appreciation, not a surge in output.';
      }
    };
    draw('total');
    document.querySelectorAll('[data-gdp-toggle] button').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-gdp-toggle] button').forEach((b) => b.setAttribute('aria-pressed', 'false'));
        btn.setAttribute('aria-pressed', 'true');
        draw(btn.dataset.mode);
      });
    });
  }

  const pop = byId('chart-population');
  if (pop) {
    renderInto(
      pop,
      lineChart(
        POPULATION_MID.map((d) => ({ label: d.year, value: d.value })),
        { unit: '', decimals: 2, color: NAVY, domain: [13, 15] },
      ),
    );
  }
}

// ---- Trends -----------------------------------------------------------------
function renderTrends() {
  const gdp = byId('chart-trends-gdp');
  if (gdp) {
    const draw = (mode) => {
      const series = mode === 'per-capita' ? GDP_PER_CAPITA : GDP_USD;
      const points = series.map((d) => ({ label: d.year, value: d.value }));
      renderInto(
        gdp,
        lineChart(points, {
          decimals: mode === 'per-capita' ? 0 : 2,
          color: mode === 'per-capita' ? TEAL : CHINA,
        }),
      );
      const cap = byId('trends-gdp-caption');
      if (cap) {
        cap.textContent =
          mode === 'per-capita'
            ? 'GDP per capita, current US$ (World Bank WDI; 2016-2023 computed from GDP ÷ population).'
            : 'GDP in current US$ (World Bank WDI, July 2026 update). The 2020-2021 jump is mostly the yuan’s appreciation, not a surge in output.';
      }
    };
    draw('total');
    document.querySelectorAll('[data-trends-gdp-toggle] button').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-trends-gdp-toggle] button').forEach((b) => b.setAttribute('aria-pressed', 'false'));
        btn.setAttribute('aria-pressed', 'true');
        draw(btn.dataset.mode);
      });
    });
  }

  const pop = byId('chart-trends-pop');
  if (pop) {
    renderInto(
      pop,
      lineChart(
        POPULATION_MID.map((d) => ({ label: d.year, value: d.value })),
        { unit: '', decimals: 2, color: NAVY, domain: [13, 15] },
      ),
    );
  }

  const pc = byId('chart-trends-percapita');
  if (pc) {
    renderInto(
      pc,
      lineChart(
        GDP_PER_CAPITA.map((d) => ({ label: d.year, value: d.value })),
        { decimals: 0, color: TEAL },
      ),
    );
  }

  const table = byId('table-trends');
  if (table) {
    const tbody = table.querySelector('tbody');
    const fmtNum = (v, d = 0) =>
      v.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
    tbody.innerHTML = GDP_USD.map((d, i) => {
      const pop = POPULATION_MID[i].value;
      const pcVal = GDP_PER_CAPITA[i].value;
      const change = (((d.value - GDP_USD[0].value) / GDP_USD[0].value) * 100).toFixed(1);
      return `<tr><td><strong>${d.year}</strong></td><td>${fmtNum(d.value, 2)}</td><td>${fmtNum(pop * 100, 1)}</td><td>${fmtNum(pcVal)}</td><td>${i === 0 ? '—' : `+${change}%`}</td></tr>`;
    }).join('');
  }
}

// ---- Economy --------------------------------------------------------------
function renderEconomy() {
  const gdp = byId('chart-gdp-long');
  if (gdp) {
    renderInto(
      gdp,
      lineChart(
        GDP_USD.map((d) => ({ label: d.year, value: d.value })),
        { decimals: 2, color: CHINA },
      ),
    );
  }
  const q = byId('chart-quarters');
  if (q) {
    renderInto(
      q,
      barChart(
        GROWTH_QUARTER_2024.map((d) => ({ label: d.label, value: d.value })),
        { unit: '%', decimals: 1, colors: [TEAL] },
      ),
    );
  }
  const annual = byId('chart-growth-annual');
  if (annual) {
    renderInto(
      annual,
      barChart(
        GROWTH_ANNUAL.map((d) => ({ label: d.year, value: d.value })),
        { unit: '%', decimals: 1, colors: [NAVY] },
      ),
    );
  }
  const drivers = byId('chart-drivers');
  if (drivers) {
    renderInto(
      drivers,
      hbarChart(
        GROWTH_DRIVERS.map((d) => ({ label: d.label, value: d.value, color: d.value >= 2 ? CHINA : NAVY })),
        { unit: ' pp', decimals: 1, max: 2.5 },
      ),
    );
  }
  const ind = byId('chart-industry');
  if (ind) {
    const draw = (mode) => {
      if (mode === 'value') {
        renderInto(
          ind,
          hbarChart(
            INDUSTRY_2024.map((d) => ({
              label: d.name.replace(/ \(.*/, ''),
              value: d.value,
              color: d.name.startsWith('Primary') ? GOLD : d.name.startsWith('Secondary') ? NAVY : CHINA,
            })),
            { unit: '', decimals: 0, max: 80000 },
          ),
        );
        const cap = byId('industry-caption');
        if (cap) cap.textContent = 'Value added in 2024, billion yuan (NBS 2024 communique). Total GDP: ¥1,349,084bn.';
      } else {
        renderInto(
          ind,
          donut(
            INDUSTRY_2024.map((d) => ({
              label: d.name,
              value: d.share,
              color: d.name.startsWith('Primary') ? GOLD : d.name.startsWith('Secondary') ? NAVY : CHINA,
            })),
            { centre: '56.7%', size: 240 },
          ),
        );
        const cap = byId('industry-caption');
        if (cap) cap.textContent = 'Share of GDP in 2024. Services are 56.7% of the economy; the centre number is the services share.';
      }
    };
    draw('share');
    document.querySelectorAll('[data-industry-toggle] button').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-industry-toggle] button').forEach((b) => b.setAttribute('aria-pressed', 'false'));
        btn.setAttribute('aria-pressed', 'true');
        draw(btn.dataset.mode);
      });
    });
  }
  const ppp = byId('chart-ppp');
  if (ppp) {
    renderInto(
      ppp,
      hbarChart(
        GDP_PPP_2024.map((d) => ({ label: d.name, value: d.value, color: d.name === 'China' ? CHINA : NAVY })),
        { unit: '', decimals: 2, max: 40 },
      ),
    );
  }
}

// ---- People ---------------------------------------------------------------
function renderPeople() {
  const pop = byId('chart-population-long');
  if (pop) {
    renderInto(
      pop,
      lineChart(
        POPULATION_MID.map((d) => ({ label: d.year, value: d.value })),
        { decimals: 2, color: NAVY, domain: [13, 15] },
      ),
    );
  }
  const bd = byId('chart-births-deaths');
  if (bd) {
    renderInto(
      bd,
      groupedBars(
        BIRTHS_DEATHS.map((d) => ({ label: d.year, a: d.births, b: d.deaths })),
        { unit: 'm', decimals: 2, aLabel: 'Births', bLabel: 'Deaths', colors: [TEAL, CHINA] },
      ),
    );
  }
  const urb = byId('chart-urban');
  if (urb) {
    renderInto(
      urb,
      lineChart(
        URBAN_RATE.map((d) => ({ label: d.year, value: d.value })),
        { unit: '%', decimals: 1, color: TEAL, domain: [50, 70] },
      ),
    );
  }
  const age = byId('chart-age');
  if (age) {
    renderInto(
      age,
      hbarChart(
        AGE_2024.map((d) => ({ label: d.band, value: d.value, color: d.band === 'Aged 60+' ? CHINA : NAVY })),
        { unit: 'm', decimals: 0, max: 900 },
      ),
    );
  }
}

// ---- Compare --------------------------------------------------------------
const METRICS = {
  gdp: { label: 'GDP ($ trillion)', get: (c) => c.gdp, decimals: 2, unit: '' },
  gdpPerCapita: { label: 'GDP per capita ($)', get: (c) => c.gdpPerCapita, decimals: 0, unit: '' },
  pop: { label: 'Population (100m people)', get: (c) => c.pop, decimals: 2, unit: '' },
  growth: { label: 'Real GDP growth (%)', get: (c) => c.growth, decimals: 1, unit: '%' },
  life: { label: 'Life expectancy (years)', get: (c) => c.life, decimals: 1, unit: '' },
};

function renderCompare() {
  const chart = byId('chart-compare');
  if (!chart) return;
  const draw = (key) => {
    const m = METRICS[key];
    const items = [...COMPARE_2024]
      .sort((a, b) => m.get(b) - m.get(a))
      .map((c) => ({ label: c.name, value: m.get(c), color: c.name === 'China' ? CHINA : NAVY }));
    renderInto(chart, hbarChart(items, { decimals: m.decimals, unit: m.unit }));
    const cap = byId('compare-caption');
    if (cap) cap.textContent = `${m.label}, 2024 (World Bank WDI, July 2026 update). China is shown in red.`;
  };
  draw('gdp');
  document.querySelectorAll('[data-compare-toggle] button').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-compare-toggle] button').forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      draw(btn.dataset.mode);
    });
  });

  // Sortable table: click a column header to sort by that column.
  const table = byId('compare-table');
  if (table) {
    const tbody = table.querySelector('tbody');
    const rows = [...tbody.rows];
    table.querySelectorAll('th button.sort').forEach((btn) => {
      btn.addEventListener('click', () => {
        const col = Number(btn.dataset.col);
        const numeric = btn.dataset.numeric === '1';
        const dir = btn.dataset.dir === 'asc' ? -1 : 1;
        btn.dataset.dir = dir === 1 ? 'asc' : 'desc';
        table.querySelectorAll('th button.sort').forEach((b) => {
          if (b !== btn) delete b.dataset.dir;
        });
        rows
          .sort((a, b) => {
            const av = a.cells[col].textContent.trim();
            const bv = b.cells[col].textContent.trim();
            const cmp = numeric ? Number(av.replace(/[^0-9.-]/g, '')) - Number(bv.replace(/[^0-9.-]/g, '')) : av.localeCompare(bv);
            return cmp * dir;
          })
          .forEach((r) => tbody.appendChild(r));
      });
    });
  }
}

// ---- Employment -----------------------------------------------------------
function renderEmployment() {
  const sectors = byId('chart-sectors');
  if (sectors) {
    renderInto(
      sectors,
      donut(
        EMPLOYMENT_SECTORS.map((d) => ({ label: d.name, value: d.value, color: d.color })),
        { centre: '48.8%', size: 240 },
      ),
    );
  }
  const urban = byId('chart-urban-jobs');
  if (urban) {
    renderInto(
      urban,
      hbarChart(
        [
          { label: 'Employed, total', value: 734.39, color: NAVY },
          { label: 'Employed in towns and cities', value: 473.45, color: CHINA },
          { label: 'Migrant workers', value: 299.73, color: TEAL },
        ],
        { unit: 'm', decimals: 0, max: 800 },
      ),
    );
  }
}

// ---- Energy ---------------------------------------------------------------
function renderEnergy() {
  const nev = byId('chart-nev');
  if (nev) {
    renderInto(
      nev,
      hbarChart(
        [
          { label: 'New-energy vehicles produced', value: parseFloat(ENERGY_2024.nevOutput), color: CHINA },
          { label: 'Ten million a year, the old milestone', value: 10, color: NAVY },
        ],
        { unit: 'm', decimals: 2, max: 14 },
      ),
    );
  }
}

// ---- Trade ----------------------------------------------------------------
function renderTrade() {
  const flows = byId('chart-trade');
  if (flows) {
    renderInto(
      flows,
      barChart(
        [
          { label: 'Exports', value: TRADE_2024.exports },
          { label: 'Imports', value: TRADE_2024.imports },
        ],
        { unit: '', decimals: 2, colors: [CHINA, NAVY] },
      ),
    );
  }
  const balance = byId('chart-balance');
  if (balance) {
    renderInto(
      balance,
      hbarChart(
        [
          { label: 'Exports', value: TRADE_2024.exports, color: CHINA },
          { label: 'Imports', value: TRADE_2024.imports, color: NAVY },
          { label: 'Trade surplus', value: TRADE_2024.surplus, color: TEAL },
        ],
        { unit: '', decimals: 2, max: 27 },
      ),
    );
  }
}

// ---- boot -----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (page === 'overview') renderOverview();
  if (page === 'trends') renderTrends();
  if (page === 'economy') renderEconomy();
  if (page === 'people') renderPeople();
  if (page === 'compare') renderCompare();
  if (page === 'employment') renderEmployment();
  if (page === 'trade') renderTrade();
  if (page === 'energy') renderEnergy();
  window.__shotReady = true;
});
