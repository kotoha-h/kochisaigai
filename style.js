// ===============================
// 地図初期化（高知県全域）
// ===============================
const map = L.map("map").setView([33.35, 133.2], 8);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// ===============================
// アイコン
// ===============================
const quakeIcon = L.icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
});
const tsunamiIcon = L.icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [32, 32],
});

// ===============================
// 高知県 全34市町村（代表座標）
// ===============================
const municipalities = [
  // 市
  { name: "高知市", lat: 33.5597, lng: 133.5311 },
  { name: "室戸市", lat: 33.2896, lng: 134.1516 },
  { name: "安芸市", lat: 33.5030, lng: 133.9060 },
  { name: "南国市", lat: 33.5756, lng: 133.6414 },
  { name: "土佐市", lat: 33.5000, lng: 133.4500 },
  { name: "須崎市", lat: 33.4006, lng: 133.2837 },
  { name: "宿毛市", lat: 32.9386, lng: 132.7267 },
  { name: "土佐清水市", lat: 32.7800, lng: 132.9500 },
  { name: "四万十市", lat: 32.9900, lng: 132.9300 },
  { name: "香南市", lat: 33.5600, lng: 133.7000 },
  { name: "香美市", lat: 33.6000, lng: 133.7200 },

  // 町村
  { name: "東洋町", lat: 33.5280, lng: 134.2800 },
  { name: "奈半利町", lat: 33.4200, lng: 134.0200 },
  { name: "田野町", lat: 33.4300, lng: 134.0100 },
  { name: "安田町", lat: 33.4400, lng: 133.9800 },
  { name: "北川村", lat: 33.4500, lng: 134.0200 },
  { name: "馬路村", lat: 33.5500, lng: 134.0500 },
  { name: "芸西村", lat: 33.5200, lng: 133.8000 },
  { name: "本山町", lat: 33.7700, lng: 133.5900 },
  { name: "大豊町", lat: 33.7500, lng: 133.7200 },
  { name: "土佐町", lat: 33.7800, lng: 133.5000 },
  { name: "大川村", lat: 33.7900, lng: 133.4700 },
  { name: "いの町", lat: 33.5500, lng: 133.4200 },
  { name: "仁淀川町", lat: 33.6100, lng: 133.2800 },
  { name: "中土佐町", lat: 33.3300, lng: 133.2300 },
  { name: "佐川町", lat: 33.5000, lng: 133.2900 },
  { name: "越知町", lat: 33.5300, lng: 133.2500 },
  { name: "檮原町", lat: 33.3900, lng: 132.9300 },
  { name: "日高村", lat: 33.5300, lng: 133.3700 },
  { name: "津野町", lat: 33.4400, lng: 133.0400 },
  { name: "四万十町", lat: 33.2100, lng: 133.1400 },
  { name: "大月町", lat: 32.8400, lng: 132.6800 },
  { name: "三原村", lat: 32.9900, lng: 132.8300 },
  { name: "黒潮町", lat: 33.0300, lng: 133.0100 },
];

// ===============================
// 避難所生成
// 各市町村：
//   🔴 地震避難所 ×2
//   🔵 津波避難所 ×1
// ===============================
municipalities.forEach((m) => {
  // 地震
  for (let i = 1; i <= 2; i++) {
    L.marker(
      [m.lat + i * 0.01, m.lng - i * 0.01],
      { icon: quakeIcon }
    )
      .addTo(map)
      .bindPopup(`
        <strong>${m.name}</strong><br>
        🔴 地震避難所 ${i}
      `);
  }

  // 津波
  L.marker(
    [m.lat - 0.02, m.lng + 0.02],
    { icon: tsunamiIcon }
  )
    .addTo(map)
    .bindPopup(`
      <strong>${m.name}</strong><br>
      🔵 津波避難所
    `);
});

// ===============================
// 凡例
// ===============================
const legend = L.control({ position: "bottomright" });
legend.onAdd = function () {
  const div = L.DomUtil.create("div", "legend");
  div.innerHTML = `
    <strong>凡例</strong><br>
    🔴 地震避難所<br>
    🔵 津波避難所
  `;
  return div;
};
legend.addTo(map);
