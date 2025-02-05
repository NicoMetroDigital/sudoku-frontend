import React, { useState } from "react";
import { fetchNewSudoku, solveSudoku } from "./services/SudokuService"; // ✅ Use the correct import path
import "./components/SudokuGrid.css"; // Your CSS file for styling

const SudokuGrid = () => {
    const [grid, setGrid] = useState([]);
    const [solvedGrid, setSolvedGrid] = useState([]);

    // Laden eines neuen Sudokus je nach Schwierigkeit
    const loadSudoku = async (difficulty) => {
        const newGrid = await fetchNewSudoku(difficulty);
        if (newGrid) {
            setGrid(newGrid);
            setSolvedGrid([]); // Reset solved grid when new Sudoku is loaded
        } else {
            console.error("Konnte Sudoku nicht laden!");
            setGrid([]); // Falls es fehlschlägt, setzen wir ein leeres Array
        }
    };

    // Sudoku lösen
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

    return (
        <div>
            {/* Buttons */}
            <div>
                <button onClick={() => loadSudoku("easy")}>Load Easy Sudoku</button>
                <button onClick={() => loadSudoku("medium")}>Load Medium Sudoku</button>
                <button onClick={() => loadSudoku("hard")}>Load Hard Sudoku</button>
                <button onClick={solveCurrentSudoku}>Solve Sudoku</button>
            </div>

            {/* Sudoku Grid anzeigen */}
            <div className="grid">
                {grid.length > 0 && (
                    <div>
                        <h3>Sudoku</h3>
                        {grid.map((row, rowIndex) => (
                            <div key={rowIndex} className="row">
                                {row.map((cell, cellIndex) => (
                                    <div key={cellIndex} className="cell">
                                        {cell !== 0 ? cell : ""}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}

                {/* Gelöstes Sudoku anzeigen */}
                {solvedGrid.length > 0 && (
                    <div>
                        <h3>Solved Sudoku</h3>
                        {solvedGrid.map((row, rowIndex) => (
                            <div key={rowIndex} className="row">
                                {row.map((cell, cellIndex) => (
                                    <div key={cellIndex} className="cell">
                                        {cell !== 0 ? cell : ""}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SudokuGrid;
