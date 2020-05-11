import axios from 'axios';

const url = 'https://covid19.mathdro.id/api/';

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    return {
      confirmed,
      recovered,

      deaths,
      lastUpdate,
    };
  } catch (e) {
    console.log(e);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}daily`);

    return data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
  } catch (e) {
    console.log(e);
  }
};

export const countries = async () => {
  try {
    const {
      data: { countries: countriesRecord },
    } = await axios.get(`${url}countries`);

    return countriesRecord.map((country) => country.name);
  } catch (e) {
    console.log(e);
  }
};
