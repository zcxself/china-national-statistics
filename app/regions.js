// Wiring for the Regions page only: the concentration, growth and
// per-capita charts plus the top-five / bottom-five table. This module
// loads on regions.html alone, so the 31-province data stays out of the
// overview's first load. Runs entirely offline; window.__shotReady tells
// a screenshot script when it is done.

import { PROVINCES } from './provinces-data.js';
import { hbarChart } from './charts.js';

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

const TOTAL_GDP = PROVINCES.reduce((s, p) => s + p.gdpBn, 0);
const share = (p) => (p.gdpBn / TOTAL_GDP) * 100;

function renderCharts() {
  const shareEl = byId('chart-region-share');
  if (shareEl) {
    const top10 = [...PROVINCES].sort((a, b) => b.gdpBn - a.gdpBn).slice(0, 10);
    shareEl.innerHTML = hbarChart(
      top10.map((p, i) => ({ label: p.name, value: share(p), color: i < 5 ? CHINA : NAVY })),
      { unit: '%', decimals: 1, max: 12, height: 300 },
    );
  }

  const growthEl = byId('chart-region-growth');
  if (growthEl) {
    const byGrowth = [...PROVINCES].sort((a, b) => b.growth - a.growth);
    const fastest = byGrowth.slice(0, 5);
    const slowest = byGrowth.slice(-5).reverse();
    growthEl.innerHTML = hbarChart(
      [...fastest, ...slowest].map((p) => ({
        label: p.name,
        value: p.growth,
        color: p.growth >= 5.8 ? CHINA : p.growth <= 3.2 ? TEAL : NAVY,
      })),
      { unit: '%', decimals: 1, max: 7, height: 300 },
    );
  }

  const richEl = byId('chart-region-rich');
  if (richEl) {
    const richest = [...PROVINCES].sort((a, b) => b.perCapita - a.perCapita).slice(0, 5);
    richEl.innerHTML = hbarChart(
      richest.map((p, i) => ({ label: p.name, value: p.perCapita, color: i === 0 ? CHINA : NAVY })),
      { decimals: 0, max: 250000, height: 220 },
    );
  }

  const poorEl = byId('chart-region-poor');
  if (poorEl) {
    const poorest = [...PROVINCES].sort((a, b) => a.perCapita - b.perCapita).slice(0, 5);
    poorEl.innerHTML = hbarChart(
      poorest.map((p, i) => ({ label: p.name, value: p.perCapita, color: i === 0 ? CHINA : TEAL })),
      { decimals: 0, max: 250000, height: 220 },
    );
  }
}

function renderTable() {
  const table = byId('table-regions');
  if (!table) return;
  const tbody = table.querySelector('tbody');
  const byGdp = [...PROVINCES].sort((a, b) => b.gdpBn - a.gdpBn);
  const top = byGdp.slice(0, 5);
  const bottom = byGdp.slice(-5).reverse();
  const row = (p) =>
    `<tr><td><strong>${p.name}</strong></td>` +
    `<td>${fmt(p.gdpBn)}</td><td>${fmt(p.gdpUsdBn)}</td><td>${share(p).toFixed(1)}%</td>` +
    `<td>${(p.pop10k / 100).toFixed(2)}</td><td>${fmt(p.perCapita)}</td><td>${p.growth.toFixed(1)}%</td></tr>`;
  tbody.innerHTML =
    top.map(row).join('') +
    `<tr><td colspan="7" style="color:#5b6b7c;font-size:13px">The five smallest economies ↓</td></tr>` +
    bottom.map(row).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderCharts();
  renderTable();
  window.__shotReady = true;
});
