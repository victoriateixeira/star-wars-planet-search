import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Table from './Table';

function Filters({ planets }) {
  const columns = ['population',
    'rotation_period',
    'orbital_period',
    'diameter',
    'surface_water'];

  const [filteredPlanets, setFilteredPlanets] = useState([...planets]);
  const [filteredByName, setFilteredByName] = useState([...planets]);
  const [searchName, setSearchName] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [numberInput, setNumberInput] = useState(0);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [availableColumns, setAvailableColumns] = useState([...columns]);
  // const [availableSortColumns, setAvailableSortColumns] = useState([...columns]);
  const [selectedSortColumn, setSelectedSortColumn] = useState('population');
  const [selectedSortType, setSelectedSortType] = useState('');
  // const [selectedSort, setSelectedSort] = useState([]);
  useEffect(() => {
    const filteredName = planets.filter(
      (planet) => planet.name.toLowerCase().includes(searchName),
    );
    setFilteredPlanets(filteredName);
    setFilteredByName(filteredName);
  }, [appliedFilters, searchName]);

  const handlesFilterClick = (filter) => {
    // handleAddAppliedFilters();
    console.log(filter);
    switch (filter.operator) {
    case 'maior que':
      setFilteredPlanets(filteredPlanets
        .filter((p) => Number(p[filter.selectedColumn]) > Number(filter.numberInput)));
      break;
    case 'menor que':
      setFilteredPlanets(filteredPlanets
        .filter((p) => Number(p[filter.selectedColumn]) < Number(filter.numberInput)));
      break;
    default:
      setFilteredPlanets(filteredPlanets
        .filter((p) => Number(p[filter.selectedColumn]) === Number(filter.numberInput)));
      break;
    }
  };

  useEffect(() => {
    if (appliedFilters.length > 0) {
      console.log(filteredPlanets);
      appliedFilters.forEach((filter) => handlesFilterClick(filter));
    }
    setSelectedColumn(availableColumns[0]);
    setOperator('maior que');
    setNumberInput(0);
  }, [appliedFilters, filteredByName]);

  const handleAddAppliedFilters = () => {
    const filter = {
      selectedColumn,
      operator,
      numberInput,
    };
    setAppliedFilters([...appliedFilters, filter]);
    setAvailableColumns(availableColumns
      .filter((column) => column !== filter.selectedColumn));
  };

  const handleRemoveAppliedFilter = (e) => {
    setFilteredPlanets(filteredByName);
    const updateFilters = appliedFilters
      .filter((filter) => filter.selectedColumn !== e.target.id);

    console.log(updateFilters);
    setAppliedFilters(updateFilters);
    setAvailableColumns([...availableColumns, e.target.id]);
  };

  const handleRemoveAllFilters = () => {
    setAppliedFilters([]);
    setSearchName('');
    setAvailableColumns([...columns]);
  };

  const handleSort = () => {
    if (selectedSortType === 'ASC') {
      setFilteredPlanets(filteredPlanets
        .sort((a, b) => Number(a[selectedSortColumn]) - Number(b[selectedSortColumn])));
    } else if (selectedSortType === 'DESC') {
      setFilteredPlanets(filteredPlanets
        .sort((a, b) => Number(b[selectedSortColumn]) - Number(a[selectedSortColumn])));
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="filter">
          <input
            type="text"
            id="filter"
            name="filter"
            value={ searchName }
            placeholder="pesquise por nome"
            data-testid="name-filter"
            onChange={ (e) => setSearchName(e.target.value) }
          />
        </label>
        {availableColumns.length > 0
        && (
          <div>
            <select
              name="columns"
              data-testid="column-filter"
              id="columns"
              value={ selectedColumn }
              onChange={ (e) => e.target.value !== ''
          && setSelectedColumn(e.target.value) }
            >
              {/* <option value="">All</option> */}
              {
                availableColumns
                  .map((column, i) => (
                    (<option key={ i } value={ column }>{column}</option>)))
              }

            </select>
            <select
              name="operator"
              data-testid="comparison-filter"
              id="operator"
              onChange={ (e) => setOperator(e.target.value) }
            >
              <option value="maior que">maior que</option>
              <option value="menor que">menor que</option>
              <option value="igual a">igual a</option>

            </select>
            <label htmlFor="numberInput">
              <input
                type="number"
                id="numberInput"
                data-testid="value-filter"
                name="numberInput"
                value={ numberInput }
                // placeholder="search"
                // data-testid="name-filter"
                onChange={ (e) => setNumberInput(e.target.value) }
              />
            </label>
            <button
              type="button"
              data-testid="button-filter"
              onClick={ handleAddAppliedFilters }
            >
              Filtrar
            </button>
            <select
              name="sort"
              data-testid="column-sort"
              id="sort"
              onChange={ (e) => setSelectedSortColumn(e.target.value) }
            >
              {/* <option value="">All</option> */}
              {
                columns
                  .map((sortColumn, index) => (
                    <option key={ index } value={ sortColumn }>{sortColumn}</option>
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
                data-testid="column-sort-input-asc"
                onClick={ (e) => setSelectedSortType(e.target.value) }
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
                onClick={ (e) => setSelectedSortType(e.target.value) }
              />
            </label>
            <button
              type="button"
              data-testid="column-sort-button"
              onClick={ handleSort }
            >
              Ordenar
            </button>
            <button
              type="button"
              data-testid="button-remove-filters"
              onClick={ handleRemoveAllFilters }
            >
              Remover filtros
            </button>

          </div>
        )}
      </form>
      <ul>
        {appliedFilters.map((filter, index) => (
          <li key={ index } data-testid="filter">
            <p>
              {filter.selectedColumn}
              {' '}
              {filter.operator}
              {' '}
              {filter.numberInput}
            </p>
            <button
              type="button"
              onClick={ handleRemoveAppliedFilter }
              id={ filter.selectedColumn }
            >
              Limpar
            </button>

          </li>))}
      </ul>

      <Table filteredPlanets={ filteredPlanets } planets={ planets } />
    </div>
  );
}

Filters.propTypes = {
  planets: PropTypes.arrayOf.isRequired,
};
export default Filters;
