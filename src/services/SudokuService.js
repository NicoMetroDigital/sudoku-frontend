// Dynamische Basis-URL: zuerst .env prüfen, dann hostname-Check
const API_HOST =
    process.env.REACT_APP_BACKEND_URL ||
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? "http://localhost:8080"
        : "http://sudoku:8080");

const API_URL = `${API_HOST}/sudoku`;

// 🔐 Auth-Header (optional)
const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// 🟢 Neues Sudoku anfordern
export const fetchNewSudoku = async (difficulty = "easy") => {
    try {
        const response = await fetch(`${API_URL}/new?difficulty=${difficulty}`, {
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
        console.log("Sudoku geladen:", data);
        return data;
    } catch (error) {
        console.error("fetchNewSudoku Fehler:", error);
        return null;
    }
};

// 🟢 Zufälliges Sudoku holen
export const getSudokuBoard = async () => {
    try {
        const response = await fetch(`${API_URL}`, {
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
        console.log("Zufälliges Sudoku geladen:", data);
        return data;
    } catch (error) {
        console.error("getSudokuBoard Fehler:", error);
        return null;
    }
};

// 🟢 Sudoku lösen
export const solveSudoku = async (board) => {
    try {
        const response = await fetch(`${API_URL}/solve`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
            credentials: "include",
            body: JSON.stringify({ grid: board }),
        });

        if (!response.ok) {
            throw new Error(`Fehler: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Gelöstes Sudoku:", data);
        return data;
    } catch (error) {
        console.error("solveSudoku Fehler:", error);
        return null;
    }
};
