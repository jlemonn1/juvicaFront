import React, { useContext } from 'react';
import CategoryCard from '../components/CategoryCard';
import { useNavigate } from 'react-router-dom';
import { CategoryContext } from '../context/CategoryContext';
import Logo from '../assets/imgBranding/logo.jpg';
import '../styles/Category.css';

const CategoryPage = () => {
    const { categories, loading } = useContext(CategoryContext); // Accedemos a loading desde el contexto
    const navigate = useNavigate();

    return (
        <div className="category-page-container">
            {loading ? (
                <div className="spinner-overlay">
                </div>
            ) : (
                <div className="category-card-container">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            id={category.id}
                            nombre={category.nombre}
                            lazyImgUrl={category.imgUrl}
                            onSelect={(id) => navigate(`/categoria/${id}`)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
