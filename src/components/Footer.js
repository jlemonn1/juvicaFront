import React from 'react';
import '../styles/Footer.css';
import { FaInstagram, FaEnvelope, FaTiktok } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="social-icons">
                    <a href="https://www.instagram.com/tu_usuario" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="icon" />
                    </a>
                    <a href="mailto:tu_correo@example.com">
                        <FaEnvelope className="icon" />
                    </a>
                    <a href="https://www.tiktok.com/@tu_usuario" target="_blank" rel="noopener noreferrer">
                        <FaTiktok className="icon" />
                    </a>
                </div>
                <p className="footer-text">© 2024 Juvica. Todos los derechos reservados ;)</p>
            </div>
        </footer>
    );
};

export default Footer;
