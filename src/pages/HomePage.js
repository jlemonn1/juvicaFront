import React, { useContext, useEffect, useStatem, useState} from 'react';
import WorkCard from '../components/WorkCard';
import { TrabajoContext } from '../context/TrabajoContext';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';

// Luego dentro del componente HomePage



const HomePage = () => {
    const { trabajos, loading, error } = useContext(TrabajoContext);
    const [activeIndex, setActiveIndex] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveIndex(parseInt(entry.target.getAttribute('data-id')));
                }
            });
        }, {
            threshold: 0.5, // Cambia a 0.5 para que el 50% de la tarjeta esté visible
        });

        const cards = document.querySelectorAll('.work-card');

        cards.forEach((card) => {
            observer.observe(card);
        });

        return () => {
            cards.forEach((card) => {
                observer.unobserve(card);
            });
        };
    }, [trabajos]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="work-card-container">
            {trabajos.map((trabajo, index) => (
                <WorkCard
                    key={trabajo.id}
                    id={trabajo.id}
                    nombre={trabajo.nombre}
                    imgUrl={trabajo.listaImagenes[0]}
                    onSelect={(id) => navigate(`/trabajo/${id}`)}
                    className={activeIndex === trabajo.id ? 'active' : ''} // Se puede usar para cambiar estilos si es necesario
                    data-id={trabajo.id} // Agregar un atributo de datos para usar en el observer
                />
            ))}
        </div>
    );
};

export default HomePage;
