// Widget : Windy embed — Europe + local centré sur le terrain

export function renderWindy(container, config) {
  const { lat, lon } = config;

  container.innerHTML = `
    <div class="card">
      <div class="card-title">Windy — Vue locale (ECMWF)</div>
      <div class="windy-wrap">
        <iframe
          src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=km/h&zoom=11&overlay=wind&product=ecmwf&level=surface&lat=${lat}&lon=${lon}&marker=true"
          loading="lazy"
          allowfullscreen>
        </iframe>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Windy — Vue Europe</div>
      <div class="windy-wrap">
        <iframe
          src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=km/h&zoom=4&overlay=wind&product=ecmwf&level=surface&lat=47&lon=8&pressure=true"
          loading="lazy"
          allowfullscreen>
        </iframe>
      </div>
    </div>
  `;
}
