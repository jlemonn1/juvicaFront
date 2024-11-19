import React from 'react';
import '../styles/Footer.css';
import { FaInstagram, FaEnvelope, FaTiktok } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="social-icons">
                    <a href="https://www.instagram.com/juvicamove" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="icon" />
                    </a>
                    <a href="mailto:juvicamove@gmail.com">
                        <FaEnvelope className="icon" />
                    </a>
                    <a href="https://www.tiktok.com/@juvicamove" target="_blank" rel="noopener noreferrer">
                        <FaTiktok className="icon" />
                    </a>
                </div>
                <p className="footer-text">© 2024 Juvica. Todos los derechos reservados ;)</p>
            </div>
        </footer>
    );
};

export default Footer;
