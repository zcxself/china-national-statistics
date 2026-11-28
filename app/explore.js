// Wiring for the Explore page only: pick an indicator and a chart type and
// the page draws it from the 2015-2024 series in data.js. This module loads
// on explore.html alone. Runs entirely offline; window.__shotReady tells a
// screenshot script when it is done.

import {
  BIRTHS_DEATHS,
  GDP_USD,
  GDP_PER_CAPITA,
  POPULATION_MID,
  URBAN_RATE,
} from './data.js';
import { barChart, groupedBars, lineChart } from './charts.js';

window.__shotReady = false;

const byId = (id) => document.getElementById(id);
const CHINA = '#b42318';
const NAVY = '#16324f';
const TEAL = '#2e7d6b';

const INDICATORS = {
  gdp: {
    label: 'GDP, current US$ ($ trillion)',
    points: () => GDP_USD.map((d) => ({ label: d.year, value: d.value })),
    decimals: 2,
    unit: '',
    color: CHINA,
    source: 'World Bank WDI, July 2026 update.',
  },
  percapita: {
    label: 'GDP per capita, current US$',
    points: () => GDP_PER_CAPITA.map((d) => ({ label: d.year, value: d.value })),
    decimals: 0,
    unit: '',
    color: TEAL,
    source: 'World Bank WDI; 2016-2023 computed from GDP ÷ population.',
  },
  pop: {
    label: 'Population, mid-year (100 million people)',
    points: () => POPULATION_MID.map((d) => ({ label: d.year, value: d.value })),
    decimals: 2,
    unit: '',
    color: NAVY,
    domain: [13, 15],
    source: 'World Bank WDI, mid-year estimates.',
  },
  urban: {
    label: 'Urbanisation rate (% of residents in urban areas)',
    points: () => URBAN_RATE.map((d) => ({ label: d.year, value: d.value })),
    decimals: 1,
    unit: '%',
    color: TEAL,
    domain: [50, 70],
    source: 'NBS, urbanisation rate of permanent residents.',
  },
  births: {
    label: 'Births and deaths (millions per year)',
    grouped: true,
    source: 'NBS communiques 2021-2024.',
  },
};

let indicator = 'gdp';
let chartType = 'line';

function fmt(v, digits = 0) {
  return v.toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function draw() {
  const node = byId('chart-explore');
  const readout = byId('explore-readout');
  const cap = byId('explore-caption');
  if (!node) return;
  const ind = INDICATORS[indicator];
  if (ind.grouped) {
    node.innerHTML = groupedBars(
      BIRTHS_DEATHS.map((d) => ({ label: d.year, a: d.births, b: d.deaths })),
      { unit: 'm', decimals: 2, aLabel: 'Births', bLabel: 'Deaths', colors: [TEAL, CHINA] },
    );
    if (readout) {
      readout.textContent =
        'Births fell from 10.62m in 2021 to 9.54m in 2024 (−10.2%); deaths rose from 10.14m to 10.93m (+7.8%). Deaths have outnumbered births every year since 2022.';
    }
    if (cap) cap.textContent = `${ind.label}, 2021-2024. ${ind.source}`;
    return;
  }
  const points = ind.points();
  const opts = {
    decimals: ind.decimals,
    unit: ind.unit,
    color: ind.color,
    ...(ind.domain ? { domain: ind.domain } : {}),
  };
  node.innerHTML =
    chartType === 'bar'
      ? barChart(points, { ...opts, colors: [ind.color] })
      : lineChart(points, opts);
  const first = points[0];
  const last = points[points.length - 1];
  const change = (((last.value - first.value) / first.value) * 100).toFixed(1);
  const sign = change >= 0 ? '+' : '';
  if (readout) {
    readout.textContent =
      `${ind.label}: ${fmt(first.value, ind.decimals)} in ${first.label} → ${fmt(last.value, ind.decimals)} in ${last.label} ` +
      `(${sign}${change}%). Highest: ${fmt(Math.max(...points.map((p) => p.value)), ind.decimals)}; lowest: ${fmt(Math.min(...points.map((p) => p.value)), ind.decimals)}.`;
  }
  if (cap) cap.textContent = `${ind.label}, 2015-2024. ${ind.source}`;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-explore-indicator] button').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-explore-indicator] button').forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      indicator = btn.dataset.mode;
      draw();
    });
  });
  document.querySelectorAll('[data-explore-type] button').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-explore-type] button').forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      chartType = btn.dataset.mode;
      draw();
    });
  });
  draw();
  window.__shotReady = true;
});
