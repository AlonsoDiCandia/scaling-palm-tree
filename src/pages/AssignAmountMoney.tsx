// src/pages/AsignarAmountMoney.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Portfolio } from '../models/Portfolio';
import { usePortfolio } from '../context/PortfolioContext';

export default function AsignarAmountMoney() {
  const [amount, setamount] = useState('');
  const navigate = useNavigate();
  const { setPortfolio } = usePortfolio();

  const handleContinuar = () => {
    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed <= 0) {
      alert("Ingresa un monto válido mayor a 0");
      return;
    }

    const portfolio = new Portfolio(parsed);
    setPortfolio(portfolio);
    navigate('/asignar-porcentajes');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Portafolio: Asignar cantidad de dinero</h1>
      <input
        type="number"
        step="0.01"
        placeholder="Monto total del portafolio"
        value={amount}
        onChange={(e) => setamount(e.target.value)}
      />
      <button onClick={handleContinuar}>Continuar</button>
    </div>
  );
}
