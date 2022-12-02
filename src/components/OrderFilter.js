import PropTypes from 'prop-types';
import { useState } from 'react';

function OrderFilter(props) {
  const { columns, filteredPlanets, setFilteredPlanets } = props;
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });

  const handleOrderChange = ({ target: { value, name } }) => {
    setOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };
  const handleSort = () => {
    if (order.sort === 'ASC') {
      const sortedValidPlanets = filteredPlanets
        .filter((planet) => planet[order.column] !== 'unknown')
        .sort((a, b) => Number(a[order.column]) - Number(b[order.column]));
      const unvalidPlanets = filteredPlanets
        .filter((planet) => planet[order.column] === 'unknown');
      const allOrderedPlanets = [...sortedValidPlanets, ...unvalidPlanets];
      // return sortedPlanets;
      console.log(allOrderedPlanets);
      setFilteredPlanets([...allOrderedPlanets]);
    } if (order.sort === 'DESC') {
      const sortedValidPlanets = filteredPlanets
        .filter((planet) => planet[order.column] !== 'unknown')
        .sort((a, b) => Number(b[order.column]) - Number(a[order.column]));
      const unvalidPlanets = filteredPlanets
        .filter((planet) => planet[order.column] === 'unknown');
      const allOrderedPlanets = [...sortedValidPlanets, ...unvalidPlanets];
      // return sortedPlanets;
      console.log(allOrderedPlanets);
      setFilteredPlanets([...allOrderedPlanets]);
    }
  };

  return (
    <div>
      <select
        name="column"
        data-testid="column-sort"
        onChange={ handleOrderChange }
      >
        {/* <option value="">All</option> */}
        {
          columns
            .map((sortColumn, index) => (
              <option
                key={ index }
                value={ sortColumn }
                name="column"

              >
                {sortColumn}

              </option>
            ))
        }

      </select>
      <label htmlFor="asc">
        {' '}
        Ascendente
        <input
          type="radio"
          id="asc"
          name="sort"
          value="ASC"
          // checked='true'
          data-testid="column-sort-input-asc"
          onClick={ handleOrderChange }
        />

      </label>
      <label htmlFor="desc">
        {' '}
        Descendente
        <input
          type="radio"
          id="desc"
          name="sort"
          value="DESC"
          data-testid="column-sort-input-desc"
          onClick={ handleOrderChange }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleSort }
      >
        Ordenar
      </button>
    </div>
  );
}

OrderFilter.propTypes = {
  columns: PropTypes.arrayOf.isRequired,
  filteredPlanets: PropTypes.arrayOf.isRequired,
  setFilteredPlanets: PropTypes.func.isRequired,

};
export default OrderFilter;
