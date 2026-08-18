* {
  box-sizing: border-box;
}


:root {

  --forest: #31543b;

  --forest-dark: #203a29;

  --forest-light: #edf3ed;

  --text: #28332b;

  --muted: #6f786f;

  --line: #dce4dc;

  --cream: #f3f1e9;

}


html {
  scroll-behavior: smooth;
}


body {

  margin: 0;

  font-family:
    "Yu Gothic",
    "YuGothic",
    "Hiragino Kaku Gothic ProN",
    sans-serif;

  color:
    var(--text);

  background:
    var(--cream);

}



/* ========================================
   ヘッダー
======================================== */

.hero {

  padding:
    60px 20px
    72px;

  color:
    white;

  background:
    linear-gradient(
      140deg,
      #1d3525,
      #486c4e
    );

}


.hero-inner {

  max-width:
    760px;

  margin:
    auto;

}


.eyebrow,
.section-kicker,
.result-label {

  margin-bottom:
    8px;

  font-size:
    11px;

  font-weight:
    800;

  letter-spacing:
    .18em;

}


.eyebrow {
  opacity: .7;
}


h1 {

  margin:
    8px 0
    16px;

  font-size:
    clamp(
      34px,
      7vw,
      55px
    );

}


.lead {

  max-width:
    620px;

  line-height:
    1.8;

}


.hero-badge {

  display:
    inline-block;

  margin-top:
    20px;

  padding:
    9px 15px;

  border:
    1px solid
    rgba(
      255,
      255,
      255,
      .4
    );

  border-radius:
    100px;

  background:
    rgba(
      255,
      255,
      255,
      .12
    );

  font-size:
    13px;

}



/* ========================================
   メイン
======================================== */

main {

  width:
    min(
      92%,
      760px
    );

  margin:
    -32px auto
    70px;

}


.card {

  margin-bottom:
    24px;

  padding:
    30px;

  border-radius:
    20px;

  background:
    white;

  box-shadow:
    0 12px 35px
    rgba(
      30,
      50,
      35,
      .08
    );

}


.input-card {

  border-top:
    5px solid
    var(--forest);

}


.section-kicker {

  margin-top:
    0;

  color:
    #7f947f;

}


h2 {

  margin-top:
    0;

}


.description {

  color:
    var(--muted);

  line-height:
    1.8;

}



/* ========================================
   入力
======================================== */

.form-grid {

  display:
    grid;

  grid-template-columns:
    1fr 1fr;

  gap:
    20px;

}


.form-group {

  margin-bottom:
    22px;

}


label {

  display:
    block;

  margin-bottom:
    8px;

  font-weight:
    bold;

}


.required {

  margin-left:
    4px;

  padding:
    2px 6px;

  border-radius:
    4px;

  background:
    var(--forest-light);

  color:
    var(--forest);

  font-size:
    10px;

}


.input-row {

  display:
    flex;

  align-items:
    center;

  gap:
    10px;

}


.input-row span {

  flex:
    none;

  min-width:
    30px;

  color:
    var(--muted);

  font-size:
    13px;

}


.time-row {

  display:
    flex;

  gap:
    16px;

}


.time-row
.input-row {

  flex:
    1;

}


input,
select {

  width:
    100%;

  min-height:
    50px;

  padding:
    12px;

  border:
    1px solid
    #ccd5cc;

  border-radius:
    11px;

  background:
    #fbfcfa;

  color:
    var(--text);

  font-size:
    16px;

}


input:focus,
select:focus {

  outline:
    3px solid
    rgba(
      80,
      120,
      85,
      .15
    );

  border-color:
    #79947b;

}


.small-note {

  color:
    var(--muted);

  font-size:
    11px;

  line-height:
    1.7;

}


.center-note {
  text-align: center;
}



/* ========================================
   折りたたみ
======================================== */

.optional-panel,
.baseline-panel,
.baseline-tech-panel {

  margin:
    16px 0
    24px;

  padding:
    0 18px;

  border:
    1px solid
    var(--line);

  border-radius:
    14px;

  background:
    #f8faf7;

}


.optional-panel summary,
.baseline-panel summary,
.baseline-tech-panel summary {

  padding:
    18px 0;

  font-weight:
    bold;

  cursor:
    pointer;

}


.optional-panel summary span,
.baseline-panel summary span,
.baseline-tech-panel summary span {

  margin-left:
    6px;

  color:
    var(--muted);

  font-size:
    11px;

}


.optional-help {

  color:
    var(--muted);

  font-size:
    12px;

  line-height:
    1.7;

}


.baseline-panel {

  background:
    #f5f8f3;

}


.baseline-intro {

  margin-bottom:
    22px;

  padding:
    16px;

  border-radius:
    12px;

  background:
    #eaf1e8;

}


.baseline-intro p {

  margin:
    6px 0 0;

  color:
    #617063;

  font-size:
    12px;

  line-height:
    1.7;

}


.baseline-tech-panel {

  margin-bottom:
    20px;

  background:
    white;

}



/* ========================================
   保存欄
======================================== */

.save-baseline-box {

  margin:
    18px 0 22px;

  padding:
    16px;

  border:
    1px solid
    var(--line);

  border-radius:
    13px;

  background:
    white;

}


.save-checkbox {

  display:
    flex;

  align-items:
    center;

  gap:
    10px;

  cursor:
    pointer;

}


.save-checkbox input {

  width:
    20px;

  min-height:
    auto;

  height:
    20px;

  margin:
    0;

}


.save-checkbox span {

  font-size:
    14px;

}


.secondary-button {

  margin-top:
    8px;

  padding:
    11px 14px;

  border:
    1px solid
    #b7c3b8;

  border-radius:
    10px;

  background:
    white;

  color:
    var(--forest);

  box-shadow:
    none;

  font-size:
    13px;

}


.save-status {

  min-height:
    18px;

  margin:
    8px 0 0;

  color:
    var(--forest);

  font-size:
    11px;

}



/* ========================================
   メインボタン
======================================== */

#calculateButton {

  width:
    100%;

  padding:
    17px;

  border:
    none;

  border-radius:
    13px;

  background:
    linear-gradient(
      135deg,
      var(--forest),
      var(--forest-dark)
    );

  color:
    white;

  font-size:
    18px;

  font-weight:
    bold;

  cursor:
    pointer;

}



/* ========================================
   結果
======================================== */

.hidden {

  display:
    none !important;

}


.result-card {

  border-top:
    5px solid
    var(--forest);

  text-align:
    center;

}


.result-label {

  color:
    #7e927e;

}


.result-title {

  color:
    var(--muted);

  font-size:
    14px;

}


.score-wrap {

  display:
    flex;

  align-items:
    baseline;

  justify-content:
    center;

  gap:
    8px;

}


.difficulty-number {

  font-size:
    80px;

  font-weight:
    900;

  line-height:
    1;

}


.score-base {

  color:
    var(--muted);

  font-size:
    12px;

}


.difficulty-class {

  display:
    inline-block;

  margin:
    18px 0;

  padding:
    8px 25px;

  border:
    1px solid
    #bbc7bb;

  border-radius:
    100px;

  font-size:
    18px;

  font-weight:
    bold;

}



/* ========================================
   星
======================================== */

.meter-grid {

  display:
    grid;

  grid-template-columns:
    1fr 1fr;

  gap:
    14px;

}


.level-box {

  padding:
    18px;

  border-radius:
    14px;

  background:
    var(--forest-light);

}


.level-box p {

  margin:
    0 0 8px;

  color:
    var(--muted);

  font-size:
    13px;

}


.stars {

  font-size:
    25px;

}



/* ========================================
   診断精度
======================================== */

.confidence-row {

  display:
    flex;

  justify-content:
    space-between;

  margin-top:
    15px;

  padding:
    15px 18px;

  border:
    1px solid
    var(--line);

  border-radius:
    13px;

}



/* ========================================
   平均勾配
======================================== */

.gradient-box {

  margin-top:
    14px;

  padding:
    16px 18px;

  border:
    1px solid
    var(--line);

  border-radius:
    14px;

  background:
    #f7f8f4;

  text-align:
    left;

}


.gradient-row {

  display:
    flex;

  justify-content:
    space-between;

  align-items:
    center;

}


.gradient-row span {

  color:
    var(--muted);

  font-size:
    13px;

}


.gradient-row strong {

  color:
    var(--forest);

  font-size:
    20px;

}


.gradient-box p {

  margin:
    8px 0 0;

  color:
    var(--muted);

  font-size:
    11px;

  line-height:
    1.6;

}



/* ========================================
   基準結果
======================================== */

.baseline-result-box {

  margin-top:
    20px;

  padding:
    18px;

  border-radius:
    14px;

  background:
    #eaf0e7;

  text-align:
    left;

}


.box-small-title {

  margin:
    0 0 7px;

  color:
    var(--muted);

  font-size:
    11px;

}


.baseline-result-box p:last-child {

  margin-bottom:
    0;

  color:
    var(--muted);

  font-size:
    12px;

  line-height:
    1.7;

}



/* ========================================
   比較
======================================== */

.comparison-box {

  margin-top:
    20px;

  padding:
    20px;

  border:
    1px solid
    var(--line);

  border-radius:
    15px;

  text-align:
    left;

}


.comparison-box h3 {

  margin-top:
    0;

}


.comparison-item {

  display:
    flex;

  justify-content:
    space-between;

  gap:
    15px;

  padding:
    11px 0;

  border-bottom:
    1px solid
    #e7ebe6;

}


.comparison-item:last-child {

  border-bottom:
    none;

}



/* ========================================
   警告
======================================== */

.warning-box {

  margin-top:
    20px;

  padding:
    18px;

  border:
    1px solid
    #c8c2ab;

  border-radius:
    14px;

  background:
    #f8f5e9;

  text-align:
    left;

  line-height:
    1.7;

}


.warning-box p {

  margin-bottom:
    0;

}



/* ========================================
   説明
======================================== */

.about-card {

  line-height:
    1.8;

}


.about-card p {

  color:
    #5f685f;

}



/* ========================================
   フッター
======================================== */

footer {

  padding:
    30px 20px;

  background:
    #213527;

  color:
    #dfe6df;

  text-align:
    center;

  font-size:
    12px;

}



/* ========================================
   スマホ
======================================== */

@media
(max-width: 640px) {


  .card {

    padding:
      23px 18px;

  }


  .form-grid {

    grid-template-columns:
      1fr;

    gap:
      0;

  }


  .meter-grid {

    grid-template-columns:
      1fr;

  }


  .difficulty-number {

    font-size:
      68px;

  }


  .time-row {

    gap:
      9px;

  }

}
