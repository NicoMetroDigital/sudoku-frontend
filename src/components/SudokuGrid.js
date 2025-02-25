import React, { useState } from "react";
import { fetchNewSudoku, solveSudoku } from "./services/SudokuService";
import "./components/SudokuGrid.css"; // Stelle sicher, dass die CSS-Datei geladen wird!

const SudokuGrid = () => {
    const [grid, setGrid] = useState([]);
    const [initialGrid, setInitialGrid] = useState([]); // Speichert vorgegebene Zahlen
    const [solvedGrid, setSolvedGrid] = useState([]);

    // Hilfsfunktion zur Formatierung von API-Daten
    const formatGrid = (flatArray) => {
        return Array.from({ length: 9 }, (_, i) => flatArray.slice(i * 9, i * 9 + 9));
    };

    // Neues Sudoku abrufen
    const loadSudoku = async (difficulty) => {
        console.log(`Lade Sudoku mit Schwierigkeitsgrad: ${difficulty}`);
        try {
            const response = await fetch(`/api/sudoku/generate/${difficulty}`);
            if (!response.ok) {
                throw new Error("Fehler beim Abrufen des Sudokus");
            }
            const { grid: newGrid, presetPositions } = await response.json();
            const formattedGrid = formatGrid(newGrid);
            if (formattedGrid) {
                setGrid(formattedGrid);
                // Speichere die Positionen der vorgegebenen Zahlen
                setInitialGrid(formattedGrid.map((row, rowIndex) =>
                    row.map((cell, cellIndex) => presetPositions.some(pos => pos[0] === rowIndex && pos[1] === cellIndex) ? cell : null)
                ));
                setSolvedGrid([]);
            } else {
                console.error("Konnte Sudoku nicht laden!");
                setGrid([]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Sudoku lösen
    const solveCurrentSudoku = async () => {
        console.log("Versuche, das Sudoku zu lösen");
        if (grid.length > 0) {
            const solved = await solveSudoku(grid);
            if (solved) {
                setSolvedGrid(solved);
            } else {
                console.error("Konnte Sudoku nicht lösen!");
            }
        } else {
            console.error("Kein Sudoku geladen!");
        }
    };

    // Grid auswählen: Gelöst oder normal?
    const currentGrid = solvedGrid.length > 0 ? solvedGrid : grid;

    return (
        <div className="sudoku-container">

            <div className="sudoku-grid">
                {currentGrid.map((row, rowIndex) => (
                    <div key={rowIndex} className="sudoku-row">
                        {row.map((cell, cellIndex) => {
                            const isPreset = initialGrid[rowIndex]?.[cellIndex] !== null;
                            return (
                                <input
                                    key={cellIndex}
                                    type="text"
                                    maxLength="1"
                                    value={cell !== 0 ? cell : ""}
                                    className={`sudoku-cell ${isPreset ? "preset" : ""}`}
                                    onChange={(e) => {
                                        const newValue = parseInt(e.target.value) || 0;
                                        if (!isPreset && newValue >= 1 && newValue <= 9) {
                                            const newGrid = [...grid];
                                            newGrid[rowIndex][cellIndex] = newValue;
                                            setGrid(newGrid);
                                        }
                                    }}
                                    disabled={isPreset} // Verhindert Änderungen an vorgegebenen Zahlen
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SudokuGrid;
