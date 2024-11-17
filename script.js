document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusDisplay = document.querySelector(".status");
    const resetButton = document.querySelector(".reset-btn");

    let currentPlayer = "X";
    let gameState = Array(9).fill(""); // Represents the 3x3 grid
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal top-left to bottom-right
        [2, 4, 6]  // Diagonal top-right to bottom-left
    ];

    function handleCellClick(e) {
        const cell = e.target;
        const index = cell.getAttribute("data-index");

        if (gameState[index] !== "" || !gameActive) return;

        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add("taken");

        if (checkWinner()) {
            statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
            gameActive = false;
        } else if (gameState.every(cell => cell !== "")) {
            statusDisplay.textContent = "It's a Draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }

    function checkWinner() {
        return winningConditions.some(condition =>
            condition.every(index => gameState[index] === currentPlayer)
        );
    }

    function resetGame() {
        gameState = Array(9).fill("");
        currentPlayer = "X";
        gameActive = true;
        statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("taken");
        });
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);

    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
});
