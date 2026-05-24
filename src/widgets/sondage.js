// Widget : Émagramme radiosondage
// Source : Université du Wyoming (données publiques)
// Format URL : https://weather.uwyo.edu/cgi-bin/plotsounding.py?TYPE=skewt&YEAR=...&MONTH=...&FROM=...&STNM=...

export function renderSondage(container, config) {
  const { sounding_station, sounding_label } = config;

  // Calcul des 2 derniers horaires de lâcher standard (00Z et 12Z UTC)
  const now = new Date();
  const year  = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day   = String(now.getUTCDate()).padStart(2, '0');
  const hour  = now.getUTCHours();

  // On affiche les 2 derniers : si > 12Z on a 12Z du jour et 00Z du jour, sinon 00Z du jour et 12Z de J-1
  const soundings = [];

  if (hour >= 14) {
    soundings.push({ label: `${sounding_label} 12Z`, from: `${day}12`, year, month });
    soundings.push({ label: `${sounding_label} 00Z`, from: `${day}00`, year, month });
  } else {
    // Avant 14Z, le 12Z n'est pas encore disponible
    soundings.push({ label: `${sounding_label} 00Z`, from: `${day}00`, year, month });
    // 12Z de la veille
    const yesterday = new Date(now);
    yesterday.setUTCDate(now.getUTCDate() - 1);
    const yd  = String(yesterday.getUTCDate()).padStart(2, '0');
    const ym  = String(yesterday.getUTCMonth() + 1).padStart(2, '0');
    const yy  = yesterday.getUTCFullYear();
    soundings.push({ label: `${sounding_label} 12Z (J-1)`, from: `${yd}12`, year: yy, month: ym });
  }

  const imgUrl = (s) =>
    `https://weather.uwyo.edu/cgi-bin/plotsounding.py?TYPE=skewt&YEAR=${s.year}&MONTH=${s.month}&FROM=${s.from}&STNM=${sounding_station}`;

  container.innerHTML = `
    <div class="card">
      <div class="card-title">Radiosondage — ${sounding_label} (WMO ${sounding_station})</div>
      <p style="font-size:.78rem;color:var(--text-dim);margin-bottom:12px;">
        Source : Université du Wyoming. Lâchers standards à 00Z et 12Z UTC (disponibles ~2h après).
      </p>
      <div class="sounding-wrap">
        ${soundings.map(s => `
        <div class="sounding-img">
          <img src="${imgUrl(s)}"
               alt="Sondage ${s.label}"
               loading="lazy"
               onerror="this.closest('.sounding-img').innerHTML='<div class=loading-placeholder style=background:#1a1d27;color:var(--text-dim)>Sondage indisponible (${s.label})</div>'" />
          <div style="background:#111;text-align:center;font-size:.75rem;color:var(--text-dim);padding:4px;">${s.label}</div>
        </div>`).join('')}
      </div>

      <div style="margin-top:12px;">
        <a href="https://weather.uwyo.edu/upperair/sounding.html"
           target="_blank" rel="noopener"
           style="font-size:.78rem;color:var(--accent);text-decoration:none;">
          → Ouvrir l'interface complète Wyoming
        </a>
      </div>
    </div>
  `;
}
