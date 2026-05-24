// Widget : TEM — Threat & Error Management
// Checklist de briefing sécurité des vols (OACI / FFVP)

const TEM_DATA = [
  {
    section: "👤 Pilote",
    items: [
      { icon: "🧠", title: "Forme physique et mentale", desc: "Fatigue, stress, médicaments, baromètre de sécurité personnel (1-10)" },
      { icon: "📋", title: "Documents valides", desc: "Licence, qualification de type/classe, visite médicale, carnet de vol" },
      { icon: "⏰", title: "Expérience récente", desc: "Dernier vol solo/biplace, dernier décollage/atterrissage" },
      { icon: "🎯", title: "Objectif du vol", desc: "Adapté aux conditions et à son niveau — pas de pression de performance" },
    ]
  },
  {
    section: "✈️ Machine",
    items: [
      { icon: "📑", title: "Navigabilité", desc: "CEN, assurance, carnet de route à jour" },
      { icon: "⚖️", title: "Centrage & masse", desc: "Poids des pilotes, gueuses, ballast eau — calcul effectué ?" },
      { icon: "🔍", title: "Visite pré-vol", desc: "Réalisée méthodiquement, à l'abri de toute distraction" },
      { icon: "🔌", title: "Équipements", desc: "Variomètre, FLARM, transpondeur, radio — fonctionnels ?" },
    ]
  },
  {
    section: "🌍 Environnement",
    items: [
      { icon: "🌦️", title: "Météo", desc: "Vent, plafond, visibilité, cumulus, orages — limite personnelle respectée ?" },
      { icon: "🛬", title: "Terrain", desc: "État de la piste (humidité, herbes hautes), QFU en service, dégagements" },
      { icon: "📻", title: "Espaces aériens", desc: "NOTAMs, AZBA actives, zones R/D dans la zone de navigation prévue" },
      { icon: "👁️", title: "Trafic local", desc: "ULM, avions, autres planeurs — fréquence active, FLARM actif" },
      { icon: "🦺", title: "Consignes sol", desc: "Gilet jaune obligatoire en piste, circulation avec prudence" },
    ]
  },
  {
    section: "📢 Débriefing & REX",
    items: [
      { icon: "📖", title: "Flash FFVP / REX nationaux", desc: "Événements récents à connaître" },
      { icon: "💬", title: "REX local", desc: "Incidents ou situations à partager avec le groupe" },
      { icon: "❓", title: "Question ouverte", desc: "Avez-vous identifié une menace aujourd'hui ?" },
    ]
  },
];

export function renderTEM(container) {
  const html = TEM_DATA.map(section => `
    <div class="card tem-section">
      <h3>${section.section}</h3>
      ${section.items.map(item => `
      <div class="tem-item">
        <span class="tem-icon">${item.icon}</span>
        <div>
          <strong>${item.title}</strong><br>
          <span>${item.desc}</span>
        </div>
      </div>`).join('')}
    </div>
  `).join('');

  container.innerHTML = `
    ${html}
    <div class="card" style="text-align:center;color:var(--text-dim);font-size:.85rem;border-color:var(--ok);">
      ✅ Bons vols en sécurité !
    </div>
  `;
}
