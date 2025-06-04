// src/pages/AsignarAmountMoney.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Portfolio } from '../models/Portfolio';
import { usePortfolio } from '../context/PortfolioContext';

export default function AsignarAmountMoney() {
  const [monto, setMonto] = useState('');
  const navigate = useNavigate();
  const { setPortfolio } = usePortfolio();

  const handleContinuar = () => {
    const parsed = parseFloat(monto);
    if (isNaN(parsed) || parsed <= 0) {
      alert("Ingresa un monto válido mayor a 0");
      return;
    }

    const portafolio = new Portfolio(parsed);
    setPortfolio(portafolio);
    navigate('/asignar-porcentajes');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Portafolio: Asignar cantidad de dinero</h1>
      <input
        type="number"
        step="0.01"
        placeholder="Monto total del portafolio"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
      />
      <button onClick={handleContinuar}>Continuar</button>
    </div>
  );
}
