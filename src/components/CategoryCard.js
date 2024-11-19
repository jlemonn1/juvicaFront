// CategoryCard.js
import React, { useRef, useState, useEffect } from 'react';
import '../styles/CategoryCard.css';

const CategoryCard = ({ id, nombre, lazyImgUrl, onSelect, className }) => {
    const cardRef = useRef(null);
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setImgSrc(lazyImgUrl); // Carga la imagen solo cuando es visible
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.4 }
        );

        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, [lazyImgUrl]);

    const handleClick = () => {
        onSelect(id);
    };

    return (
        <div ref={cardRef} className={`category-card ${className}`} onClick={handleClick}>
            <img src={imgSrc} alt={nombre} className="category-image" />
            <div className="category-overlay">{nombre}</div>
        </div>
    );
};

export default CategoryCard;
