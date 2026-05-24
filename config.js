/**
 * CONFIG DU CLUB — seul fichier à modifier pour adapter à votre terrain
 * Copier config.example.js → config.js, ne pas committer config.js dans un fork public
 * si vous ne souhaitez pas exposer les détails de votre club.
 */
window.CLUB_CONFIG = {

  // Infos club
  club:      "Espoirs Aéronautiques de Sarreguemines",
  icao:      "LFGU",
  elevation: 263,          // ft MSL

  // Position terrain (centre piste)
  lat:  49.1275,
  lon:   7.1067,

  // METAR/QNH : LFGU n'émet pas de METAR — utiliser la station la plus proche
  metar_icao: "EDDR",      // Saarbrücken, 9.6 km
  metar_icao_fallback: "LFJL", // Metz-Nancy-Lorraine

  // Station radiosondage Université du Wyoming (WMO ID)
  sounding_station: "10618",  // Idar-Oberstein (~90 km SO) — la plus représentative pour la Lorraine/Sarre
  sounding_label:   "Idar-Oberstein",

  // Espace aérien local (pour liens SIA)
  fir: "LFEE",             // FIR Reims

  // Ordre et activation des onglets — retirer une entrée pour la désactiver
  tabs: [
    "situation",
    "satellite",
    "radar",
    "vent",
    "windy",
    "sondage",
    "metar",
    "espace_aerien",
    "tem",
  ],

  // Liens personnalisables
  links: {
    notam:     "https://sofia-briefing.aviation-civile.gouv.fr/sofia/public/briefing?oaci=LFGU",
    azba:      "https://www.sia.aviation-civile.gouv.fr/azbaEx/",
    vac:       "https://www.sia.aviation-civile.gouv.fr/",
    skysight:  "https://skysight.io/",
    weglide:   "https://www.weglide.org/",
  },

};
