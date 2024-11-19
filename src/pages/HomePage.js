// HomePage.js
import React, { useEffect, useState, useContext } from 'react';
import WorkCard from '../components/WorkCard';
import { useNavigate } from 'react-router-dom';
import { TrabajoContext } from '../context/TrabajoContext'; // Asegúrate de ajustar la ruta según sea necesario
import '../styles/Home.css';

const HomePage = () => {
    const { trabajos, loading, error } = useContext(TrabajoContext); // Obtiene el contexto
    const [activeIndex, setActiveIndex] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target); // Deja de observar para evitar recargas innecesarias
                    }
                });
            },
            { threshold: 0.5 }
        );

        const cards = document.querySelectorAll('.work-card');
        cards.forEach((card) => observer.observe(card));

        return () => {
            cards.forEach((card) => observer.unobserve(card));
        };
    }, [trabajos]);

    // Muestra un mensaje de carga o de error si es necesario

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="work-card-container">
            {loading ? (
                <div className="spinner-overlay">
                    {/* Add spinner content here */}
                </div>
            ) : (
                trabajos.map((trabajo) => (
                    <WorkCard
                        key={trabajo.id}
                        id={trabajo.id}
                        nombre={trabajo.nombre}
                        lazyImgUrl={trabajo.listaMedia[0] ? trabajo.listaMedia[0] : "No disp"}
                        onSelect={(id) => navigate(`/trabajo/${id}`)}
                        className={activeIndex === trabajo.id ? 'active' : ''}
                    />
                ))
            )}
        </div>

    );
};

export default HomePage;
