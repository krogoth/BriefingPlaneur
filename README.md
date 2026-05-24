# Briefing Planeur 🛩

Briefing météo planeur — template multi-clubs, 100% statique, zéro backend.

## Démo

> LFGU — Espoirs Aéronautiques de Sarreguemines

## Principe

Un seul repo. Chaque club **fork** et modifie **uniquement `config.js`**.
Aucune dépendance, aucun build step, fonctionne sur GitHub Pages / Netlify / Vercel ou n'importe quel hébergement statique.

## Déploiement en 5 minutes (GitHub Pages)

```bash
# 1. Forker ce repo sur GitHub
# 2. Cloner votre fork
git clone https://github.com/<votre-org>/<votre-fork>.git
cd <votre-fork>

# 3. Créer votre config
cp config.example.js config.js
# Éditer config.js avec les données de votre terrain

# 4. Committer (config.js est dans .gitignore par défaut —
#    si vous voulez le committer dans un repo privé, retirez la ligne de .gitignore)
git add config.js
git commit -m "config: LFXX Mon aéroclub"
git push

# 5. Activer GitHub Pages
# Settings → Pages → Source: main branch, root folder
# Votre briefing est accessible sur https://<org>.github.io/<repo>/
```

## Structure

```
/
├── index.html              # Shell — ne pas modifier
├── config.js               # ← Seul fichier à modifier par club (.gitignore)
├── config.example.js       # Template commenté
├── manifest.json           # PWA manifest
├── src/
│   ├── app.js              # Orchestrateur (tabs, routing, header METAR)
│   ├── style.css           # CSS global (variables de theming)
│   └── widgets/
│       ├── situation.js    # Situation synoptique + TEMSI
│       ├── satellite.js    # Satellite IR + Visible
│       ├── radar.js        # Radar précipitations + AROME
│       ├── vent.js         # Vent surface, FL050, FL100 (AROME)
│       ├── windy.js        # Windy embed (centré sur le terrain)
│       ├── sondage.js      # Radiosondage (Université du Wyoming)
│       ├── metar.js        # METAR + TAF + calcul FL dynamique
│       ├── espace_aerien.js# Liens AZBA, NOTAM, SUP AIP, SIA
│       └── tem.js          # Checklist TEM sécurité des vols
└── .gitignore
```

## Configuration `config.js`

| Paramètre | Description | Exemple |
|---|---|---|
| `club` | Nom affiché dans le header | `"Espoirs Aéronautiques de Sarreguemines"` |
| `icao` | Code OACI du terrain | `"LFGU"` |
| `elevation` | Altitude terrain en ft MSL | `263` |
| `lat` / `lon` | Coordonnées centre piste | `49.1275` / `7.1067` |
| `metar_icao` | Station METAR (peut être différente du terrain) | `"EDDR"` |
| `metar_icao_fallback` | Fallback si station principale indisponible | `"LFJL"` |
| `sounding_station` | ID WMO station radiosondage | `"10618"` |
| `sounding_label` | Nom affiché | `"Idar-Oberstein"` |
| `tabs` | Liste ordonnée des onglets actifs | voir exemple |
| `links` | URLs personnalisables (NOTAM, AZBA…) | voir exemple |

### Trouver l'ID WMO de votre station de radiosondage

→ https://weather.uwyo.edu/upperair/sounding.html — choisir la station la plus proche représentant votre masse d'air.

## Sources de données

| Source | Usage | Auth |
|---|---|---|
| NOAA aviationweather.gov | METAR / TAF | Aucune (API publique) |
| Météociel | Radar, satellite, vent AROME, GFS | Aucune (images publiques) |
| Université du Wyoming | Radiosondages | Aucune |
| Windy embed | Carte vent interactive | Aucune |
| SIA aviation-civile.gouv.fr | AZBA, SUP AIP, VAC | Aucune |
| Sofia-Briefing | NOTAMs | Aucune |

## Ajouter un widget personnalisé

Créer `src/widgets/mon_widget.js` :

```js
export function renderMonWidget(container, config) {
  container.innerHTML = `<div class="card">…</div>`;
}
```

Déclarer dans `src/app.js` :

```js
import { renderMonWidget } from './widgets/mon_widget.js';

// Dans TAB_DEFS :
mon_widget: { label: '🔧 Mon widget', render: (el, cfg) => renderMonWidget(el, cfg) },
```

Activer dans `config.js` :

```js
tabs: [ …, "mon_widget" ]
```

## Licence

MIT — fork, modifiez, déployez librement.
