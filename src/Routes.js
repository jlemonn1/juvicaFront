import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importar los componentes de las páginas
import HomePage from './pages/HomePage';
import CategoriasPage from './pages/CategoriasPage';
import CategoriaDetailPage from './pages/CategoriaDetailPage';
import TrabajoDetailPage from './pages/TrabajoDetailPage';
import AboutPage from './pages/AboutPage'
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const AppRoutes = () => {
    return (
        <Router>
            <Navbar /> {/* Barra de navegación global */}
            <Routes>
                {/* Ruta para la página de inicio */}
                <Route path="/" element={<HomePage />} />

                {/* Ruta para la lista de categorías */}
                <Route path="/categorias" element={<CategoriasPage />} />

                {/* Ruta para el detalle de una categoría */}
                <Route path="/categoria/:id" element={<CategoriaDetailPage />} />

                {/* Ruta para el detalle de un trabajo específico */}
                <Route path="/trabajo/:id" element={<TrabajoDetailPage />} />

                {/* Ruta para about */}
                <Route path="/about" element={<AboutPage />} />

                {/* Redireccionar a /home si no coincide con ninguna ruta */}
                <Route path="*" element={<HomePage />} />
            </Routes>
            <Footer /> {/* Pie de página global */}
        </Router>
    );
};

export default AppRoutes;
