import React, { useRef } from 'react';
import '../styles/WorkCard.css';

const WorkCard = ({ id, nombre, imgUrl, onSelect }) => {
    const cardRef = useRef(null);

    const handleClick = () => {
        onSelect(id); // Redirige al hacer clic
    };

    return (
        <div ref={cardRef} className="work-card" onClick={handleClick}>
            <img src={imgUrl} alt={nombre} className="work-image" />
            <div className="overlay">{nombre}</div>
        </div>
    );
};

export default WorkCard;
