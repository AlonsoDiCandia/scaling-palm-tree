// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AsignarAmountMoney from './pages/AsignarAmountMoney';
import AsignarPorcentajes from './pages/AsignarPorcentajes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AsignarAmountMoney />} />
      <Route path="/asignar-porcentajes" element={<AsignarPorcentajes />} />
    </Routes>
  );
}

export default App;
