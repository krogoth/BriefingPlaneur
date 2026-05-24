// app.js — orchestrateur principal
// ES modules natifs — pas de bundler requis

import { renderSituation    } from './widgets/situation.js';
import { renderSatellite    } from './widgets/satellite.js';
import { renderRadar        } from './widgets/radar.js';
import { renderVent         } from './widgets/vent.js';
import { renderWindy        } from './widgets/windy.js';
import { renderSondage      } from './widgets/sondage.js';
import { renderMetar        } from './widgets/metar.js';
import { renderEspaceAerien } from './widgets/espace_aerien.js';
import { renderTEM          } from './widgets/tem.js';

// ── Définition des onglets ─────────────────────────────────────────
const TAB_DEFS = {
  situation:    { label: '🌐 Situation',    render: (el, cfg) => renderSituation(el) },
  satellite:    { label: '🛰 Satellite',    render: (el, cfg) => renderSatellite(el) },
  radar:        { label: '🌧 Radar',        render: (el, cfg) => renderRadar(el) },
  vent:         { label: '💨 Vent',         render: (el, cfg) => renderVent(el) },
  windy:        { label: '🗺 Windy',        render: (el, cfg) => renderWindy(el, cfg) },
  sondage:      { label: '📈 Sondage',      render: (el, cfg) => renderSondage(el, cfg) },
  metar:        { label: '📡 METAR / FL',   render: (el, cfg) => renderMetar(el, cfg) },
  espace_aerien:{ label: '🚫 Espace aérien',render: (el, cfg) => renderEspaceAerien(el, cfg) },
  tem:          { label: '✅ TEM Sécurité', render: (el, cfg) => renderTEM(el) },
};

// ── Bootstrap ─────────────────────────────────────────────────────
function init(config) {
  // Vérification config minimale
  if (!config || !config.icao) {
    document.body.innerHTML = `<div style="color:#ef4444;padding:40px;font-family:monospace;">
      ⚠ Fichier config.js manquant ou invalide.<br>
      Copiez config.example.js → config.js et adaptez les valeurs.
    </div>`;
    return;
  }

  buildHeader(config);
  buildTabs(config);
  activateFirstTab();
  startHeaderMETARRefresh(config);
}

// ── Header ────────────────────────────────────────────────────────
function buildHeader(config) {
  const h = document.getElementById('app-header');
  h.innerHTML = `
    <h1>${config.club}</h1>
    <div id="header-meta">
      <span class="icao">${config.icao}</span>
      <span id="header-time">—</span>
    </div>
    <div id="header-metar">Chargement METAR…</div>
  `;
  updateHeaderTime();
  setInterval(updateHeaderTime, 10_000);
}

function updateHeaderTime() {
  const el = document.getElementById('header-time');
  if (!el) return;
  const now = new Date();
  const z = n => String(n).padStart(2,'0');
  el.textContent = `${z(now.getUTCHours())}:${z(now.getUTCMinutes())} UTC`;
}

// ── Tabs ──────────────────────────────────────────────────────────
function buildTabs(config) {
  const tabBar = document.getElementById('tab-bar');
  const content = document.getElementById('content');
  const enabled = config.tabs.filter(id => TAB_DEFS[id]);

  enabled.forEach((id, i) => {
    const def = TAB_DEFS[id];

    // Bouton
    const btn = document.createElement('button');
    btn.className = 'tab-btn';
    btn.dataset.tab = id;
    btn.textContent = def.label;
    btn.addEventListener('click', () => activateTab(id));
    tabBar.appendChild(btn);

    // Panel
    const panel = document.createElement('div');
    panel.className = 'tab-panel';
    panel.id = `panel-${id}`;
    panel.dataset.loaded = 'false';
    content.appendChild(panel);
  });
}

// Cache pour ne pas re-render un onglet déjà chargé
const _rendered = new Set();

function activateTab(id) {
  // Désactiver tout
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

  // Activer
  const btn   = document.querySelector(`.tab-btn[data-tab="${id}"]`);
  const panel = document.getElementById(`panel-${id}`);
  if (!btn || !panel) return;

  btn.classList.add('active');
  panel.classList.add('active');

  // Lazy render — une seule fois par onglet (sauf metar qui doit être frais)
  if (!_rendered.has(id) || id === 'metar') {
    _rendered.add(id);
    const def = TAB_DEFS[id];
    if (def) def.render(panel, window.CLUB_CONFIG);
  }

  // Scroll en haut
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Mémoriser l'onglet actif dans l'URL hash pour partage/refresh
  history.replaceState(null, '', `#${id}`);
}

function activateFirstTab() {
  // Restaurer depuis le hash si présent
  const hash = window.location.hash.slice(1);
  const config = window.CLUB_CONFIG;
  const first  = config.tabs[0];
  const target = config.tabs.includes(hash) ? hash : first;
  activateTab(target);
}

async function fetchText(url) {
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.text();
  } catch {
    const r = await fetch('https://corsproxy.io/?' + encodeURIComponent(url));
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.text();
  }
}

// ── METAR live dans le header ──────────────────────────────────────
async function fetchHeaderMETAR(config) {
  const { metar_icao, metar_icao_fallback } = config;
  const el = document.getElementById('header-metar');
  if (!el) return;

  try {
    const url = `https://aviationweather.gov/api/data/metar?ids=${metar_icao}&format=raw&hours=1`;
    const text = (await fetchText(url)).trim().split('\n')[0];
    if (text) {
      el.textContent = text;
      el.style.color = 'var(--text-dim)';
      return;
    }
    throw new Error('vide');
  } catch {
    try {
      const url2 = `https://aviationweather.gov/api/data/metar?ids=${metar_icao_fallback}&format=raw&hours=1`;
      const text2 = (await fetchText(url2)).trim().split('\n')[0];
      el.textContent = `[${metar_icao_fallback}] ${text2}`;
      el.style.color = 'var(--text-dim)';
    } catch {
      el.textContent = 'METAR indisponible';
      el.style.color = 'var(--danger)';
    }
  }
}

function startHeaderMETARRefresh(config) {
  fetchHeaderMETAR(config);
  setInterval(() => fetchHeaderMETAR(config), 10 * 60 * 1000); // refresh toutes les 10 min
}

// ── Entry point ───────────────────────────────────────────────────
// CLUB_CONFIG est injecté par config.js chargé avant ce script
document.addEventListener('DOMContentLoaded', () => {
  init(window.CLUB_CONFIG);
});
