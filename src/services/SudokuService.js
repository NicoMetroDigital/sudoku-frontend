const API_URL = "http://localhost:8080/sudoku"; // Basis-URL für alle API-Anfragen

// 🟢 Funktion zum Abrufen des Authentifizierungs-Tokens (falls benötigt)
const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken"); // Falls ein Token gespeichert wird
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// 🟢 Holt ein Sudoku-Board mit einem bestimmten Schwierigkeitsgrad
export const fetchNewSudoku = async (difficulty = "easy") => {
    try {
        const response = await fetch(`${API_URL}/new?difficulty=${difficulty}`, { // "/new" ist der richtige Endpunkt
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
            credentials: "include", // Falls Cookies für Authentifizierung genutzt werden
        });

        if (!response.ok) {
            throw new Error(`Fehler: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Sudoku geladen:", data);  // Logge die Antwort zum Debuggen
        return data;  // Gibt das Sudoku-Grid zurück
    } catch (error) {
        console.error("fetchNewSudoku Fehler:", error);
        return null;  // Gibt null zurück, wenn es einen Fehler gibt
    }
};

// 🟢 Holt ein zufälliges Sudoku-Board ohne Schwierigkeitsgrad-Filter
export const getSudokuBoard = async () => {
    try {
        const response = await fetch(`${API_URL}`, { // Der Endpunkt für das Abrufen eines zufälligen Sudoku-Boards
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Fehler: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Zufälliges Sudoku geladen:", data);  // Logge die Antwort zum Debuggen
        return data;  // Gibt das Sudoku-Grid zurück
    } catch (error) {
        console.error("getSudokuBoard Fehler:", error);
        return null;  // Gibt null zurück, wenn es einen Fehler gibt
    }
};

// 🟢 Sendet ein Sudoku-Board zum Lösen an das Backend
export const solveSudoku = async (board) => {
    try {
        const response = await fetch(`${API_URL}/solve`, { // Der Endpunkt zum Lösen eines Sudoku-Boards
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
            credentials: "include",
            body: JSON.stringify({ grid: board }), // "grid" ist der Parameter, den das Backend erwartet
        });

        if (!response.ok) {
            throw new Error(`Fehler: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Gelöstes Sudoku:", data);  // Logge die Antwort zum Debuggen
        return data;  // Gibt das gelöste Sudoku zurück
    } catch (error) {
        console.error("solveSudoku Fehler:", error);
        return null;  // Gibt null zurück, wenn es einen Fehler gibt
    }
};
