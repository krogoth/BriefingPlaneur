// Widget : Radar précipitations temps réel + prévision AROME

export function renderRadar(container) {
  const ts = Date.now();
  container.innerHTML = `
    <div class="card">
      <div class="card-title">Radar précipitations — Temps réel</div>
      <div class="img-grid cols-2">
        <div class="meteo-img-wrap">
          <img src="https://www.meteociel.fr/cartes_obs/radar/lastsnowradar.gif?${ts}"
               alt="Radar France"
               onerror="this.closest('.meteo-img-wrap').innerHTML='<div class=loading-placeholder>Image indisponible</div>'" />
          <span class="img-label">Radar France (Météociel)</span>
        </div>
        <div class="meteo-img-wrap">
          <img src="https://www.meteociel.fr/cartes_obs/radar/lastradar.gif?${ts}"
               alt="Radar couleur France"
               onerror="this.closest('.meteo-img-wrap').innerHTML='<div class=loading-placeholder>Image indisponible</div>'" />
          <span class="img-label">Radar intensité France</span>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Évolution précipitations AROME — prochaines 12h</div>
      <div class="img-grid cols-3">
        ${[6, 12, 24].map(h => `
        <div class="meteo-img-wrap">
          <img src="https://www.meteociel.fr/modeles/arome/cartes.php?ech=${h}&code=200&type=0"
               alt="AROME précipitations H+${h}"
               onerror="this.closest('.meteo-img-wrap').innerHTML='<div class=loading-placeholder>Image indisponible</div>'" />
          <span class="img-label">H+${h}h (AROME)</span>
        </div>`).join('')}
      </div>
    </div>
  `;
}
