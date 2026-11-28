// Wiring for the Cities page only: the GDP and per-capita charts and the
// sortable table of China's ten largest city economies in 2024. This module
// loads on cities.html alone, so the city data stays out of the overview's
// first load. Runs entirely offline; window.__shotReady tells a screenshot
// script when it is done.

import { CITIES_WITH_PER_CAPITA, CITY_NOTES } from './cities-data.js';
import { barChart, hbarChart } from './charts.js';

window.__shotReady = false;

const byId = (id) => document.getElementById(id);
const CHINA = '#b42318';
const NAVY = '#16324f';
const TEAL = '#2e7d6b';

function fmt(v, digits = 0) {
  return v.toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function renderCharts() {
  const gdp = byId('chart-city-gdp');
  if (gdp) {
    gdp.innerHTML = barChart(
      [...CITIES_WITH_PER_CAPITA].map((c) => ({ label: c.name, value: c.gdpBn })),
      { decimals: 0, colors: [NAVY] },
    );
  }
  const pc = byId('chart-city-percapita');
  if (pc) {
    const top = [...CITIES_WITH_PER_CAPITA].sort((a, b) => b.perCapita - a.perCapita);
    pc.innerHTML = hbarChart(
      top.map((c, i) => ({ label: c.name, value: c.perCapita, color: i === 0 ? CHINA : NAVY })),
      { decimals: 0, max: 240000 },
    );
  }
}

function renderTable() {
  const table = byId('cities-table');
  if (!table) return;
  const tbody = table.querySelector('tbody');
  CITIES_WITH_PER_CAPITA.forEach((c, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML =
      `<td>${i + 1}</td>` +
      `<td><strong>${c.name}</strong></td>` +
      `<td>${fmt(c.gdpBn)}</td>` +
      `<td>${c.growth.toFixed(1)}%</td>` +
      `<td>${fmt(c.popM, 2)}</td>` +
      `<td>${fmt(c.perCapita)}</td>`;
    tbody.appendChild(tr);
  });
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
          const cmp = numeric
            ? Number(av.replace(/[^0-9.-]/g, '')) - Number(bv.replace(/[^0-9.-]/g, ''))
            : av.localeCompare(bv);
          return cmp * dir;
        })
        .forEach((r, i) => {
          r.cells[0].textContent = String(i + 1);
          tbody.appendChild(r);
        });
    });
  });
}

function renderNotes() {
  const el = byId('city-notes');
  if (el) {
    el.textContent =
      `${CITY_NOTES.top10Share}. Fastest-growing of the ten: ${CITY_NOTES.fastestGrowth}; slowest: ${CITY_NOTES.slowestGrowth}. ` +
      `Most populous: ${CITY_NOTES.mostPopulous}. Richest per person: ${CITY_NOTES.richestPerCapita}; lowest: ${CITY_NOTES.poorestPerCapita}. ` +
      `In 2024, ${CITY_NOTES.trillionCities} Chinese cities had GDP above ¥1 trillion.`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderCharts();
  renderTable();
  renderNotes();
  window.__shotReady = true;
});
