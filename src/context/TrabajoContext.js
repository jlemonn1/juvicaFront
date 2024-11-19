import React, { createContext, useEffect, useState } from 'react';

export const TrabajoContext = createContext();

const TrabajoProvider = ({ children, config}) => {
    const [trabajos, setTrabajos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiUrl = config.apiUrl;

    useEffect(() => {
        const fetchTrabajos = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/trabajos`);
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

    const obtenerTrabajoPorId = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/api/trabajos/${id}`);
            if (!response.ok) {
                throw new Error('Error al obtener el trabajo');
            }
            const trabajo = await response.json();
            return trabajo;
        } catch (err) {
            setError(err.message);
            return null;
        }
    };

    return (
        <TrabajoContext.Provider value={{ trabajos, loading, error, obtenerTrabajoPorId }}>
            {children}
        </TrabajoContext.Provider>
    );
};

export default TrabajoProvider;
