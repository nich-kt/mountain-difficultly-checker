const calculateButton = document.getElementById("calculateButton");

const referenceMountains = [
  { name: "大雪山黒岳・7合目", score: 16 },
  { name: "八剣山・南口登山口", score: 19 },
  { name: "乗鞍岳・畳平～剣ヶ峰", score: 29 },
  { name: "大雪山旭岳・姿見駅", score: 34 },
  { name: "尻別岳・留寿都登山口", score: 36 },
  { name: "十勝岳・望岳台", score: 53 },
  { name: "塔ノ岳・大倉登山口", score: 69 },
  { name: "羊蹄山・倶知安コース", score: 72 },
  { name: "利尻山・北麓野営場", score: 75 },
  { name: "富士山・富士宮ルート", score: 100 }
];

calculateButton.addEventListener("click", calculateDifficulty);

function calculateDifficulty() {
  const distance = Number(document.getElementById("distance").value);
  const elevation = Number(document.getElementById("elevation").value);
  const hours = Number(document.getElementById("hours").value);
  const minutes = Number(document.getElementById("minutes").value);
  const altitude = Number(document.getElementById("altitude").value);

  if (
    !Number.isFinite(distance) || distance <= 0 ||
    !Number.isFinite(elevation) || elevation < 0 ||
    !Number.isFinite(hours) || hours < 0 ||
    !Number.isFinite(minutes) || minutes < 0 || minutes >= 60 ||
    !Number.isFinite(altitude) || altitude <= 0
  ) {
    alert("必須項目の入力内容を確認してください。");
    return;
  }

  const courseTime = hours + minutes / 60;

  if (courseTime <= 0) {
    alert("標準コースタイムを入力してください。");
    return;
  }

  // ① 体力点
  // 富士山・富士宮ルート（8.1km / 1389m / 7時間57分）を基準化
  const R =
    0.25 * (distance / 8.1) +
    0.40 * (elevation / 1389) +
    0.35 * (courseTime / 7.95);

  const staminaScore = 55 * Math.pow(R, 1.1);

  // ② 基礎高所補正：2000m以上から開始
  let baseAltitudeScore = 0;

  if (altitude >= 3776) {
    baseAltitudeScore = 35;
  } else if (altitude >= 2000) {
    baseAltitudeScore =
      35 * Math.pow((altitude - 2000) / (3776 - 2000), 2);
  }

  // ③ CTで高所補正を軽減
  let altitudeTimeFactor = 1.0;

  if (courseTime < 2) {
    altitudeTimeFactor = 0.30;
  } else if (courseTime < 3) {
    altitudeTimeFactor = 0.50;
  } else if (courseTime < 5) {
    altitudeTimeFactor = 0.75;
  }

  const altitudeScore = baseAltitudeScore * altitudeTimeFactor;

  // ④ 任意の技術情報
  const technicalEl = document.getElementById("technical");
  const riskEl = document.getElementById("risk");
  const terrainEl = document.getElementById("terrain");

  const technicalKnown = technicalEl.value !== "";
  const riskKnown = riskEl.value !== "";
  const terrainKnown = terrainEl.value !== "";

  const technicalScore = technicalKnown ? Number(technicalEl.value) : 0;
  const riskScore = riskKnown ? Number(riskEl.value) : 0;
  const terrainScore = terrainKnown ? Number(terrainEl.value) : 0;

  const optionalBonus = technicalScore + riskScore + terrainScore;

  // ⑤ 最終指数
  const baseScore = staminaScore + altitudeScore;
  const difficultyScore = baseScore + optionalBonus;
  const roundedScore = Math.round(difficultyScore);

  const knownOptionalCount =
    Number(technicalKnown) + Number(riskKnown) + Number(terrainKnown);

  displayResult({
    score: roundedScore,
    baseScore,
    optionalBonus,
    staminaScore,
    technicalScore,
    riskScore,
    terrainScore,
    knownOptionalCount
  });
}

function displayResult(data) {
  const result = document.getElementById("result");
  result.classList.remove("hidden");

  document.getElementById("difficultyNumber").textContent = data.score;

  let difficultyClass = "初級";
  if (data.score >= 81) {
    difficultyClass = "上級";
  } else if (data.score >= 36) {
    difficultyClass = "中級";
  }

  document.getElementById("difficultyClass").textContent = difficultyClass;
  document.getElementById("staminaStars").textContent =
    getStaminaStars(data.staminaScore);

  document.getElementById("baseScore").textContent =
    Math.round(data.baseScore);

  document.getElementById("optionalBonus").textContent =
    `+${formatNumber(data.optionalBonus)}`;

  const confidence = getConfidence(data.knownOptionalCount);
  document.getElementById("confidence").textContent = confidence;

  const technicalStars = document.getElementById("technicalStars");

  if (data.knownOptionalCount === 0) {
    technicalStars.textContent = "未判定";
  } else {
    technicalStars.textContent =
      getTechnicalStars(data.technicalScore + data.riskScore + data.terrainScore);
  }

  const missingTechWarning = document.getElementById("missingTechWarning");
  if (data.knownOptionalCount < 3) {
    missingTechWarning.classList.remove("hidden");
  } else {
    missingTechWarning.classList.add("hidden");
  }

  document.getElementById("fujiComparison").textContent =
    data.score === 100
      ? "富士山・富士宮ルートと同じ基準値です。"
      : `富士山・富士宮ルート（100）に対して、指数は${data.score}です。`;

  showClosestMountains(data.score);

  result.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getStaminaStars(staminaScore) {
  let level = 1;

  if (staminaScore >= 65) {
    level = 5;
  } else if (staminaScore >= 50) {
    level = 4;
  } else if (staminaScore >= 35) {
    level = 3;
  } else if (staminaScore >= 20) {
    level = 2;
  }

  return "★".repeat(level) + "☆".repeat(5 - level);
}

function getTechnicalStars(totalTechnicalScore) {
  let level = 1;

  if (totalTechnicalScore > 8) {
    level = 5;
  } else if (totalTechnicalScore > 6) {
    level = 4;
  } else if (totalTechnicalScore > 3.5) {
    level = 3;
  } else if (totalTechnicalScore > 1.5) {
    level = 2;
  }

  return "★".repeat(level) + "☆".repeat(5 - level);
}

function getConfidence(knownOptionalCount) {
  if (knownOptionalCount === 3) return "高";
  if (knownOptionalCount >= 1) return "標準";
  return "基本";
}

function showClosestMountains(score) {
  const sorted = [...referenceMountains]
    .sort((a, b) => Math.abs(a.score - score) - Math.abs(b.score - score))
    .slice(0, 3);

  const container = document.getElementById("comparisonList");
  container.innerHTML = "";

  sorted.forEach((mountain) => {
    const item = document.createElement("div");
    item.className = "comparison-item";
    item.innerHTML = `
      <span>${mountain.name}</span>
      <strong>${mountain.score}</strong>
    `;
    container.appendChild(item);
  });
}

function formatNumber(value) {
  return Number.isInteger(value) ? value.toString() : value.toFixed(1);
}
