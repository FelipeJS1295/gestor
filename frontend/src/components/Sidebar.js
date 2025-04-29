import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('contraseñas');
    const [collapsed, setCollapsed] = useState(false);
    
    const handleNavClick = (item) => {
        setActiveItem(item);
    };
    
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <>
            <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    <h2>Gestor</h2>
                    <button className="toggle-button" onClick={toggleSidebar}>
                        {collapsed ? '→' : '←'}
                    </button>
                </div>
                
                <div className="sidebar-content">
                    <nav className="sidebar-nav">
                        <ul>
                            <li 
                                className={activeItem === 'inicio' ? 'active' : ''}
                                onClick={() => handleNavClick('inicio')}
                            >
                                <span className="icon">🏠</span>
                                <span className="text">Inicio</span>
                            </li>
                            <li 
                                className={activeItem === 'contraseñas' ? 'active' : ''}
                                onClick={() => handleNavClick('contraseñas')}
                            >
                                <span className="icon">🔑</span>
                                <span className="text">Contraseñas</span>
                            </li>
                            <li 
                                className={activeItem === 'categorias' ? 'active' : ''}
                                onClick={() => handleNavClick('categorias')}
                            >
                                <span className="icon">📂</span>
                                <span className="text">Categorías</span>
                            </li>
                            <li 
                                className={activeItem === 'ajustes' ? 'active' : ''}
                                onClick={() => handleNavClick('ajustes')}
                            >
                                <span className="icon">⚙️</span>
                                <span className="text">Ajustes</span>
                            </li>
                        </ul>
                    </nav>
                </div>
                
                <div className="sidebar-footer">
                    <div className="user-info">
                        <div className="avatar">U</div>
                        <div className="user-details">
                            <span className="username">Usuario</span>
                            <span className="status">En línea</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Overlay para dispositivos móviles */}
            {!collapsed && (
                <div 
                    className="sidebar-overlay" 
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};

export default Sidebar;
