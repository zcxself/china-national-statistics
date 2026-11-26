// Small SVG chart builders. No libraries, no network: every chart is drawn
// from the numbers in data.js and rendered as inline SVG, so the page works
// offline and a screenshot shows the real figures.

const GRID = '#dfe6ee';

function el(tag, attrs = {}, text = '') {
  const a = Object.entries(attrs)
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ');
  return `<${tag} ${a}>${text}</${tag}>`;
}

function niceMax(max) {
  const pow = 10 ** Math.floor(Math.log10(max));
  const n = max / pow;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return step * pow;
}

function fmt(v, digits = 0) {
  return v.toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

// Line chart with dots and value labels. points: [{label, value}].
// options: {unit, decimals, color, height, domain} — domain [lo, hi] zooms
// the y-axis (e.g. population 13-15) so small changes stay visible.
export function lineChart(points, options = {}) {
  const { unit = '', decimals = 0, color = '#b42318', height = 260 } = options;
  const width = 720;
  const padL = 56;
  const padR = 16;
  const padT = 18;
  const padB = 34;
  const iw = width - padL - padR;
  const ih = height - padT - padB;
  const hi = options.domain ? options.domain[1] : niceMax(Math.max(...points.map((p) => p.value)) * 1.08);
  const lo = options.domain ? options.domain[0] : 0;
  const x = (i) => padL + (i * iw) / (points.length - 1);
  const y = (v) => padT + ih - ((v - lo) / (hi - lo)) * ih;
  const grid = [0, 0.25, 0.5, 0.75, 1]
    .map((f) => {
      const v = lo + (hi - lo) * f;
      const yy = y(v);
      return (
        el('line', { x1: padL, x2: width - padR, y1: yy, y2: yy, stroke: GRID, 'stroke-width': 1 }) +
        el('text', { x: padL - 8, y: yy + 4, 'text-anchor': 'end', class: 'axis' }, fmt(v, decimals))
      );
    })
    .join('');
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const area = `${path} L${x(points.length - 1).toFixed(1)},${padT + ih} L${x(0).toFixed(1)},${padT + ih} Z`;
  const dots = points
    .map((p, i) => {
      // The first label is anchored to the right of its dot and the last to
      // the left, so neither collides with the y-axis labels or the edge.
      const anchor = i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle';
      const lx = i === 0 ? x(i) + 8 : i === points.length - 1 ? x(i) - 8 : x(i);
      return (
        el('circle', { cx: x(i).toFixed(1), cy: y(p.value).toFixed(1), r: 4, fill: color, stroke: '#fff', 'stroke-width': 1.5 }) +
        el(
          'text',
          { x: lx.toFixed(1), y: y(p.value).toFixed(1) - 10, 'text-anchor': anchor, class: 'val' },
          `${fmt(p.value, decimals)}${unit}`,
        )
      );
    })
    .join('');
  const labels = points
    .map((p, i) => el('text', { x: x(i).toFixed(1), y: height - 10, 'text-anchor': 'middle', class: 'axis' }, String(p.label)))
    .join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Line chart">${grid}<path d="${area}" fill="${color}" opacity="0.10"/><path d="${path}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>${dots}${labels}</svg>`;
}

// Vertical bar chart. items: [{label, value}]. options: {unit, decimals, colors, height}
export function barChart(items, options = {}) {
  const { unit = '', decimals = 0, colors = ['#16324f'], height = 260 } = options;
  const width = 720;
  const padL = 56;
  const padR = 16;
  const padT = 26;
  const padB = 34;
  const iw = width - padL - padR;
  const ih = height - padT - padB;
  const max = niceMax(Math.max(...items.map((d) => d.value)) * 1.1);
  const min = Math.min(0, ...items.map((d) => d.value));
  const lo = min < 0 ? niceMax(Math.abs(min) * 1.1) * -1 : 0;
  const y = (v) => padT + ih - ((v - lo) / (max - lo)) * ih;
  const zeroY = y(0);
  const grid = [0, 0.25, 0.5, 0.75, 1]
    .map((f) => {
      const v = lo + (max - lo) * f;
      const yy = y(v);
      return (
        el('line', { x1: padL, x2: width - padR, y1: yy, y2: yy, stroke: GRID, 'stroke-width': 1 }) +
        el('text', { x: padL - 8, y: yy + 4, 'text-anchor': 'end', class: 'axis' }, fmt(v, decimals))
      );
    })
    .join('');
  const slot = iw / items.length;
  const bw = Math.min(64, slot * 0.62);
  const bars = items
    .map((d, i) => {
      const cx = padL + slot * (i + 0.5);
      const top = y(Math.max(d.value, 0));
      const bottom = d.value >= 0 ? zeroY : y(d.value);
      const color = colors[i % colors.length];
      const h = Math.max(1, bottom - top);
      return (
        el('rect', { x: (cx - bw / 2).toFixed(1), y: top.toFixed(1), width: bw.toFixed(1), height: h.toFixed(1), rx: 3, fill: color }) +
        el(
          'text',
          { x: cx.toFixed(1), y: (d.value >= 0 ? top - 8 : bottom + 16).toFixed(1), 'text-anchor': 'middle', class: 'val' },
          `${fmt(d.value, decimals)}${unit}`,
        ) +
        el('text', { x: cx.toFixed(1), y: height - 10, 'text-anchor': 'middle', class: 'axis' }, String(d.label))
      );
    })
    .join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Bar chart">${grid}${bars}</svg>`;
}

// Horizontal bars with a label on the left and the value on the right.
// items: [{label, value, color?}]. options: {unit, decimals, max, height}
export function hbarChart(items, options = {}) {
  const { unit = '', decimals = 0, height = 260 } = options;
  const width = 720;
  const labelW = 190;
  const valueW = 90;
  const max = options.max ?? niceMax(Math.max(...items.map((d) => d.value)) * 1.05);
  const rowH = (height - 16) / items.length;
  const barMax = width - labelW - valueW;
  const rows = items
    .map((d, i) => {
      const y = 8 + i * rowH;
      const w = Math.max(2, (d.value / max) * barMax);
      return (
        el('text', { x: 0, y: y + rowH / 2 + 4, class: 'axis' }, String(d.label)) +
        el('rect', { x: labelW, y: y + 6, width: w.toFixed(1), height: Math.max(10, rowH - 18), rx: 3, fill: d.color ?? '#16324f' }) +
        el('text', { x: labelW + w + 10, y: y + rowH / 2 + 4, class: 'val' }, `${fmt(d.value, decimals)}${unit}`)
      );
    })
    .join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Horizontal bar chart">${rows}</svg>`;
}

// Donut chart with a centre label. slices: [{label, value, color}].
export function donut(slices, options = {}) {
  const { size = 240, centre = '' } = options;
  const total = slices.reduce((s, d) => s + d.value, 0);
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const hole = r * 0.58;
  let a0 = -Math.PI / 2;
  const paths = slices
    .map((d) => {
      const a1 = a0 + (d.value / total) * Math.PI * 2;
      const large = a1 - a0 > Math.PI ? 1 : 0;
      const x0 = cx + r * Math.cos(a0);
      const y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1);
      const y1 = cy + r * Math.sin(a1);
      const xi1 = cx + hole * Math.cos(a1);
      const yi1 = cy + hole * Math.sin(a1);
      const xi0 = cx + hole * Math.cos(a0);
      const yi0 = cy + hole * Math.sin(a0);
      a0 = a1;
      return `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${xi1.toFixed(1)},${yi1.toFixed(1)} A${hole},${hole} 0 ${large} 0 ${xi0.toFixed(1)},${yi0.toFixed(1)} Z" fill="${d.color}" stroke="#fff" stroke-width="2"><title>${d.label}: ${fmt(d.value, 1)}%</title></path>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="Donut chart" style="max-width:${size}px">${paths}<text x="${cx}" y="${cy - 2}" text-anchor="middle" class="donut-centre">${centre}</text></svg>`;
}

// Grouped bars for two series (e.g. births vs deaths). items: [{label, a, b}].
export function groupedBars(items, options = {}) {
  const { unit = '', decimals = 0, aLabel = 'A', bLabel = 'B', colors = ['#16324f', '#b42318'], height = 260 } = options;
  const width = 720;
  const padL = 56;
  const padR = 16;
  const padT = 26;
  const padB = 34;
  const iw = width - padL - padR;
  const ih = height - padT - padB;
  const max = niceMax(Math.max(...items.flatMap((d) => [d.a, d.b])) * 1.12);
  const y = (v) => padT + ih - (v / max) * ih;
  const grid = [0, 0.25, 0.5, 0.75, 1]
    .map((f) => {
      const v = max * f;
      const yy = y(v);
      return (
        el('line', { x1: padL, x2: width - padR, y1: yy, y2: yy, stroke: GRID, 'stroke-width': 1 }) +
        el('text', { x: padL - 8, y: yy + 4, 'text-anchor': 'end', class: 'axis' }, fmt(v, decimals))
      );
    })
    .join('');
  const slot = iw / items.length;
  const bw = Math.min(44, slot * 0.3);
  const bars = items
    .map((d, i) => {
      const cx = padL + slot * (i + 0.5);
      const pair = [
        { v: d.a, c: colors[0], dx: -bw - 3 },
        { v: d.b, c: colors[1], dx: 3 },
      ];
      return (
        pair
          .map(
            (p) =>
              el('rect', { x: (cx + p.dx).toFixed(1), y: y(p.v).toFixed(1), width: bw, height: Math.max(1, padT + ih - y(p.v)).toFixed(1), rx: 3, fill: p.c }) +
              el('text', { x: (cx + p.dx + bw / 2).toFixed(1), y: y(p.v).toFixed(1) - 7, 'text-anchor': 'middle', class: 'val' }, `${fmt(p.v, decimals)}${unit}`),
          )
          .join('') + el('text', { x: cx.toFixed(1), y: height - 10, 'text-anchor': 'middle', class: 'axis' }, String(d.label))
      );
    })
    .join('');
  const legend = `<g class="legend" transform="translate(${padL},2)"><rect x="0" y="0" width="12" height="12" fill="${colors[0]}"/><text x="17" y="11">${aLabel}</text><rect x="90" y="0" width="12" height="12" fill="${colors[1]}"/><text x="107" y="11">${bLabel}</text></g>`;
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Grouped bar chart">${grid}${legend}${bars}</svg>`;
}
