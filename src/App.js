import React, { useEffect, useState } from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    async function fetch() {
      const { confirmed, recovered, deaths, lastUpdate } = await fetchData();

      setData({ confirmed, recovered, deaths, lastUpdate });
    }

    fetch();
  }, []);

  return (
    <div className={styles.container}>
      <Cards data={data} />
      <Chart />
      <CountryPicker />
    </div>
  );
}

export default App;
