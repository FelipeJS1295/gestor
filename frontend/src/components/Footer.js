import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            width: '100%',
            height: '40px',
            backgroundColor: '#1f2937',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            bottom: 0,
            left: 0,
            paddingLeft: '240px', // espacio para el sidebar
            boxSizing: 'border-box'
        }}>
            <p style={{ fontSize: '0.9rem' }}>© {new Date().getFullYear()} - Gestor de Contraseñas v1.0</p>
        </footer>
    );
};

export default Footer;
