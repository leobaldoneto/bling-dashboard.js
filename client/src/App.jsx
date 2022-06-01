import { useState, useEffect } from 'react';
import './App.css';

import { css } from '@emotion/react';

import { Dashboard } from './components/dashboard';

function App() {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dayData, setDayData] = useState(null);
  const [monthData, setMonthData] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/salesreport")
      .then((res) => res.json())
      .then((data) => setStore(data))
      .then(() => setLoading(false));
  }, []);

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;