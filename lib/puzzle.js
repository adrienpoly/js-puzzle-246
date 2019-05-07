//elements
const hintButton = document.querySelector("#show-hint");
const hint = document.querySelector(".hint");
const tiles = document.querySelectorAll("td");

const options = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  ""
];

// game functions
const initializeGameBoard = () => {
  const shuffledOptions = shuffle(options);
  const tiles = document.querySelectorAll("td");
  tiles.forEach((tile, index) => {
    tile.innerText = shuffledOptions[index];
    if (shuffledOptions[index] === "") {
      tile.classList.add("empty");
    }
  });
};

const hasWon = () => {
  const tiles = document.querySelectorAll("td");
  const answer = Array.from(tiles).map(tile => {
    return tile.innerText;
  });
  return options.join(",") == answer.join(",");
};

const moveTiles = (tile, emptyTile) => {
  const value = tile.innerText;
  tile.classList.add("empty");
  tile.innerText = "";
  emptyTile.classList.remove("empty");
  emptyTile.innerText = value;
};

const canMove = (tile, emptyTile) => {
  const row = tile.closest("tr").rowIndex;
  const column = tile.cellIndex;
  const emptyRow = emptyTile.closest("tr").rowIndex;
  const emptyColumn = emptyTile.cellIndex;

  return (
    (row === emptyRow && column + 1 === emptyColumn) ||
    (row === emptyRow && column - 1 === emptyColumn) ||
    (row + 1 === emptyRow && column === emptyColumn) ||
    (row - 1 === emptyRow && column === emptyColumn)
  );
};

//event handlers
const handleHintClick = () => {
  hint.classList.toggle("active");
};

const handleCellClick = event => {
  const emptyCell = document.querySelector(".empty");

  if (canMove(event.currentTarget, emptyCell)) {
    moveTiles(event.currentTarget, emptyCell);
  }
  console.log("hasWon()", hasWon());
};

// event initializers
const initializeListeners = () => {
  tiles.forEach(tile => {
    tile.addEventListener("click", handleCellClick);
  });

  hintButton.addEventListener("click", handleHintClick);
};

//utils
const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

initializeGameBoard();
initializeListeners();
