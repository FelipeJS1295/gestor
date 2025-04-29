import React from 'react';
import PasswordManager from './components/PasswordManager';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css'; // Importa el archivo CSS

function App() {
  return (
    <div className="app-container">
      <Header />
      <Sidebar />
      <div className="main-content">
        <PasswordManager />
      </div>
      <Footer />
    </div>
  );
}

export default App;
