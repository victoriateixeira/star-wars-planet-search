import { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlanets = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/planets');
      const planetsData = await response.json();
      console.log(planetsData);
      const planetsList = planetsData.results;
      console.log(planetsList);
      planetsList.forEach((planet) => delete (planet.residents));
      console.log(planetsList);
      setPlanets(planetsList);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const values = {
    isLoading,
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
  children: PropTypes.element.isRequired,
};

export default AppProvider;
