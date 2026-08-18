const calculateButton =
  document.getElementById(
    "calculateButton"
  );


const clearSavedBaselineButton =
  document.getElementById(
    "clearSavedBaseline"
  );


const saveBaselineCheckbox =
  document.getElementById(
    "saveBaseline"
  );


const BASELINE_STORAGE_KEY =
  "mountainDifficultySavedBaselineV1";



/* ==========================================
   比較用ルート
   Ver.0.3
========================================== */

const referenceMountains = [

  {
    name: "小樽赤岩山",
    score: 16
  },

  {
    name: "大雪山黒岳・7合目",
    score: 20
  },

  {
    name: "八剣山・南口登山口",
    score: 24
  },

  {
    name: "乗鞍岳・畳平～剣ヶ峰",
    score: 27
  },

  {
    name: "大雪山旭岳・姿見駅",
    score: 35
  },

  {
    name: "尻別岳・留寿都登山口",
    score: 35
  },

  {
    name: "十勝岳・望岳台",
    score: 49
  },

  {
    name: "塔ノ岳・大倉登山口",
    score: 63
  },

  {
    name: "羊蹄山・倶知安コース",
    score: 69
  },

  {
    name: "利尻山・北麓野営場",
    score: 71
  },

  {
    name: "富士山・富士宮ルート",
    score: 100
  }

];



/* ==========================================
   localStorage安全処理
========================================== */

function safeStorageGet(
  key
) {

  try {

    return localStorage.getItem(
      key
    );

  }

  catch (
    error
  ) {

    return null;

  }

}



function safeStorageSet(
  key,
  value
) {

  try {

    localStorage.setItem(
      key,
      value
    );

    return true;

  }

  catch (
    error
  ) {

    return false;

  }

}



function safeStorageRemove(
  key
) {

  try {

    localStorage.removeItem(
      key
    );

    return true;

  }

  catch (
    error
  ) {

    return false;

  }

}



/* ==========================================
   初期処理
========================================== */

restoreSavedBaseline();



calculateButton.addEventListener(
  "click",
  calculateDifficulty
);



clearSavedBaselineButton.addEventListener(
  "click",
  clearSavedBaseline
);



/* ==========================================
   診断
========================================== */

function calculateDifficulty() {


  const targetInput =
    readRouteInput(
      false
    );


  if (
    !validateMainInput(
      targetInput
    )
  ) {

    alert(
      "診断するルートの必須項目を確認してください。"
    );

    return;

  }



  const targetResult =
    calculateStandardScore(
      targetInput
    );



  const baselineMountainName =
    document.getElementById(
      "baselineMountainName"
    ).value.trim();



  const baselineRouteName =
    document.getElementById(
      "baselineRouteName"
    ).value.trim();



  const baselineInput =
    readRouteInput(
      true
    );



  const customBaselineUsed =
    isCustomBaselineUsed();



  let baselineRawScore =
    100;


  let baselineRoundedScore =
    100;


  let baselineDisplayName =
    "富士山・富士宮ルート";



  /* ==========================================
     任意基準あり
  ========================================== */

  if (
    customBaselineUsed
  ) {


    if (
      baselineMountainName === ""
    ) {

      alert(
        "比較基準を設定する場合は、基準にする山の名前を入力してください。"
      );

      return;

    }



    if (
      !validateMainInput(
        baselineInput
      )
    ) {

      alert(
        "比較基準を設定する場合は、基準ルートの基本項目をすべて入力してください。"
      );

      return;

    }



    const baselineResult =
      calculateStandardScore(
        baselineInput
      );



    baselineRawScore =
      baselineResult.rawScore;


    baselineRoundedScore =
      baselineResult.score;



    if (
      baselineRouteName !== ""
    ) {

      baselineDisplayName =
        baselineMountainName
        +
        "・"
        +
        baselineRouteName;

    }

    else {

      baselineDisplayName =
        baselineMountainName;

    }



    if (
      baselineRawScore <= 0
    ) {

      alert(
        "基準ルートの難易度を正しく算出できませんでした。"
      );

      return;

    }



    if (
      saveBaselineCheckbox.checked
    ) {

      saveBaseline();

    }

  }



  /* ==========================================
     表示指数
  ========================================== */

  const displayedScore =

    Math.round(

      (
        targetResult.rawScore
        /
        baselineRawScore
      )

      *

      100

    );



  displayResult({

    standardScore:
      targetResult.score,

    displayedScore:
      displayedScore,

    staminaScore:
      targetResult.staminaScore,

    averageGradient:
      targetResult.averageGradient,

    knownOptionalCount:
      targetResult.knownOptionalCount,

    technicalScore:
      targetResult.technicalScore,

    riskScore:
      targetResult.riskScore,

    terrainScore:
      targetResult.terrainScore,

    baselineRawScore:
      baselineRawScore,

    baselineScore:
      baselineRoundedScore,

    baselineName:
      baselineDisplayName,

    customBaselineUsed:
      customBaselineUsed

  });

}



/* ==========================================
   入力値取得
========================================== */

function readRouteInput(
  baseline
) {


  const prefix =
    baseline
      ?
      "baseline"
      :
      "";



  function makeId(
    name
  ) {

    if (
      prefix === ""
    ) {

      return name;

    }


    return (
      prefix
      +
      name.charAt(0).toUpperCase()
      +
      name.slice(1)
    );

  }



  const distanceRaw =
    document.getElementById(
      makeId(
        "distance"
      )
    ).value;



  const elevationRaw =
    document.getElementById(
      makeId(
        "elevation"
      )
    ).value;



  const hoursRaw =
    document.getElementById(
      makeId(
        "hours"
      )
    ).value;



  const minutesRaw =
    document.getElementById(
      makeId(
        "minutes"
      )
    ).value;



  const altitudeRaw =
    document.getElementById(
      makeId(
        "altitude"
      )
    ).value;



  return {


    distanceRaw:
      distanceRaw,


    elevationRaw:
      elevationRaw,


    hoursRaw:
      hoursRaw,


    minutesRaw:
      minutesRaw,


    altitudeRaw:
      altitudeRaw,


    distance:
      Number(
        distanceRaw
      ),


    elevation:
      Number(
        elevationRaw
      ),


    hours:
      hoursRaw === ""
        ?
        0
        :
        Number(
          hoursRaw
        ),


    minutes:
      minutesRaw === ""
        ?
        0
        :
        Number(
          minutesRaw
        ),


    altitude:
      Number(
        altitudeRaw
      ),


    routeType:
      document.getElementById(
        makeId(
          "routeType"
        )
      ).value,


    technical:
      document.getElementById(
        makeId(
          "technical"
        )
      ).value,


    risk:
      document.getElementById(
        makeId(
          "risk"
        )
      ).value,


    terrain:
      document.getElementById(
        makeId(
          "terrain"
        )
      ).value

  };

}



/* ==========================================
   基準入力があるか判定
========================================== */

function isCustomBaselineUsed() {


  const ids = [

    "baselineMountainName",

    "baselineRouteName",

    "baselineDistance",

    "baselineElevation",

    "baselineHours",

    "baselineMinutes",

    "baselineAltitude",

    "baselineTechnical",

    "baselineRisk",

    "baselineTerrain"

  ];



  return ids.some(

    function (
      id
    ) {

      return (

        document.getElementById(
          id
        ).value !== ""

      );

    }

  );

}



/* ==========================================
   Ver.0.3計算式
========================================== */

function calculateStandardScore(
  input
) {


  const courseTime =

    input.hours

    +

    input.minutes / 60;



  /* ① 体力点 */

  const R =

    0.25 *

    (
      input.distance /
      8.1
    )

    +

    0.40 *

    (
      input.elevation /
      1389
    )

    +

    0.35 *

    (
      courseTime /
      7.95
    );



  const staminaScore =

    49 *

    Math.pow(
      R,
      1.1
    );



  /* ② 高所補正 */

  let baseAltitudeScore =
    0;



  if (
    input.altitude >= 3776
  ) {

    baseAltitudeScore =
      35;

  }


  else if (
    input.altitude >= 2000
  ) {

    baseAltitudeScore =

      35 *

      Math.pow(

        (
          input.altitude
          -
          2000
        )

        /

        1776,

        2

      );

  }



  /* ③ CTによる高所軽減 */

  let altitudeTimeFactor =
    1;



  if (
    courseTime < 2
  ) {

    altitudeTimeFactor =
      0.30;

  }


  else if (
    courseTime < 3
  ) {

    altitudeTimeFactor =
      0.50;

  }


  else if (
    courseTime < 5
  ) {

    altitudeTimeFactor =
      0.75;

  }



  const altitudeScore =

    baseAltitudeScore

    *

    altitudeTimeFactor;



  /* ④ 平均勾配補正 */

  let averageGradient =
    null;


  let slopeBonus =
    0;



  if (
    input.routeType ===
    "round"
  ) {


    const ascentDistanceMeters =

      (
        input.distance
        /
        2
      )

      *

      1000;



    averageGradient =

      (
        input.elevation
        /
        ascentDistanceMeters
      )

      *

      100;



    if (
      averageGradient >= 30
    ) {

      slopeBonus =
        6;

    }


    else if (
      averageGradient >= 25
    ) {

      slopeBonus =
        4;

    }


    else if (
      averageGradient >= 20
    ) {

      slopeBonus =
        2;

    }


    else if (
      averageGradient >= 15
    ) {

      slopeBonus =
        1;

    }

  }



  /* ⑤ 技術情報 */

  const technicalKnown =
    input.technical !== "";


  const riskKnown =
    input.risk !== "";


  const terrainKnown =
    input.terrain !== "";



  const technicalScore =

    technicalKnown
      ?
      Number(
        input.technical
      )
      :
      0;



  const riskScore =

    riskKnown
      ?
      Number(
        input.risk
      )
      :
      0;



  const terrainScore =

    terrainKnown
      ?
      Number(
        input.terrain
      )
      :
      0;



  const optionalBonus =

    technicalScore

    +

    riskScore

    +

    terrainScore;



  const knownOptionalCount =

    Number(
      technicalKnown
    )

    +

    Number(
      riskKnown
    )

    +

    Number(
      terrainKnown
    );



  const rawScore =

    staminaScore

    +

    altitudeScore

    +

    slopeBonus

    +

    optionalBonus;



  const score =
    Math.round(
      rawScore
    );



  return {


    rawScore:
      rawScore,


    score:
      score,


    staminaScore:
      staminaScore,


    altitudeScore:
      altitudeScore,


    slopeBonus:
      slopeBonus,


    averageGradient:
      averageGradient,


    technicalScore:
      technicalScore,


    riskScore:
      riskScore,


    terrainScore:
      terrainScore,


    knownOptionalCount:
      knownOptionalCount

  };

}



/* ==========================================
   入力チェック
========================================== */

function validateMainInput(
  input
) {


  if (

    input.distanceRaw === ""

    ||

    input.elevationRaw === ""

    ||

    input.altitudeRaw === ""

  ) {

    return false;

  }



  if (

    input.hoursRaw === ""

    &&

    input.minutesRaw === ""

  ) {

    return false;

  }



  if (

    !Number.isFinite(
      input.distance
    )

    ||

    input.distance <= 0

    ||

    !Number.isFinite(
      input.elevation
    )

    ||

    input.elevation < 0

    ||

    !Number.isFinite(
      input.hours
    )

    ||

    input.hours < 0

    ||

    !Number.isFinite(
      input.minutes
    )

    ||

    input.minutes < 0

    ||

    input.minutes >= 60

    ||

    !Number.isFinite(
      input.altitude
    )

    ||

    input.altitude <= 0

  ) {

    return false;

  }



  const courseTime =

    input.hours

    +

    input.minutes / 60;



  return (
    courseTime > 0
  );

}



/* ==========================================
   結果表示
========================================== */

function displayResult(
  data
) {


  const result =
    document.getElementById(
      "result"
    );


  result.classList.remove(
    "hidden"
  );



  document.getElementById(
    "difficultyNumber"
  ).textContent =
    data.displayedScore;



  document.getElementById(
    "scoreBaseLabel"
  ).textContent =

    "/ "

    +

    getShortName(
      data.baselineName
    )

    +

    " 100";



  let difficultyClass =
    "初級";



  if (
    data.standardScore >= 81
  ) {

    difficultyClass =
      "上級";

  }


  else if (
    data.standardScore >= 36
  ) {

    difficultyClass =
      "中級";

  }



  document.getElementById(
    "difficultyClass"
  ).textContent =
    difficultyClass;



  document.getElementById(
    "staminaStars"
  ).textContent =

    getStaminaStars(
      data.staminaScore
    );



  const technicalStars =
    document.getElementById(
      "technicalStars"
    );



  if (
    data.knownOptionalCount === 0
  ) {

    technicalStars.textContent =
      "未判定";

  }


  else {

    technicalStars.textContent =

      getTechnicalStars(

        data.technicalScore

        +

        data.riskScore

        +

        data.terrainScore

      );

  }



  document.getElementById(
    "confidence"
  ).textContent =

    getConfidence(
      data.knownOptionalCount
    );



  const gradientBox =
    document.getElementById(
      "gradientBox"
    );



  if (
    data.averageGradient !== null
  ) {

    document.getElementById(
      "averageGradient"
    ).textContent =

      data.averageGradient.toFixed(
        1
      )

      +

      "%";


    gradientBox.classList.remove(
      "hidden"
    );

  }


  else {

    gradientBox.classList.add(
      "hidden"
    );

  }



  document.getElementById(
    "baselineResultTitle"
  ).textContent =

    data.baselineName

    +

    " ＝ 100";



  const baselineResultText =
    document.getElementById(
      "baselineResultText"
    );



  if (
    data.customBaselineUsed
  ) {

    baselineResultText.textContent =

      "入力された基準ルートの標準指数は"

      +

      data.baselineScore

      +

      "です。このルートを100として難易度指数を換算しています。";

  }


  else {

    baselineResultText.textContent =

      "比較基準が入力されていないため、富士山・富士宮ルートを100として表示しています。";

  }



  const warning =
    document.getElementById(
      "missingTechWarning"
    );



  if (
    data.knownOptionalCount < 3
  ) {

    warning.classList.remove(
      "hidden"
    );

  }


  else {

    warning.classList.add(
      "hidden"
    );

  }



  showClosestMountains(

    data.standardScore,

    data.baselineRawScore

  );



  result.scrollIntoView({

    behavior:
      "smooth",

    block:
      "start"

  });

}



/* ==========================================
   近い難易度
========================================== */

function showClosestMountains(

  standardScore,

  baselineRawScore

) {


  const sorted =

    [...referenceMountains]

    .sort(

      function (
        a,
        b
      ) {

        return (

          Math.abs(
            a.score
            -
            standardScore
          )

          -

          Math.abs(
            b.score
            -
            standardScore
          )

        );

      }

    )

    .slice(
      0,
      3
    );



  const container =
    document.getElementById(
      "comparisonList"
    );


  container.innerHTML =
    "";



  sorted.forEach(

    function (
      mountain
    ) {


      const convertedScore =

        Math.round(

          (
            mountain.score
            /
            baselineRawScore
          )

          *

          100

        );



      const item =
        document.createElement(
          "div"
        );


      item.className =
        "comparison-item";



      item.innerHTML =

        "<span>"

        +

        mountain.name

        +

        "</span>"

        +

        "<strong>"

        +

        convertedScore

        +

        "</strong>";



      container.appendChild(
        item
      );

    }

  );

}



/* ==========================================
   星・精度
========================================== */

function getStaminaStars(
  staminaScore
) {


  let level =
    1;


  if (
    staminaScore >= 60
  ) {

    level =
      5;

  }


  else if (
    staminaScore >= 45
  ) {

    level =
      4;

  }


  else if (
    staminaScore >= 30
  ) {

    level =
      3;

  }


  else if (
    staminaScore >= 18
  ) {

    level =
      2;

  }



  return (

    "★".repeat(
      level
    )

    +

    "☆".repeat(
      5 - level
    )

  );

}



function getTechnicalStars(
  score
) {


  let level =
    1;


  if (
    score > 8
  ) {

    level =
      5;

  }


  else if (
    score > 6
  ) {

    level =
      4;

  }


  else if (
    score > 3.5
  ) {

    level =
      3;

  }


  else if (
    score > 1.5
  ) {

    level =
      2;

  }



  return (

    "★".repeat(
      level
    )

    +

    "☆".repeat(
      5 - level
    )

  );

}



function getConfidence(
  count
) {


  if (
    count === 3
  ) {

    return "高";

  }


  if (
    count >= 1
  ) {

    return "標準";

  }


  return "基本";

}



function getShortName(
  name
) {


  if (
    name ===
    "富士山・富士宮ルート"
  ) {

    return "富士宮";

  }


  if (
    name.length > 12
  ) {

    return (

      name.substring(
        0,
        12
      )

      +

      "…"

    );

  }


  return name;

}



/* ==========================================
   保存
========================================== */

function saveBaseline() {


  const savedData = {


    mountainName:
      document.getElementById(
        "baselineMountainName"
      ).value,


    routeName:
      document.getElementById(
        "baselineRouteName"
      ).value,


    distance:
      document.getElementById(
        "baselineDistance"
      ).value,


    elevation:
      document.getElementById(
        "baselineElevation"
      ).value,


    hours:
      document.getElementById(
        "baselineHours"
      ).value,


    minutes:
      document.getElementById(
        "baselineMinutes"
      ).value,


    altitude:
      document.getElementById(
        "baselineAltitude"
      ).value,


    routeType:
      document.getElementById(
        "baselineRouteType"
      ).value,


    technical:
      document.getElementById(
        "baselineTechnical"
      ).value,


    risk:
      document.getElementById(
        "baselineRisk"
      ).value,


    terrain:
      document.getElementById(
        "baselineTerrain"
      ).value

  };



  const success =

    safeStorageSet(

      BASELINE_STORAGE_KEY,

      JSON.stringify(
        savedData
      )

    );



  if (
    success
  ) {

    setSaveStatus(
      "基準ルートをこの端末に保存しました。"
    );

  }


  else {

    setSaveStatus(
      "この開き方では保存機能を利用できない可能性があります。診断自体は利用できます。"
    );

  }

}



/* ==========================================
   復元
========================================== */

function restoreSavedBaseline() {


  const savedText =
    safeStorageGet(
      BASELINE_STORAGE_KEY
    );



  if (
    !savedText
  ) {

    return;

  }



  try {


    const savedData =
      JSON.parse(
        savedText
      );



    document.getElementById(
      "baselineMountainName"
    ).value =
      savedData.mountainName || "";



    document.getElementById(
      "baselineRouteName"
    ).value =
      savedData.routeName || "";



    document.getElementById(
      "baselineDistance"
    ).value =
      savedData.distance || "";



    document.getElementById(
      "baselineElevation"
    ).value =
      savedData.elevation || "";



    document.getElementById(
      "baselineHours"
    ).value =
      savedData.hours || "";



    document.getElementById(
      "baselineMinutes"
    ).value =
      savedData.minutes || "";



    document.getElementById(
      "baselineAltitude"
    ).value =
      savedData.altitude || "";



    document.getElementById(
      "baselineRouteType"
    ).value =
      savedData.routeType || "round";



    document.getElementById(
      "baselineTechnical"
    ).value =
      savedData.technical ?? "";



    document.getElementById(
      "baselineRisk"
    ).value =
      savedData.risk ?? "";



    document.getElementById(
      "baselineTerrain"
    ).value =
      savedData.terrain ?? "";



    saveBaselineCheckbox.checked =
      true;



    document.getElementById(
      "baselinePanel"
    ).open =
      true;



    setSaveStatus(
      "保存していた基準ルートを読み込みました。"
    );


  }


  catch (
    error
  ) {

    safeStorageRemove(
      BASELINE_STORAGE_KEY
    );

  }

}



/* ==========================================
   保存削除
========================================== */

function clearSavedBaseline() {


  safeStorageRemove(
    BASELINE_STORAGE_KEY
  );



  saveBaselineCheckbox.checked =
    false;



  clearBaselineInputs();



  setSaveStatus(
    "保存した基準ルートを削除しました。"
  );

}



/* ==========================================
   基準欄クリア
========================================== */

function clearBaselineInputs() {


  const ids = [

    "baselineMountainName",

    "baselineRouteName",

    "baselineDistance",

    "baselineElevation",

    "baselineHours",

    "baselineMinutes",

    "baselineAltitude"

  ];



  ids.forEach(

    function (
      id
    ) {

      document.getElementById(
        id
      ).value =
        "";

    }

  );



  document.getElementById(
    "baselineRouteType"
  ).value =
    "round";



  document.getElementById(
    "baselineTechnical"
  ).value =
    "";



  document.getElementById(
    "baselineRisk"
  ).value =
    "";



  document.getElementById(
    "baselineTerrain"
  ).value =
    "";

}



/* ==========================================
   保存メッセージ
========================================== */

function setSaveStatus(
  text
) {


  document.getElementById(
    "saveStatus"
  ).textContent =
    text;

}
