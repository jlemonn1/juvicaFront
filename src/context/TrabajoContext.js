import React, { createContext, useEffect, useState } from 'react';

export const TrabajoContext = createContext();

const TrabajoProvider = ({ children }) => {
    const [trabajos, setTrabajos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrabajos = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/trabajos'); // Ajusta la URL según tu configuración
                if (!response.ok) {
                    throw new Error('Error al obtener trabajos');
                }
                const data = await response.json();
                setTrabajos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTrabajos();
    }, []);

    return (
        <TrabajoContext.Provider value={{ trabajos, loading, error }}>
            {children}
        </TrabajoContext.Provider>
    );
};

export default TrabajoProvider;
