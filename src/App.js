import React, { useState } from "react";
import { fetchNewSudoku, solveSudoku } from "./services/SudokuService";
import "./components/SudokuGrid.css"; // ❗ Hier sicherstellen, dass die Datei existiert

const SudokuGrid = () => {
    const [grid, setGrid] = useState(Array(9).fill(Array(9).fill(0))); // 9x9 leeres Grid
    const [solvedGrid, setSolvedGrid] = useState([]);

    const loadSudoku = async (difficulty) => {
        const newGrid = await fetchNewSudoku(difficulty);
        if (newGrid) {
            setGrid(newGrid);
            setSolvedGrid([]);
        } else {
            console.error("Konnte Sudoku nicht laden!");
            setGrid(Array(9).fill(Array(9).fill(0))); // Falls fehlschlägt, leeres Grid
        }
    };

    const solveCurrentSudoku = async () => {
        if (grid.length > 0) {
            const solved = await solveSudoku(grid);
            if (solved) {
                setSolvedGrid(solved);
            } else {
                console.error("Konnte Sudoku nicht lösen!");
            }
        } else {
            console.error("Kein Sudoku geladen, um es zu lösen!");
        }
    };

    const handleChange = (row, col, value) => {
        if (/^[1-9]?$/.test(value)) { // Nur Zahlen 1-9 zulassen
            const newGrid = grid.map((r, rIndex) =>
                rIndex === row
                    ? r.map((c, cIndex) => (cIndex === col ? (value ? parseInt(value) : 0) : c))
                    : r
            );
            setGrid(newGrid);
        }
    };

    return (
        <div>
            <div>
                <button onClick={() => loadSudoku("easy")}>Load Easy Sudoku</button>
                <button onClick={() => loadSudoku("medium")}>Load Medium Sudoku</button>
                <button onClick={() => loadSudoku("hard")}>Load Hard Sudoku</button>
                <button onClick={solveCurrentSudoku}>Solve Sudoku</button>
            </div>

            {/* 🔹 Sudoku Feld mit 9x9 Grid */}
            <div className="sudoku-container">
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="sudoku-row">
                        {row.map((cell, cellIndex) => (
                            <input
                                key={cellIndex}
                                type="text"
                                value={cell !== 0 ? cell : ""}
                                onChange={(e) => handleChange(rowIndex, cellIndex, e.target.value)}
                                maxLength="1"
                                className="sudoku-cell"
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* 🔹 Gelöstes Sudoku anzeigen */}
            {solvedGrid.length > 0 && (
                <div>
                    <h3>Solved Sudoku</h3>
                    <div className="sudoku-container">
                        {solvedGrid.map((row, rowIndex) => (
                            <div key={rowIndex} className="sudoku-row">
                                {row.map((cell, cellIndex) => (
                                    <div key={cellIndex} className="sudoku-cell solved">
                                        {cell !== 0 ? cell : ""}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SudokuGrid;
