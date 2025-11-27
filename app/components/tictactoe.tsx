"use client";
import { useState } from "react";

export default function TicTacToe() {
  // empty 3x3 board stored as an array of 9 strings
  const emptyBoard = Array(9).fill("");

  // state for the board, current player, and winner
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);

  // handles when a player clicks a square
  const handleClick = (index: number) => {
    // ignore if square already filled or the game is over
    if (board[index] !== "" || winner) return;

    // update the board with the current player's move
    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);

    // check if this move caused a win or draw
    const winnerFound = checkWinner(updatedBoard);
    if (winnerFound) {
      setWinner(winnerFound);
      return;
    }

    // switch turns between X and O
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  // checks all possible winning combinations
  const checkWinner = (b: string[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // loop through win conditions
    for (let [a, b2, c] of lines) {
      if (b[a] && b[a] === b[b2] && b[a] === b[c]) {
        return b[a];
      }
    }

    // if all cells are filled and no winner, it's a draw
    if (b.every((cell) => cell !== "")) return "Draw";

    return null;
  };

  // resets the game back to the starting state
  const resetGame = () => {
    setBoard(emptyBoard);
    setWinner(null);
    setCurrentPlayer("X");
  };

    return (
    <div className="game-container">
      <style>{`
        .game-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 30px;
          font-family: Arial, sans-serif;
          color: black; /* make all text inside container black */
        }

        .status {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 20px;
          color: black; /* ensure status text is black */
        }

        .board {
          display: grid;
          grid-template-columns: repeat(3, 80px);
          grid-template-rows: repeat(3, 80px);
          gap: 5px;
        }

        .cell {
          width: 80px;
          height: 80px;
          font-size: 32px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: white;
          border: 2px solid black;
          cursor: pointer;
          color: black; /* X and O are black */
        }

        .cell:hover {
          background-color: #f0f0f0;
        }

        .reset-btn {
          margin-top: 20px;
          padding: 8px 15px;
          border: 2px solid black;
          background-color: white;
          cursor: pointer;
          font-weight: bold;
          color: black; /* button text is black */
        }

        .reset-btn:hover {
          background-color: #eee;
        }
      `}</style>

      <div className="status">
        {winner
          ? winner === "Draw"
            ? "It's a draw!"
            : `Winner: ${winner}`
          : `Current Player: ${currentPlayer}`}
      </div>

      <div className="board">
        {board.map((value, index) => (
          <button
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      {winner && (
        <button className="reset-btn" onClick={resetGame}>
          Start New Game
        </button>
      )}
    </div>
  );
}
