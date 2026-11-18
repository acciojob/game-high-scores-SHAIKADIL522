const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const scores = document.getElementById("scores");

const KEY = "scores";

function getScores() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveScore() {
  const name = nameInput.value.trim();
  const score = scoreInput.value.trim();

  if (name && score) {
    const data = getScores();
    data.push({ name, score });
    localStorage.setItem(KEY, JSON.stringify(data));
    nameInput.value = "";
    scoreInput.value = "";
  }
  showScores();
}

function showScores() {
  const data = getScores();
  scores.innerHTML = "";

  if (data.length === 0) {
    scores.textContent = "No scores yet";
    return;
  }

  const table = document.createElement("table");

  const head = table.insertRow();
  ["Name", "Score"].forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    head.appendChild(th);
  });

  data.forEach((item) => {
    const row = table.insertRow();
    row.insertCell().textContent = item.name;
    row.insertCell().textContent = item.score;
  });

  scores.appendChild(table);
}