// Widget : Situation générale synoptique
// Sources : Météo France (images publiques), MeteoCenter

export function renderSituation(container) {
  container.innerHTML = `
    <div class="card">
      <div class="card-title">Analyse de surface & fronts</div>
      <div class="img-grid cols-2">
        <div class="meteo-img-wrap">
          <img src="https://www.meteociel.fr/modeles/gfse_cartes.php?ech=0&code=0&type=0"
               alt="Analyse surface"
               onerror="this.closest('.meteo-img-wrap').innerHTML='<div class=loading-placeholder>Image indisponible</div>'" />
          <span class="img-label">Analyse de surface (Météociel)</span>
        </div>
        <div class="meteo-img-wrap">
          <img src="https://www.meteociel.fr/modeles/gfse_cartes.php?ech=24&code=0&type=0"
               alt="Prévision H+24"
               onerror="this.closest('.meteo-img-wrap').innerHTML='<div class=loading-placeholder>Image indisponible</div>'" />
          <span class="img-label">Prévision H+24 (GFS)</span>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">TEMSI France</div>
      <div class="img-grid cols-2">
        <div class="meteo-img-wrap">
          <img src="https://aviation.meteo.fr/FR/aviation/XDT_PX.php?TYPE=TEMSI_FB&AREA=FRANCE&ECHT=null&OACI=LFPB"
               alt="TEMSI France"
               onerror="this.src='https://www.meteociel.fr/cartes_obs/analyses/analysis_surface.gif'" />
          <span class="img-label">TEMSI France (Météo France Aviation)</span>
        </div>
        <div class="meteo-img-wrap">
          <img src="https://www.meteociel.fr/modeles/arome/cartes.php?ech=12&code=500&type=0"
               alt="Géopotentiel 500 hPa"
               onerror="this.closest('.meteo-img-wrap').innerHTML='<div class=loading-placeholder>Image indisponible</div>'" />
          <span class="img-label">Géopotentiel 500 hPa (AROME)</span>
        </div>
      </div>
    </div>
  `;
}
