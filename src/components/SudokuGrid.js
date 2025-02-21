import React, { useState } from "react";
import { fetchNewSudoku } from "./services/SudokuService";
import "./SudokuGrid.css";

const SudokuGrid = () => {
    const [grid, setGrid] = useState(Array(9).fill(Array(9).fill(0)));

    // Sudoku laden
    const loadSudoku = async (difficulty) => {
        const newGrid = await fetchNewSudoku(difficulty);
        if (newGrid) {
            setGrid(newGrid);
        } else {
            console.error("Konnte Sudoku nicht laden!");
        }
    };

    // Funktion zum Überprüfen, ob eine Zahl erlaubt ist
    const isValid = (grid, row, col, num) => {
        for (let i = 0; i < 9; i++) {
            if (grid[row][i] === num || grid[i][col] === num) {
                return false;
            }
        }

        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[startRow + i][startCol + j] === num) {
                    return false;
                }
            }
        }
        return true;
    };

    // Sudoku lösen mit Backtracking
    const solve = (grid) => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(grid, row, col, num)) {
                            grid[row][col] = num;
                            if (solve(grid)) {
                                return true;
                            }
                            grid[row][col] = 0; // Backtrack
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };

    // Wrapper-Funktion für den Button
    const solveSudoku = () => {
        const gridCopy = grid.map((row) => [...row]); // Tiefenkopie des Arrays
        if (solve(gridCopy)) {
            setGrid(gridCopy);
        } else {
            console.error("Keine Lösung gefunden!");
        }
    };

    return (
        <div className="sudoku-container">
            <div className="buttons">
                <button onClick={() => loadSudoku("easy")}>Load Easy Sudoku</button>
                <button onClick={() => loadSudoku("medium")}>Load Medium Sudoku</button>
                <button onClick={() => loadSudoku("hard")}>Load Hard Sudoku</button>
                <button onClick={solveSudoku}>Solve Sudoku</button>
            </div>

            <div className="sudoku-grid">
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="sudoku-row">
                        {row.map((cell, cellIndex) => (
                            <input
                                key={cellIndex}
                                type="text"
                                className={`sudoku-cell ${
                                    (rowIndex + 1) % 3 === 0 ? "border-bottom" : ""
                                } ${(cellIndex + 1) % 3 === 0 ? "border-right" : ""}`}
                                value={cell !== 0 ? cell : ""}
                                readOnly
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SudokuGrid;
