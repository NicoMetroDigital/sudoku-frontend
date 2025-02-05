import React, { useEffect, useState } from "react";
import axios from "axios";
import Cell from "./Cell";
import "./components/SudokuGrid.css";

const SudokuGrid = () => {
    const [grid, setGrid] = useState([]); // ✅ Sicherstellen, dass grid immer ein Array ist
    const [loading, setLoading] = useState(true);

    // Funktion zum Abrufen eines neuen Sudokus basierend auf der Schwierigkeit
    const loadSudoku = async (difficulty = "easy") => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/sudoku/new?difficulty=${difficulty}`, {
                withCredentials: true,  // Falls Cookies benötigt werden
            });
            setGrid(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching Sudoku grid:", error);
            setLoading(false);
        }
    };

    // Initiales Laden des Sudokus bei Komponentemount
    useEffect(() => {
        loadSudoku("easy"); // Beispiel: Standardmäßig "easy" laden
    }, []);

    // Handhabung der Zellenänderung
    const handleCellChange = (row, col, value) => {
        const updatedGrid = [...grid];
        updatedGrid[row][col] = value;
        setGrid(updatedGrid);
    };

    // Handhabung der Überprüfung des Sudokus
    const handleSubmit = () => {
        axios
            .post("http://localhost:8080/sudoku/validate", grid, {
                withCredentials: true, // Falls Cookies benötigt werden
            })
            .then((response) => {
                if (response.data.valid) {
                    alert("Congratulations! You solved the puzzle!");
                } else {
                    alert("There are errors in your solution.");
                }
            })
            .catch((error) => {
                console.error("Error validating Sudoku:", error);
            });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="sudoku-grid">
                {grid.map((row, rowIndex) => (
                    <div className="sudoku-row" key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <Cell
                                key={`${rowIndex}-${colIndex}`}
                                value={cell}
                                row={rowIndex}
                                col={colIndex}
                                onChange={handleCellChange}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <button className="submit-button" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};

export default SudokuGrid;
