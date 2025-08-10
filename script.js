let matrix = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", ""]
];

const board = document.querySelector('.board');
let empty = findEmpty();

function findEmpty() {
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (matrix[r][c] === "") return { r, c };
    }
  }
  return { r: 2, c: 2 };
}

function drawTokens() {
  board.innerHTML = "";
  matrix.forEach((row, r) => {
    row.forEach((el, c) => {
      const cell = document.createElement('div');
      cell.dataset.r = r;
      cell.dataset.c = c;
      if (el === "") {
        cell.className = "empty";
      } else {
        cell.className = "token";
        cell.textContent = el;
        cell.addEventListener("click", onTileClick);
      }
      board.appendChild(cell);
    });
  });
}

function isAdjacent(r1, c1, r2, c2) {
  return Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
}

function onTileClick(e) {
  const r = Number(this.dataset.r);
  const c = Number(this.dataset.c);
  if (isAdjacent(r, c, empty.r, empty.c)) {
    matrix[empty.r][empty.c] = matrix[r][c];
    matrix[r][c] = "";
    empty = { r, c };
    drawTokens();
    if (checkWin()) {
      setTimeout(() => alert("¡Ganaste!"), 50);
    }
  }
}

function shuffle(times = 200) {
  for (let i = 0; i < times; i++) {
    const neighbors = [];
    const deltas = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ];
    for (const [dr, dc] of deltas) {
      const nr = empty.r + dr;
      const nc = empty.c + dc;
      if (nr >= 0 && nr < 3 && nc >= 0 && nc < 3) neighbors.push({ nr, nc });
    }
    const pick = neighbors[Math.floor(Math.random() * neighbors.length)];
    matrix[empty.r][empty.c] = matrix[pick.nr][pick.nc];
    matrix[pick.nr][pick.nc] = "";
    empty = { r: pick.nr, c: pick.nc };
  }
}

function checkWin() {
  const solved = ["1", "2", "3", "4", "5", "6", "7", "8", ""];
  const flat = matrix.flat();
  return flat.join(",") === solved.join(",");
}

empty = findEmpty();
shuffle();
drawTokens();