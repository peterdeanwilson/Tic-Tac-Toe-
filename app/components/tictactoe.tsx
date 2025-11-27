"use client";
import { useState } from "react";

export default function TicTacToe() {
  // state for board size chosen by the user
  const [boardSize, setBoardSize] = useState(3);

  // state to track if the user has started the game
  const [gameStarted, setGameStarted] = useState(false);

  // state for player name (used when submitting to leaderboard)
  const [playerName, setPlayerName] = useState("");

  // helper function to create a blank board for any size
  const createBoard = (size: number) => Array(size * size).fill("");

  // state for the board, current player, and winner
  const [board, setBoard] = useState<string[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);

  // decide box size based on board size so the board fits on screen
  const getCellSize = (size: number) => {
    if (size <= 5) return 80;
    if (size <= 8) return 60;
    if (size <= 12) return 45;
    return 35; // for large boards like 13 to 15
  };

  const cellSize = getCellSize(boardSize);

  // handles when a player clicks a square
  const handleClick = (index: number) => {
    // ignore if square already filled or the game is over
    if (board[index] !== "" || winner) return;

    // update the board with the current player's move
    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);

    // check if this move caused a win or draw
    const winnerFound = checkWinner(updatedBoard, boardSize);
    if (winnerFound) {
      setWinner(winnerFound);
      return;
    }

    // switch turns between X and O
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  // checks rows, columns and diagonals for any board size
  const checkWinner = (b: string[], size: number) => {
    // check rows
    for (let row = 0; row < size; row++) {
      const start = row * size;
      const first = b[start];
      if (first && b.slice(start, start + size).every(cell => cell === first)) {
        return first;
      }
    }

    // check columns
    for (let col = 0; col < size; col++) {
      const first = b[col];
      if (!first) continue;

      let win = true;
      for (let row = 1; row < size; row++) {
        if (b[row * size + col] !== first) {
          win = false;
          break;
        }
      }
      if (win) return first;
    }

    // check main diagonal (top-left to bottom-right)
    const firstMain = b[0];
    if (firstMain) {
      let win = true;
      for (let i = 1; i < size; i++) {
        if (b[i * size + i] !== firstMain) {
          win = false;
          break;
        }
      }
      if (win) return firstMain;
    }

    // check anti diagonal (top-right to bottom-left)
    const firstAnti = b[size - 1];
    if (firstAnti) {
      let win = true;
      for (let i = 1; i < size; i++) {
        if (b[i * size + (size - 1 - i)] !== firstAnti) {
          win = false;
          break;
        }
      }
      if (win) return firstAnti;
    }

    // if board is full and no winner, it is a draw
    if (b.every(cell => cell !== "")) return "Draw";

    return null;
  };

  // send the winner + name to the leaderboard API
  const saveScore = async () => {
    if (!playerName) return;

    await fetch("/api/leaderboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: playerName, winner })
    });

    setPlayerName("");
    resetGame();
  };

  // resets the game but keeps the chosen board size
  const resetGame = () => {
    setBoard(createBoard(boardSize));
    setWinner(null);
    setCurrentPlayer("X");
  };

  // if the game has not started yet, show the size selector
  if (!gameStarted) {
    return (
      <div className="game-container">
        <style>{`
          .game-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 30px;
            font-family: Arial, sans-serif;
          }

          .start-input {
            margin-top: 10px;
          }

          .start-btn {
            margin-top: 15px;
            padding: 8px 15px;
            border: 2px solid black;
            background-color: white;
            cursor: pointer;
            font-weight: bold;
          }

          .start-btn:hover {
            background-color: #eee;
          }
        `}</style>

        <h2>Select Board Size (3 to 15)</h2>

        <input
          className="start-input"
          type="number"
          min="3"
          max="15"
          value={boardSize}
          onChange={(e) => setBoardSize(Number(e.target.value))}
        />

        <button
          className="start-btn"
          onClick={() => {
            setBoard(createBoard(boardSize));
            setWinner(null);
            setCurrentPlayer("X");
            setGameStarted(true);
          }}
        >
          Start Game
        </button>
      </div>
    );
  }

  // main game UI
  return (
    <div className="game-container">
      <style>{`
        .game-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 30px;
          font-family: Arial, sans-serif;
        }

        .status {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .cell {
          width: ${cellSize}px;
          height: ${cellSize}px;
          font-size: ${cellSize * 0.6}px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: white;
          border: 2px solid black;
          cursor: pointer;
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
        }

        .reset-btn:hover {
          background-color: #eee;
        }

        .name-input {
          margin-top: 15px;
          padding: 5px;
          border: 1px solid black;
        }

        .save-btn {
          margin-top: 10px;
          padding: 8px 15px;
          border: 2px solid black;
          cursor: pointer;
          font-weight: bold;
          background-color: white;
        }

        .save-btn:hover {
          background-color: #eee;
        }
      `}</style>

      <div className="status">
        {winner
          ? winner === "Draw"
            ? "It is a draw"
            : `Winner: ${winner}`
          : `Current Player: ${currentPlayer}`}
      </div>

      <div
        className="board"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${boardSize}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${boardSize}, ${cellSize}px)`,
          gap: "5px"
        }}
      >
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
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <div>Enter your name</div>

          <input
            className="name-input"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />

          <button className="save-btn" onClick={saveScore}>
            Save Score
          </button>
        </div>
      )}
    </div>
  );
}
