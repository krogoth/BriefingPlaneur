// Widget : Cartes vent — surface, FL050 (1500m), FL100 (3000m)
// Source : Météociel AROME — échéances 12h et 15h UTC

export function renderVent(container) {
  // Grille : [label, code AROME, niveau]
  const cartes = [
    { label: "Vent Surface • H+12",   code: 201, ech: 12 },
    { label: "Vent Surface • H+15",   code: 201, ech: 15 },
    { label: "Vent FL050 (1500m) • H+12", code: 202, ech: 12 },
    { label: "Vent FL050 (1500m) • H+15", code: 202, ech: 15 },
    { label: "Vent FL100 (3000m) • H+12", code: 203, ech: 12 },
    { label: "Vent FL100 (3000m) • H+15", code: 203, ech: 15 },
  ];

  container.innerHTML = `
    <div class="card">
      <div class="card-title">Vents AROME — Surface · FL050 · FL100</div>
      <div class="img-grid cols-2">
        ${cartes.map(c => `
        <div class="meteo-img-wrap">
          <img src="https://www.meteociel.fr/modeles/arome/cartes.php?ech=${c.ech}&code=${c.code}&type=0"
               alt="${c.label}"
               loading="lazy"
               referrerpolicy="no-referrer"
               onerror="this.closest('.meteo-img-wrap').innerHTML='<div class=loading-placeholder>Image indisponible</div>'" />
          <span class="img-label">${c.label}</span>
        </div>`).join('')}
      </div>
    </div>
  `;
}
