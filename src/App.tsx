// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AsignarPorcentajes from './pages/AsignarPorcentajes';
import ResumenPortafolio from './pages/ResumenPortafolio';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AsignarPorcentajes />} />
        <Route path="/resumen" element={<ResumenPortafolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
