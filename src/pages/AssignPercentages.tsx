// src/pages/AsignarAcciones.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

const accionesDisponibles = ["AAPL", "GOOGL", "MSFT", "META", "AMZN"];

function AssignPercentages() {
  const { portfolio } = usePortfolio();
  const navigate = useNavigate();
  const [symbol, setSymbol] = useState('');
  const [percentage, setPercentage] = useState('');
  const [_, setRefresh] = useState(false);

  if (!portfolio) {
    return <p style={{ padding: '2rem' }}>Error: no se encontró el portafolio. Vuelve a la página anterior.</p>;
  }

  const handleAddAllocation = () => {
    const parsed = parseFloat(percentage);
    if (!symbol || isNaN(parsed) || parsed <= 0 || parsed > 100) {
      alert("Símbolo o porcentaje inválido (0 < % <= 100)");
      return;
    }

    portfolio.allocated[symbol] = parsed;
    setSymbol('');
    setPercentage('');
    setRefresh(prev => !prev);
  };

  const restante = portfolio.getPercentageRemaining();

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Portafolio: Asignar porcentajes de las acciones</h1>
      <h2>Porcentaje disponible: {restante.toFixed(2)}%</h2>
      <p>Debes asignar el 100% que tengas disponible antes de continuar</p>

      <div>
        <select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        >
          <option value="">-- Selecciona una acción --</option>
          {accionesDisponibles.map((accion) => (
            <option key={accion} value={accion}>{accion}</option>
          ))}
        </select>

        <input
          type="number"
          step="0.01"
          placeholder="Porcentaje % (ej: 50)"
          value={percentage}
          onChange={e => setPercentage(e.target.value)}
        />
        <button onClick={handleAddAllocation}>Agregar</button>
      </div>

      <h2>📊 Asignaciones</h2>
      <ul>
        {Object.entries(portfolio.allocated).map(([key, val]) => (
          <li key={key}>{key}: {val.toFixed(2)}%</li>
        ))}
      </ul>

      {restante <= 0 && (
        <button onClick={() => navigate('/operar-portafolio')}>
          Continuar al resumen
        </button>
      )}
    </div>
  );
}

export default AssignPercentages;
