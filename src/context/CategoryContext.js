// src/context/CategoryContext.js
import React, { createContext, useEffect, useState } from 'react';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children, config}) => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiUrl = config.apiUrl;
    
   
    

    useEffect(() => {
        const fetchAllCategories = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${apiUrl}/api/categorias`);
                if (!response.ok) {
                    throw new Error('Error al obtener categorías');
                }
                const data = await response.json();
                setCategories(data);// Indica que las categorías ya se cargaron
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllCategories();
    }, []);

    const fetchCategoryById = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/categorias/${id}`);
            if (!response.ok) {
                throw new Error('Error al obtener la categoría');
            }
            const data = await response.json();
            setCategory(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CategoryContext.Provider value={{ categories, category, loading, error, fetchCategoryById }}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryProvider;
