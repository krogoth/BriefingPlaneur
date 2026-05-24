// Widget : Espace aérien — liens rapides SIA, AZBA, NOTAM, SUP AIP

export function renderEspaceAerien(container, config) {
  const { icao, links } = config;

  container.innerHTML = `
    <div class="card">
      <div class="card-title">Liens rapides</div>
      <div class="quick-links">
        <a href="${links.notam}" target="_blank" rel="noopener">
          📋 NOTAMs ${icao}
        </a>
        <a href="${links.azba}" target="_blank" rel="noopener">
          🚫 AZBA (zones militaires)
        </a>
        <a href="https://www.sia.aviation-civile.gouv.fr/documents/supaip/aip/active" target="_blank" rel="noopener">
          📄 SUP AIP actifs
        </a>
        <a href="${links.vac}" target="_blank" rel="noopener">
          🗺 Cartes VAC (SIA)
        </a>
        <a href="https://sofia-briefing.aviation-civile.gouv.fr/" target="_blank" rel="noopener">
          ✈️ Sofia Briefing
        </a>
        <a href="https://www.ffvvespaceaerien.org" target="_blank" rel="noopener">
          🏳️ FFVV Espace Aérien
        </a>
        <a href="${links.skysight}" target="_blank" rel="noopener">
          ☁️ SkyScight
        </a>
      </div>
    </div>

    <div class="card">
      <div class="card-title">AZBA — Carte interactive</div>
      <div style="border-radius:6px;overflow:hidden;border:1px solid var(--border);">
        <iframe
          src="https://www.sia.aviation-civile.gouv.fr/azbaEx/"
          style="width:100%;height:520px;border:none;"
          loading="lazy"
          title="Carte AZBA SIA">
        </iframe>
      </div>
      <p style="font-size:.75rem;color:var(--text-dim);margin-top:8px;">
        Source : SIA — Service de l'Information Aéronautique. Vérifiez l'état d'activation avant chaque vol.
      </p>
    </div>
  `;
}
