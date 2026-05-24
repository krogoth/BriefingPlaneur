/**
 * TEMPLATE DE CONFIGURATION CLUB
 * ================================
 * 1. Copiez ce fichier → config.js
 * 2. Modifiez les valeurs ci-dessous pour votre terrain
 * 3. config.js est dans .gitignore — ne pas le committer si repo public
 *
 * DÉPLOIEMENT GITHUB PAGES :
 *   - fork ce repo
 *   - modifiez config.js
 *   - activez GitHub Pages sur la branche main / dossier root
 *   - votre briefing est accessible sur https://<org>.github.io/<repo>/
 */
const CLUB_CONFIG = {

  // --- INFOS CLUB ---
  club:      "Mon Aéroclub",        // Nom affiché dans le header
  icao:      "LFXX",                // Code OACI du terrain
  elevation: 300,                   // Altitude terrain en ft MSL

  // --- POSITION (centre piste) ---
  lat:  48.000,
  lon:   2.000,

  // --- METAR / QNH ---
  // Si votre terrain n'émet pas de METAR, indiquer la station la plus proche
  metar_icao:          "LFXX",
  metar_icao_fallback: "LFPB",      // fallback si la station principale échoue

  // --- RADIOSONDAGE ---
  // Identifiant WMO : https://weather.uwyo.edu/upperair/sounding.html
  // Choisir la station la plus proche représentant votre masse d'air
  sounding_station: "07145",        // Trappes (Paris)
  sounding_label:   "Trappes",

  // --- FIR (pour liens SIA) ---
  fir: "LFFF",                      // LFFF=Paris, LFEE=Reims, LFMM=Marseille, LFRR=Brest, LFBB=Bordeaux

  // --- ONGLETS ACTIFS (retirer pour désactiver) ---
  tabs: [
    "situation",       // Situation générale synoptique
    "satellite",       // Satellite IR + VIS
    "radar",           // Radar précipitations temps réel
    "vent",            // Cartes vent surface + FL050 + FL100
    "windy",           // Windy embed centré sur le terrain
    "sondage",         // Émagramme radiosondage
    "metar",           // METAR + TAF + calcul FL dynamique
    "espace_aerien",   // SUP AIP, AZBA, NOTAM
    "tem",             // Checklist TEM sécurité des vols (optionnel)
  ],

  // --- LIENS RAPIDES (personnalisables) ---
  links: {
    notam:    "https://sofia-briefing.aviation-civile.gouv.fr/sofia/public/briefing?oaci=LFXX",
    azba:     "https://www.sia.aviation-civile.gouv.fr/azbaEx/",
    vac:      "https://www.sia.aviation-civile.gouv.fr/",
    skysight: "https://skysight.io/",
    weglide:  "https://www.weglide.org/",
  },

};
