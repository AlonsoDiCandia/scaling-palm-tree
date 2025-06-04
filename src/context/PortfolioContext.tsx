import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Portfolio } from '../models/Portfolio';

interface PortfolioContextValue {
  portfolio: Portfolio | null;
  setPortfolio: (p: Portfolio) => void;
}

const PortfolioContext = createContext<PortfolioContextValue | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [portfolio, setPortfolioState] = useState<Portfolio | null>(null);

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const raw = localStorage.getItem('portfolio');
    if (raw) {
      const plain = JSON.parse(raw);
      const p = new Portfolio(plain.moneyAvaliable);
      p.allocated = plain.allocated;
      p.stocks = plain.stocks || [];
      setPortfolioState(p);
    }
  }, []);

  const setPortfolio = (p: Portfolio) => {
    setPortfolioState(p);
    localStorage.setItem('portfolio', JSON.stringify(p));
  };

  return (
    <PortfolioContext.Provider value={{ portfolio, setPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within PortfolioProvider');
  return context;
}
