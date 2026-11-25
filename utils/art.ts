let uid = 0;

const SHOE_FORE = 'M66,2 C100,4 121,40 117,90 C114,130 101,156 97,186 L31,186 C26,160 6,130 6,86 C6,36 32,0 66,2 Z';
const SHOE_HEEL = 'M33,214 C35,201 93,201 95,214 L96,262 C96,293 33,293 31,262 Z';

function paintDefs(id: number) {
  return `<filter id="paint-${id}" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G" result="d"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="11" result="g"/>
      <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.1 0 0 0 1.45" result="ga"/>
      <feComposite in="d" in2="ga" operator="in"/>
    </filter>
    <filter id="concrete-${id}">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="5"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.2  0 0 0 0 0.2  0 0 0 0 0.2  0 0 0 -0.9 0.6"/>
    </filter>
    <filter id="blotch-${id}">
      <feTurbulence type="fractalNoise" baseFrequency="0.006" numOctaves="3" seed="2"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.25  0 0 0 0 0.24  0 0 0 0 0.22  0 0 0 -1.6 1.0"/>
    </filter>`;
}

const pair = (id: number, x: number, y: number, s = 1, extra = '') => `<g transform="translate(${x},${y}) scale(${s})" filter="url(#paint-${id})" class="feet-paint" ${extra}>
    <g transform="translate(0,0) rotate(-4 64 150)"><path d="${SHOE_FORE}" transform="translate(128,0) scale(-1,1)"/><path d="${SHOE_HEEL}" transform="translate(128,0) scale(-1,1)"/></g>
    <g transform="translate(150,0) rotate(4 64 150)"><path d="${SHOE_FORE}"/><path d="${SHOE_HEEL}"/></g>
  </g>`;

function floor(id: number, w: number, h: number) {
  return `<rect width="${w}" height="${h}" fill="#a29e96"/>
    <rect width="${w}" height="${h}" filter="url(#blotch-${id})"/>
    <rect width="${w}" height="${h}" filter="url(#concrete-${id})"/>
    <path d="M0,${h * 0.18} L${w},${h * 0.16}" stroke="#7d7972" stroke-width="3" opacity=".5"/>
    <path d="M${w * 0.12},${h} L${w * 0.2},0" stroke="#8c8880" stroke-width="2" opacity=".35"/>
    <path d="M${w * 0.4},${h * 0.55} c40,-6 80,10 140,2" stroke="#6f6b64" stroke-width="2" fill="none" opacity=".35"/>`;
}

function feet({ w = 1600, h = 900, scale = 1.25, cls = '' }: { w?: number, h?: number, scale?: number, cls?: string } = {}) {
  const id = ++uid;
  const pw = 278 * scale, ph = 290 * scale;
  return `<svg class="feet ${cls}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice"><defs>${paintDefs(id)}</defs>
    ${floor(id, w, h)}
    ${pair(id, (w - pw) / 2, (h - ph) / 2, scale)}
  </svg>`;
}

function gauge(x: number, y: number, r: number, angle: number, cls = '') {
  const ticks = Array.from({ length: 9 }, (_, i) => {
    const a = (-225 + i * 33.75) * Math.PI / 180;
    return `<line x1="${x + Math.cos(a) * (r - 4)}" y1="${y + Math.sin(a) * (r - 4)}" x2="${x + Math.cos(a) * (r - 13)}" y2="${y + Math.sin(a) * (r - 13)}"/>`;
  }).join('');
  const a = (-225 + angle) * Math.PI / 180;
  return `<g class="gauge ${cls}"><circle cx="${x}" cy="${y}" r="${r}" class="g-face"/>${ticks}<line class="g-needle" x1="${x}" y1="${y}" x2="${x + Math.cos(a) * (r - 16)}" y2="${y + Math.sin(a) * (r - 16)}"/><circle cx="${x}" cy="${y}" r="4" class="g-hub"/></g>`;
}

const person = (x: number, y: number, cls = '') => `<g class="person ${cls}" transform="translate(${x},${y})">
    <circle cx="0" cy="-150" r="20"/><rect x="-22" y="-124" width="44" height="78" rx="18"/>
    <rect x="-19" y="-52" width="15" height="58" rx="7"/><rect x="4" y="-52" width="15" height="58" rx="7"/>
    <rect x="22" y="-110" width="30" height="40" rx="3" class="clip"/>
  </g>`;

function factory() {
  const id = ++uid;
  const gx = [180, 340, 500, 660, 820, 980, 1140];
  const ang = [120, 60, 200, 150, 90, 230, 30];
  const gauges = gx.map((x, i) => gauge(x, 190, 52, ang[i])).join('');
  const feetPairs = gx.map((x, i) => pair(id, x - 26, 455, 0.19, `data-in="4" style="transition-delay:${i * 90}ms"`)).join('');
  const sheetRows: [string, string, string, boolean][] = [
    ['P1', '4.2', '4.2', false], ['P2', '1.8', '7.1', true], ['T1', '63', '68', true], ['T2', '41', '41', false],
    ['F1', '220', '20', true], ['V1', '0.6', '0.6', false],
  ];
  const sheet = sheetRows.map(([k, ok, bad, wrong], i) => `<g transform="translate(0,${i * 40})">
      <text x="20" y="0" class="sh-k">${k}</text>
      <text x="90" y="0" class="sh-v ${wrong ? 'wrong' : ''}" data-out="5">${wrong ? bad : ok}</text>
      ${wrong ? `<g data-only="2,3"><line x1="82" y1="-8" x2="150" y2="-8" class="sh-x"/></g>` : ''}
      <text x="90" y="0" class="sh-v" data-in="5">${ok}</text>
    </g>`).join('');
  const plan: [string, number, number][] = [
    ['Tablet app', 110, 30], ['OCR service', 380, 30], ['Sync backend', 650, 30], ['Database', 920, 30],
    ['Dashboards', 110, 120], ['Maintenance', 380, 120], ['Ops & on-call', 650, 120], ['Licences', 920, 120],
  ];
  return `<svg class="factory" viewBox="0 0 1600 640"><defs>${paintDefs(id)}</defs>
    <rect x="0" y="380" width="1600" height="260" class="fl"/>
    <rect x="90" y="90" width="1140" height="200" rx="6" class="wall"/>
    ${gauges}
    <line x1="0" y1="380" x2="1600" y2="380" class="fl-line"/>
    <g class="walker" data-in="1" data-out="4">${person(0, 360, 'walking')}</g>
    <g data-in="4">${person(820, 520, 'standing')}</g>
    ${feetPairs}
    <g class="plan" data-only="3"><rect x="90" y="0" width="1140" height="250" rx="10" class="plan-bg"/>${plan.map(([t, x, y]) => `<g><rect x="${x}" y="${y}" width="250" height="56" rx="8"/><text x="${x + 125}" y="${y + 35}">${t}</text></g>`).join('')}<text x="1210" y="230" class="plan-cost">€ millions</text></g>
    <g class="sheet" transform="translate(1320,110)" data-in="1"><rect x="0" y="-30" width="210" height="270" rx="8"/><g transform="translate(0,20)">${sheet}</g></g>
  </svg>`;
}

function pareto() {
  return `<svg class="pareto" viewBox="0 0 1400 560">
    <text x="0" y="40" class="p-h">The book</text>
    <text x="0" y="330" class="p-h">The value</text>
    <g data-in="1"><rect x="0" y="60" width="280" height="110" class="p-strat"/><text x="20" y="125" class="p-big">20%</text>
      <path d="M0,170 L280,170 L1120,350 L0,350 Z" class="p-flow strat"/>
      <rect x="0" y="350" width="1120" height="110" class="p-strat"/><text x="20" y="415" class="p-big">80%</text>
      <text x="0" y="500" class="p-l">ubiquitous language · bounded contexts · anti-corruption layers · talking to the domain experts</text></g>
    <g data-in="2"><rect x="290" y="60" width="1110" height="110" class="p-tact"/><text x="1380" y="125" class="p-big r">80%</text>
      <path d="M290,170 L1400,170 L1400,350 L1130,350 Z" class="p-flow tact"/>
      <rect x="1130" y="350" width="270" height="110" class="p-tact"/><text x="1380" y="415" class="p-big r">20%</text>
      <text x="1400" y="40" class="p-l r">aggregates · entities · value objects · repositories · factories · domain events</text></g>
    <g data-in="3"><text x="845" y="245" class="p-tag">what we copy</text><text x="140" y="245" class="p-tag">what we skip</text></g>
  </svg>`;
}

function miniCathedral() {
  const cells: string[] = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
    cells.push(`<rect x="${c * 110}" y="${r * 90}" width="100" height="80" rx="6" class="mc-r"/>`);
    for (let k = 0; k < 6; k++) cells.push(`<rect x="${c * 110 + 8 + (k % 2) * 44}" y="${r * 90 + 12 + Math.floor(k / 2) * 21}" width="40" height="15" rx="2" class="mc-f"/>`);
  }
  return `<svg class="mini" viewBox="-4 -4 334 274">${cells.join('')}</svg>`;
}

export const ART: Record<string, (o?: any) => string> = { feet, factory, pareto, miniCathedral };
