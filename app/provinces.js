// Wiring for the Provinces page only: the top-10 charts and the sortable
// table of all 31 provinces. This module loads on provinces.html alone, so
// the 31-province data stays out of the overview's first load. Runs entirely
// offline; window.__shotReady tells a screenshot script when it is done.

import { PROVINCES, PROVINCE_NOTES } from './provinces-data.js';
import { hbarChart } from './charts.js';

window.__shotReady = false;

const byId = (id) => document.getElementById(id);
const CHINA = '#b42318';
const NAVY = '#16324f';

function fmt(v, digits = 0) {
  return v.toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function renderCharts() {
  const gdp = byId('chart-prov-gdp');
  if (gdp) {
    const top10 = [...PROVINCES].sort((a, b) => b.gdpBn - a.gdpBn).slice(0, 10);
    gdp.innerHTML = hbarChart(
      top10.map((p, i) => ({ label: p.name, value: p.gdpBn, color: i === 0 ? CHINA : NAVY })),
      { decimals: 0, max: 150000 },
    );
  }
  const pc = byId('chart-prov-percapita');
  if (pc) {
    const top10 = [...PROVINCES].sort((a, b) => b.perCapita - a.perCapita).slice(0, 10);
    pc.innerHTML = hbarChart(
      top10.map((p, i) => ({ label: p.name, value: p.perCapita, color: i === 0 ? CHINA : NAVY })),
      { decimals: 0, max: 240000 },
    );
  }
}

// Fill the table from PROVINCES (already in GDP order) and make every
// numeric column sortable; the rank column is renumbered after each sort.
function renderTable() {
  const table = byId('table-prov');
  if (!table) return;
  const tbody = table.querySelector('tbody');
  PROVINCES.forEach((p, i) => {
    const tr = document.createElement('tr');
    const change = p.popChange10k > 0 ? `+${p.popChange10k}` : String(p.popChange10k);
    tr.innerHTML =
      `<td>${i + 1}</td>` +
      `<td><strong>${p.name}</strong></td>` +
      `<td>${fmt(p.pop10k / 100, 2)}</td>` +
      `<td>${change}</td>` +
      `<td>${fmt(p.gdpBn)}</td>` +
      `<td>${fmt(p.gdpUsdBn)}</td>` +
      `<td>${p.growth.toFixed(1)}%</td>` +
      `<td>${fmt(p.perCapita)}</td>` +
      `<td>${fmt(p.perCapitaUsd)}</td>`;
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
  const el = byId('prov-notes');
  if (el) {
    el.textContent =
      `The top 5 provinces hold ${PROVINCE_NOTES.top5Share} of the 31-province GDP and the top 10 hold ${PROVINCE_NOTES.top10Share}. ` +
      `Only ${PROVINCE_NOTES.growingCount} of the 31 grew in population in 2024. Fastest-growing economy: ${PROVINCE_NOTES.fastestGrowth}; slowest: ${PROVINCE_NOTES.slowestGrowth}. ` +
      `Richest per person: ${PROVINCE_NOTES.richestPerCapita}; lowest: ${PROVINCE_NOTES.poorestPerCapita}; the national average is ${PROVINCE_NOTES.nationalPerCapita}.`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderCharts();
  renderTable();
  renderNotes();
  window.__shotReady = true;
});
