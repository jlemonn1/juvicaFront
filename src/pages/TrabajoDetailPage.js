import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { TrabajoContext } from '../context/TrabajoContext';
import '../styles/TrabajoDetailPage.css';

const TrabajoDetailPage = () => {
    const { id } = useParams();
    const { obtenerTrabajoPorId } = useContext(TrabajoContext);
    const [trabajo, setTrabajo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleMedia, setVisibleMedia] = useState([]);

    useEffect(() => {
        const fetchTrabajo = async () => {
            try {
                const trabajoData = await obtenerTrabajoPorId(id);
                if (trabajoData) {
                    setTrabajo(trabajoData);
                }
            } catch (err) {
                setError('Error al cargar los detalles del trabajo.');
            }
            setLoading(false);
        };
        fetchTrabajo();
    }, [id, obtenerTrabajoPorId]);

    useEffect(() => {
        if (!trabajo?.listaMedia) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const mediaIndex = parseInt(entry.target.dataset.index, 10);
                    setVisibleMedia((prev) => [...prev, mediaIndex]);
                    observer.unobserve(entry.target);
                }
            });
        });

        const mediaElements = document.querySelectorAll('.trabajo-gallery__media');
        mediaElements.forEach((media, index) => {
            media.dataset.index = index;
            observer.observe(media);
        });

        return () => {
            mediaElements.forEach((media) => observer.unobserve(media));
        };
    }, [trabajo?.listaMedia]);


    if (error) return <div>Error: {error}</div>;
    if (!trabajo) return <div>No se encontró el trabajo.</div>;

    // Función para determinar el tipo de medio
    const getMediaType = (mediaUrl) => {
        if (mediaUrl.includes('/media/image')) return 'image';
        if (mediaUrl.includes('/media/video')) return 'video';
        return 'unknown';
    };

    // Manejo del click en videos
    const handleVideoClick = (e) => {
        const video = e.target;
        video.paused ? video.play() : video.pause();
    };

    return (
        <>
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
            )}
    
            {!loading && (
                <div className="trabajo-detail-container">
                    <div
                        className="trabajo-image"
                        style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${trabajo.listaMedia?.[0]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <h2 className="trabajo-image__title">{trabajo.nombre}</h2>
                    </div>
    
                    <div className="trabajo-details">
                        <p className="trabajo-date">
                            {new Date(trabajo.fechaRegistro).toLocaleDateString()}
                        </p>
                        <p className="trabajo-comment">{trabajo.comentarioLargo || ''}</p>
                    </div>
    
                    <div className="trabajo-gallery">
                        {trabajo.listaMedia?.map((media, index) => {
                            const mediaType = getMediaType(media);
    
                            return (
                                <div
                                    key={index}
                                    className="trabajo-gallery__media"
                                    data-index={index}
                                >
                                    {mediaType === 'image' && (
                                        <img
                                            src={media}
                                            alt={`Media ${index}`}
                                            loading="lazy"
                                            className={
                                                visibleMedia.includes(index) ? 'visible' : ''
                                            }
                                        />
                                    )}
                                    {mediaType === 'video' && (
                                        <video
                                            src={media}
                                            controls
                                            onClick={handleVideoClick}
                                            className={
                                                visibleMedia.includes(index) ? 'visible' : ''
                                            }
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
    
};

export default TrabajoDetailPage;
