import React, { useEffect, useState } from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

import coronaImage from './images/image.png';

function App() {
  const [data, setData] = useState({});
  const [country, setCountry] = useState('');
  useEffect(() => {
    async function fetch() {
      const { confirmed, recovered, deaths, lastUpdate } = await fetchData();

      setData({ confirmed, recovered, deaths, lastUpdate });
    }

    fetch();
  }, []);

  const handleCountryChange = async (countryName) => {
    const fetchedData = await fetchData(countryName);

    setData(fetchedData);
    setCountry(countryName);
  };

  return (
    <div className={styles.container}>
      <img className={styles.image} src={coronaImage} alt='Covid-19 Logo' />
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={data} country={country} />
    </div>
  );
}

export default App;
