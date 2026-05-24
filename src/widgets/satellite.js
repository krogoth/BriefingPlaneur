// Widget : Satellite IR + Visible
// Source : EUMETSAT / Météociel (images publiques)

export function renderSatellite(container) {
  const ts = Date.now(); // cache-bust
  container.innerHTML = `
    <div class="card">
      <div class="card-title">Satellite Infrarouge — Europe</div>
      <div class="img-grid cols-2">
        <div class="meteo-img-wrap">
          <img src="https://www.meteociel.fr/satellite/europe_ir.jpg?${ts}"
               alt="Satellite IR Europe"
               referrerpolicy="no-referrer"
               onerror="this.closest('.meteo-img-wrap').innerHTML='<div class=loading-placeholder>Image indisponible</div>'" />
          <span class="img-label">IR Europe</span>
        </div>
        <div class="meteo-img-wrap">
          <img src="https://www.meteociel.fr/satellite/france_ir.jpg?${ts}"
               alt="Satellite IR France"
               referrerpolicy="no-referrer"
               onerror="this.closest('.meteo-img-wrap').innerHTML='<div class=loading-placeholder>Image indisponible</div>'" />
          <span class="img-label">IR France</span>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Satellite Visible — France</div>
      <div class="img-grid cols-2">
        <div class="meteo-img-wrap">
          <img src="https://www.meteociel.fr/satellite/france_vis.jpg?${ts}"
               alt="Satellite Visible France"
               referrerpolicy="no-referrer"
               onerror="this.closest('.meteo-img-wrap').innerHTML='<div class=loading-placeholder>Image indisponible</div>'" />
          <span class="img-label">Visible France</span>
        </div>
        <div class="meteo-img-wrap">
          <img src="https://www.meteociel.fr/satellite/europe_vis.jpg?${ts}"
               alt="Satellite Visible Europe"
               referrerpolicy="no-referrer"
               onerror="this.closest('.meteo-img-wrap').innerHTML='<div class=loading-placeholder>Image indisponible</div>'" />
          <span class="img-label">Visible Europe</span>
        </div>
      </div>
    </div>
  `;
}
