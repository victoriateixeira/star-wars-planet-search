import React, { useEffect, useContext } from 'react';
import Table from '../components/Table';
import AppContext from '../context/AppContext';

function Home() {
  const { fetchPlanets, planets, isLoading } = useContext(AppContext);

  useEffect(() => {
    fetchPlanets();
  }, []);

  if (isLoading) return <h1>Carregando...</h1>;
  return (
    <div>
      <Table planets={ planets } />

    </div>
  );
}

export default Home;
