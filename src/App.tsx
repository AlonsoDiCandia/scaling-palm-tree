// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AsignarAmountMoney from './pages/AssignAmountMoney';
import AssignPercentages from './pages/AssignPercentages';
import OperatePortfolio from './pages/OperatePortfolio';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AsignarAmountMoney />} />
      <Route path="/asignar-porcentajes" element={<AssignPercentages />} />
      <Route path="/operar-portafolio" element={<OperatePortfolio />} />
    </Routes>
  );
}

export default App;
