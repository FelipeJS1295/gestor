import React, { useState, useEffect } from 'react';
import { getPasswords, createPassword, deletePassword, updatePassword } from '../services/passwordService';
import './PasswordManager.css'; // Importamos el archivo CSS

const PasswordManager = () => {
    const [passwords, setPasswords] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [showPasswordIds, setShowPasswordIds] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('todos');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        tipo: 'otro',
        nombre_sitio: '',
        url: '',
        usuario: '',
        contraseña: '',
        notas: '',
    });

    useEffect(() => {
        fetchPasswords();
    }, []);

    const filteredPasswords = passwords
    .filter((entry) => 
        entry.nombre_sitio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.usuario.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((entry) => 
        filterType === 'todos' ? true : entry.tipo === filterType
    );

    const fetchPasswords = async () => {
        try {
            const response = await getPasswords();
            setPasswords(response.data);
        } catch (error) {
            console.error('Error fetching passwords:', error);
        }
    };

    const togglePasswordVisibility = (id) => {
        if (showPasswordIds.includes(id)) {
            setShowPasswordIds(showPasswordIds.filter((item) => item !== id));
        } else {
            setShowPasswordIds([...showPasswordIds, id]);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta contraseña?')) {
            try {
                await deletePassword(id);
                fetchPasswords(); // recargar la lista después de eliminar
            } catch (error) {
                console.error('Error deleting password:', error);
            }
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const openModal = (isEdit = false, entry = null) => {
        if (isEdit && entry) {
            setFormData({
                tipo: entry.tipo,
                nombre_sitio: entry.nombre_sitio,
                url: entry.url || '',
                usuario: entry.usuario,
                contraseña: entry.contraseña,
                notas: entry.notas || '',
            });
            setIsEditing(true);
            setEditId(entry.id);
        } else {
            setFormData({
                tipo: 'otro',
                nombre_sitio: '',
                url: '',
                usuario: '',
                contraseña: '',
                notas: '',
            });
            setIsEditing(false);
            setEditId(null);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({
            tipo: 'otro',
            nombre_sitio: '',
            url: '',
            usuario: '',
            contraseña: '',
            notas: '',
        });
        setIsEditing(false);
        setEditId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updatePassword(editId, formData);
            } else {
                await createPassword(formData);
            }
            closeModal();
            fetchPasswords();
        } catch (error) {
            console.error('Error submitting password:', error);
        }
    };

    return (
        <div className="password-manager">
            <div className="section-header">
                <h1>Gestor de Contraseñas</h1>
                <button onClick={() => openModal()} className="btn-add">
                    <span className="icon">+</span> Nuevo Registro
                </button>
            </div>

            <div className="search-container">
                <div className="search-group">
                    <input
                        type="text"
                        placeholder="Buscar contraseña..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <i className="search-icon">🔍</i>
                </div>

                <div className="filter-group">
                    <label htmlFor="filter-type">Filtrar por:</label>
                    <select
                        id="filter-type"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="filter-select"
                    >
                        <option value="todos">Todos los tipos</option>
                        <option value="sitio_web">Sitios Web</option>
                        <option value="correo">Correos Electrónicos</option>
                        <option value="banco">Bancos</option>
                        <option value="aplicacion">Aplicaciones</option>
                        <option value="otro">Otros</option>
                    </select>
                </div>
            </div>

            <div className="passwords-section">
                <h2>Contraseñas Guardadas ({filteredPasswords.length})</h2>
                
                {filteredPasswords.length === 0 ? (
                    <div className="no-results">
                        <p>No se encontraron contraseñas que coincidan con tu búsqueda.</p>
                    </div>
                ) : (
                    <div className="passwords-grid">
                        {filteredPasswords.map((entry) => (
                            <div key={entry.id} className="password-card">
                                <div className="card-header">
                                    <h3>{entry.nombre_sitio}</h3>
                                    <span className={`badge badge-${entry.tipo}`}>
                                        {entry.tipo === 'sitio_web' && 'Sitio Web'}
                                        {entry.tipo === 'correo' && 'Correo'}
                                        {entry.tipo === 'banco' && 'Banco'}
                                        {entry.tipo === 'aplicacion' && 'App'}
                                        {entry.tipo === 'otro' && 'Otro'}
                                    </span>
                                </div>
                                
                                <div className="card-body">
                                    <div className="detail-item">
                                        <span className="label">Usuario:</span>
                                        <span className="value">{entry.usuario}</span>
                                    </div>
                                    
                                    <div className="detail-item">
                                        <span className="label">Contraseña:</span>
                                        <div className="password-toggle">
                                            <span className="value">
                                                {showPasswordIds.includes(entry.id) ? entry.contraseña : '••••••••'}
                                            </span>
                                            <button 
                                                onClick={() => togglePasswordVisibility(entry.id)}
                                                className="btn-toggle"
                                                title={showPasswordIds.includes(entry.id) ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                            >
                                                {showPasswordIds.includes(entry.id) ? '👁️' : '👁️‍🗨️'}
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {entry.url && (
                                        <div className="detail-item">
                                            <span className="label">URL:</span>
                                            <a href={entry.url} target="_blank" rel="noreferrer" className="url-link">
                                                {entry.url}
                                            </a>
                                        </div>
                                    )}
                                    
                                    {entry.notas && (
                                        <div className="detail-item notes">
                                            <span className="label">Notas:</span>
                                            <p>{entry.notas}</p>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="card-actions">
                                    <button 
                                        onClick={() => openModal(true, entry)} 
                                        className="btn-edit"
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(entry.id)} 
                                        className="btn-delete"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal para añadir/editar contraseña */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2>{isEditing ? 'Editar Contraseña' : 'Añadir Nueva Contraseña'}</h2>
                            <button className="modal-close" onClick={closeModal}>×</button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="tipo">Tipo de Cuenta</label>
                                    <select 
                                        id="tipo"
                                        name="tipo" 
                                        value={formData.tipo} 
                                        onChange={handleChange} 
                                        required
                                    >
                                        <option value="sitio_web">Sitio Web</option>
                                        <option value="correo">Correo Electrónico</option>
                                        <option value="banco">Banco</option>
                                        <option value="aplicacion">Aplicación</option>
                                        <option value="otro">Otro</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="nombre_sitio">Nombre del Sitio o Servicio</label>
                                    <input 
                                        type="text" 
                                        id="nombre_sitio"
                                        name="nombre_sitio" 
                                        value={formData.nombre_sitio} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>

                                {formData.tipo === 'sitio_web' && (
                                    <div className="form-group">
                                        <label htmlFor="url">URL</label>
                                        <input 
                                            type="url" 
                                            id="url"
                                            name="url" 
                                            value={formData.url} 
                                            onChange={handleChange} 
                                        />
                                    </div>
                                )}

                                <div className="form-group">
                                    <label htmlFor="usuario">Usuario</label>
                                    <input 
                                        type="text" 
                                        id="usuario"
                                        name="usuario" 
                                        value={formData.usuario} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contraseña">Contraseña</label>
                                    <input 
                                        type="text" 
                                        id="contraseña"
                                        name="contraseña" 
                                        value={formData.contraseña} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="notas">Notas</label>
                                    <textarea 
                                        id="notas"
                                        name="notas" 
                                        value={formData.notas} 
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <div className="modal-actions">
                                    <button type="button" className="btn-secondary" onClick={closeModal}>
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn-primary">
                                        {isEditing ? 'Actualizar' : 'Guardar'} Contraseña
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PasswordManager;