// ✅ Basis-URL über .env oder fallback auf localhost
const API_HOST = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";
const API_URL = `${API_HOST}`; // <-- /sudoku entfernt

// 🔐 Auth-Header (optional)
const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// 🟢 Neues Sudoku anfordern
export const fetchNewSudoku = async (difficulty = "easy") => {
    try {
        const response = await fetch(`${API_URL}/api/sudoku/generate/${difficulty}`, {  // Route geändert
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
        const response = await fetch(`${API_URL}/api/sudoku`, {  // Route geändert
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
        const response = await fetch(`${API_URL}/api/sudoku/solve`, {  // Route geändert
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
