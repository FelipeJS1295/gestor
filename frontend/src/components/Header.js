import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    
    return (
        <header className={`app-header ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                <div className="header-left">
                    <h1>Gestor de Contraseñas</h1>
                </div>
                
                <div className="header-right">
                    <div className="search-container">
                        <input type="text" placeholder="Buscar..." className="search-input" />
                        <button className="search-button">🔍</button>
                    </div>
                    
                    <div className="header-actions">
                        <button className="action-button notifications">
                            <span className="icon">🔔</span>
                            <span className="badge">2</span>
                        </button>
                        
                        <button className="action-button">
                            <span className="icon">⚙️</span>
                        </button>
                        
                        <div className="user-dropdown">
                            <button className="user-button" onClick={toggleMenu}>
                                <div className="user-avatar">U</div>
                                <span className="dropdown-icon">▼</span>
                            </button>
                            
                            {menuOpen && (
                                <div className="dropdown-menu">
                                    <ul>
                                        <li>
                                            <span className="menu-icon">👤</span>
                                            <span>Perfil</span>
                                        </li>
                                        <li>
                                            <span className="menu-icon">⚙️</span>
                                            <span>Configuración</span>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <span className="menu-icon">🚪</span>
                                            <span>Cerrar sesión</span>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                <button className="mobile-menu-toggle">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
            </div>
        </header>
    );
};

export default Header;
