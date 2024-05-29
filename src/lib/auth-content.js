'use client';
import React, { createContext, useContext, useState } from 'react';

const CounterContext = createContext();

export function CounterProvider({ children }) {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(prevCounter => prevCounter + 1);
  };

  const decrement = () => {
    if(counter > 0){
      setCounter(prevCounter => prevCounter - 1);
    }
  };

  return (
    <CounterContext.Provider
      value={{
        counter,
        increment,
        decrement,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
}

export function useCounter() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
}
