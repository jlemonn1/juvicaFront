import React, { useEffect, useState } from 'react';
import WorkCard from '../components/WorkCard';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/CategoriaDetailPage.css';

const CategoriaDetailPage = () => {
    const { id } = useParams();
    const [categoria, setCategoria] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategoryById = async (id) => {
            setLoading(true);
            try {
                const response = await fetch(`https://juvicamove.es/api/categorias/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener la categoría');
                }
                const data = await response.json();
                setCategoria(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryById(id);
    }, [id]);

    if (loading) {
        return <div>Cargando categoría...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!categoria) {
        return <div>No se encontró la categoría.</div>;
    }

    return (
        <div className="work-card-container">
            <div className="category-image">
                <img className="category-image__img" src={categoria.imgUrl} alt={categoria.nombre} />
                <h2 className="category-image__title">{categoria.nombre}</h2>
            </div>
            {categoria.trabajos && categoria.trabajos.length > 0 ? (
                categoria.trabajos.map((trabajo) => (
                    <WorkCard
                        key={trabajo.id}
                        id={trabajo.id}
                        nombre={trabajo.nombre}
                        lazyImgUrl={trabajo.listaMedia[0]}
                        onSelect={(id) => navigate(`/trabajo/${id}`)}
                        style={{
                            opacity: 0.2
                        }}
                    />
                ))
            ) : (
                <div>No hay trabajos disponibles para esta categoría.</div>
            )}
        </div>
    );
};

export default CategoriaDetailPage;
