import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(10, 0);
    }, [pathname]); // Esto se ejecutará cada vez que el pathname cambie (es decir, en cada redirección)

    return null; // Este componente no necesita renderizar nada
};

export default ScrollToTop;
