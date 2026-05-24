// Widget : METAR + TAF + Calcul FL dynamique
// Source METAR : NOAA aviationweather.gov (API publique, pas d'auth)
// Calcul FL → altitude en ft pour un FL donné en fonction du QNH

// Table QNH → correction d'altitude (ISA standard)
// FL = (pression standard - QNH) * 27 pieds + altitude FL standard
// Formule précise : alt_ft = FL * 100 + (1013.25 - QNH_hPa) * 27

const FL_TABLE = [45, 55, 65, 75, 85, 95, 105, 115, 125];

function flToAltQNH(fl, qnh_hpa) {
  const std_alt_ft = fl * 100;
  const correction = (1013.25 - qnh_hpa) * 27;
  return Math.round(std_alt_ft + correction);
}

function formatAlt(ft) {
  const m = Math.round(ft * 0.3048);
  return `${ft.toLocaleString('fr-FR')} ft / ${m.toLocaleString('fr-FR')} m`;
}

function parseMETARqnh(raw) {
  // Cherche Q1023 ou A2992 (format européen et US)
  const euroMatch = raw.match(/Q(\d{4})/);
  if (euroMatch) return parseInt(euroMatch[1], 10);
  const usMatch = raw.match(/A(\d{4})/);
  if (usMatch) return Math.round(parseInt(usMatch[1], 10) * 0.338639); // inHg → hPa
  return null;
}

function parseMETARwind(raw) {
  const m = raw.match(/(\d{3}|VRB)(\d{2,3})(G\d{2,3})?KT/);
  if (!m) return null;
  return {
    dir: m[1] === 'VRB' ? 'Variable' : `${m[1]}°`,
    kt:  parseInt(m[2], 10),
    gust: m[3] ? parseInt(m[3].slice(1), 10) : null,
  };
}

function parseMETARvisibility(raw) {
  const m = raw.match(/\s(\d{4})\s/);
  if (m) return `${parseInt(m[1], 10)} m`;
  if (/CAVOK/.test(raw)) return 'CAVOK (>10 km)';
  return null;
}

function windCardinalDir(deg_str) {
  if (deg_str === 'Variable') return '↔';
  const deg = parseInt(deg_str, 10);
  const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSO','SO','OSO','O','ONO','NO','NNO'];
  return dirs[Math.round(deg / 22.5) % 16];
}

async function fetchMETAR(icao) {
  // API NOAA aviationweather.gov — CORS ok, pas d'auth
  const url = `https://aviationweather.gov/api/data/metar?ids=${icao}&format=raw&hours=2`;
  const res  = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  const lines = text.trim().split('\n').filter(l => l.trim());
  return lines[0] || null; // METAR le plus récent
}

async function fetchTAF(icao) {
  const url = `https://aviationweather.gov/api/data/taf?ids=${icao}&format=raw`;
  const res  = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.text()).trim();
}

export async function renderMetar(container, config) {
  const { metar_icao, metar_icao_fallback, elevation } = config;

  container.innerHTML = `<div class="loading-placeholder"><span class="spinner"></span> Récupération METAR ${metar_icao}…</div>`;

  let raw = null;
  let src_icao = metar_icao;

  try {
    raw = await fetchMETAR(metar_icao);
    if (!raw) throw new Error('Vide');
  } catch (e) {
    try {
      raw = await fetchMETAR(metar_icao_fallback);
      src_icao = metar_icao_fallback;
    } catch (e2) {
      container.innerHTML = `<div class="card">
        <div class="badge err">⚠ METAR indisponible (${metar_icao} et ${metar_icao_fallback})</div>
        <p style="margin-top:10px;font-size:.82rem;color:var(--text-dim)">Vérifiez votre connexion ou consultez <a href="https://aviationweather.gov/metar" target="_blank" style="color:var(--accent)">aviationweather.gov</a></p>
      </div>`;
      return;
    }
  }

  const qnh  = parseMETARqnh(raw);
  const wind = parseMETARwind(raw);
  const vis  = parseMETARvisibility(raw);

  // TAF en parallèle (non bloquant)
  let taf = '';
  try { taf = await fetchTAF(src_icao); } catch(e) { taf = '— TAF indisponible —'; }

  // Calcul des FL
  const flRows = FL_TABLE.map(fl => {
    const alt_ft = qnh ? flToAltQNH(fl, qnh) : null;
    return { fl, alt_ft };
  });

  const windHtml = wind ? `
    <span style="color:var(--text)">${wind.dir} (${windCardinalDir(wind.dir)})</span>
    <strong style="color:var(--accent)">${wind.kt} kt</strong>
    ${wind.gust ? `<span class="badge warn">Rafales ${wind.gust} kt</span>` : ''}
  ` : '—';

  container.innerHTML = `
    <div class="card">
      <div class="card-title">METAR — ${src_icao} ${src_icao !== metar_icao ? `<span class="badge info">Fallback depuis ${metar_icao}</span>` : ''}</div>
      <div id="metar-raw">${raw}</div>

      <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:14px;">
        <div class="fl-card ${qnh && qnh >= 1013 ? 'ok' : qnh && qnh < 990 ? 'warn' : ''}">
          <div class="fl-label">QNH</div>
          <div class="fl-value">${qnh ?? '—'}</div>
          <div class="fl-alt">hPa</div>
        </div>
        <div class="fl-card">
          <div class="fl-label">Vent</div>
          <div style="font-size:1rem;font-weight:700;color:var(--accent);margin-top:4px;display:flex;gap:6px;align-items:center;">${windHtml}</div>
        </div>
        ${vis ? `<div class="fl-card">
          <div class="fl-label">Visibilité</div>
          <div class="fl-value" style="font-size:1.1rem;">${vis}</div>
        </div>` : ''}
      </div>

      <div class="card-title">TAF — ${src_icao}</div>
      <div id="taf-raw">${taf}</div>
    </div>

    <div class="card">
      <div class="card-title">
        Correspondance FL ↔ Altitude
        ${qnh ? `<span style="font-weight:400;color:var(--text-dim);font-size:.78rem;margin-left:8px;">QNH ${qnh} hPa — correction ${qnh ? (Math.round((1013.25 - qnh) * 27)).toLocaleString('fr-FR') : '0'} ft</span>` : ''}
      </div>
      ${!qnh ? `<div class="badge warn" style="margin-bottom:10px;">QNH non disponible — calcul impossible</div>` : ''}
      <div id="fl-calculator">
        ${flRows.map(({ fl, alt_ft }) => `
        <div class="fl-card${alt_ft && alt_ft < 0 ? ' warn' : ''}">
          <div class="fl-label">FL ${fl}</div>
          <div class="fl-value">FL${fl}</div>
          <div class="fl-alt">${alt_ft !== null ? formatAlt(alt_ft) : '—'}</div>
        </div>`).join('')}
      </div>
      <p style="font-size:.72rem;color:var(--text-dim);margin-top:12px;">
        Formule ISA standard : Alt (ft) = FL×100 + (1013,25 − QNH) × 27. Usage informatif uniquement.
      </p>
    </div>
  `;
}
