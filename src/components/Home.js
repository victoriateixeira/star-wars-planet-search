import React, { useEffect, useContext } from 'react';
// import Table from './Table';
import Filters from './Filters';
import AppContext from '../context/AppContext';

function Home() {
  const { fetchPlanets, planets, isLoading } = useContext(AppContext);

  useEffect(() => {
    fetchPlanets();
  }, []);

  if (isLoading) return <h1>Carregando...</h1>;
  return (
    <div>
      <Filters planets={ planets } />
      {/* <Table planets={ planets } /> */}

    </div>
  );
}

export default Home;
