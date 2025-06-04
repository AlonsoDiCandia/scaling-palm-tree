// src/pages/OperatePortfolio.tsx
import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import data from '../data/precios_acciones_250s.json';

function OperatePortfolio() {
  const { portfolio } = usePortfolio();
  const [buy, setBuy] = useState(false);
  const [index, setIndex] = useState(0);
  const [currentPrices, setCurrentPrices] = useState<Record<string, number> | null>(null);
  const [rebalance, setRebalance] = useState<{ name: string; action: 'comprar' | 'vender'; amount: number }[]| null>(null);

  useEffect(() => {
    if (portfolio && currentPrices && buy) {
      portfolio.buyStocks(currentPrices);
    }
  }, [buy]);
  

  useEffect(() => {
    const interval = setInterval(() => {
      if (portfolio && index < data.length) {
        setCurrentPrices(data[index]);
        setIndex((prev) => prev + 1);
        if (currentPrices) {
          setRebalance(portfolio.rebalance(currentPrices));
        }
        if (!buy) {
            setBuy(true);
        }
      } else {
        clearInterval(interval);
      }
    }, 2000); // cada 2 segundos

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h3>Operando acciones</h3>

    {portfolio && portfolio.stocks.length > 0 && (
        <div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {portfolio.stocks.map((stock) => (
              <li key={stock.name}>{stock.amount} {stock.name}: ${stock.price.toFixed(2)}</li>
            ))}
          </ul>
        </div>
    )}

    {rebalance && (
        <div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {rebalance.map((r, i) => (
                <li key={r.name + i}>{r.action} {r.amount} acciones de {r.name}</li>
                ))}
            </ul>
        </div>
    )}

      {currentPrices && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#222',
          color: 'white',
          padding: '1rem 0 1rem 0',
          textAlign: 'center',
        }}>
          <h2>📈 Precios actuales</h2>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {Object.entries(currentPrices).map(([symbol, price]) => (
              <li key={symbol}>{symbol}: ${price.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default OperatePortfolio;