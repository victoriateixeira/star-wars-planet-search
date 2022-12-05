import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
// import planetsData from '../tests/services/planetsData';

function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const fetchPlanets = async () => {
    // try {
    const response = await fetch('https://swapi.dev/api/planets');
    const planetsData = await response.json();
    console.log(planetsData);
    const planetsList = planetsData.results;
    console.log(planetsList);
    planetsList.forEach((planet) => delete (planet.residents));
    console.log(planetsList);
    return planetsList;
    // setPlanets(planetsList);
    // } catch (error) {
    //   console.log(error);
    // }
    // finally {
    //   setIsLoading(false);
    // }
  };

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetchPlanets();
      setPlanets([...response]);
    };
    fetchApi();
  }, []);

  const values = {
    // isLoading,
    fetchPlanets,
    planets,
  };

  return (
    <AppContext.Provider value={ values }>
      {children}
    </AppContext.Provider>
  );
}
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
