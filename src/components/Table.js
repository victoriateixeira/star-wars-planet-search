import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Table({ planets }) {
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
  const [availableSortColumns, setAvailableSortColumns] = useState([...columns]);
  const [selectedSortColumn, setSelectedSortColumn] = useState('population');
  const [selectedSortType, setSelectedSortType] = useState('')
  const [selectedSort, setSelectedSort] = useState([]);
  useEffect(() => {
    const filteredByName = planets.filter(
      (planet) => planet.name.toLowerCase().includes(searchName),
    );
    setFilteredPlanets(filteredByName);
    setFilteredByName(filteredByName);
    
  }, [appliedFilters, searchName]);

  useEffect(() => {
    if(appliedFilters.length > 0) {
      console.log(filteredPlanets);
      appliedFilters.forEach((filter) => handlesFilterClick(filter));
    } 
    setSelectedColumn(availableColumns[0]);
    setOperator('maior que');
    setNumberInput(0);
  }, [appliedFilters, filteredByName]);


// useEffect (() => {
//     setAvailableColumns([]);
//     columns.forEach((column) => {
//       const isAvailable =  appliedFilters.some((filter) => filter[selectedColumn] === column);
//       if (!isAvailable) {
//        setAvailableColumns([...availableColumns, column]);
//      }
//     })
  
// }, [appliedFilters])
// useEffect (() => {
//     const available = availableColumns.filter((column) => {
//      return appliedFilters.forEach((filter) => filter[selectedColumn] !== column);
//      });
// setAvailableColumns(available);
// } , [appliedFilters, availableColumns]);

// const handlesAvailableColumns = () => {
//   const available = columns.filter((column) => appliedFilters.some((filter) => filter[selectedColumn] === column));
//   console.log(appliedFilters);
//   console.log(available);
// setAvailableColumns(available);
// };
// const handlesFilters = () => {
//   console.log('executou');
//   console.log(appliedFilters);
//   appliedFilters.forEach((filter) => handlesFilterClick(filter));    
// }
const handleAddAppliedFilters = () => {
const filter = {
  selectedColumn, 
   operator, 
   numberInput,
  };
setAppliedFilters([...appliedFilters, filter]);
setAvailableColumns(availableColumns.filter((column) => column !== filter.selectedColumn));
  };

  const handleRemoveAppliedFilter = (e) => {
    setFilteredPlanets(filteredByName);
const updateFilters = appliedFilters.filter((filter) => filter.selectedColumn !== e.target.id);

console.log(updateFilters);
setAppliedFilters(updateFilters);
setAvailableColumns([...availableColumns, e.target.id]);

  };

  const handleRemoveAllFilters = () => {
    setAppliedFilters([]);
    setSearchName('');
    setAvailableColumns([...columns])
  }

  const handleSort = () => {
    if(selectedSortType === 'ASC'){
      setFilteredPlanets(filteredPlanets.sort((a,b) => Number(a[selectedSortColumn]) - Number(b[selectedSortColumn])));
    } else if (selectedSortType === 'DESC') {
      setFilteredPlanets(filteredPlanets.sort((a,b) => Number(b[selectedSortColumn]) - Number(a[selectedSortColumn])));
    }
  }

  const handlesFilterClick = (filter) => {
    // handleAddAppliedFilters();
    console.log(filter);
    switch (filter.operator) {
      case 'maior que':
        setFilteredPlanets(filteredPlanets.filter((planet) => Number(planet[filter.selectedColumn]) > Number(filter.numberInput)));
    break;
      case 'menor que':
        setFilteredPlanets(filteredPlanets.filter((planet) => Number(planet[filter.selectedColumn]) < Number(filter.numberInput)));
    break;
     default:
        setFilteredPlanets(filteredPlanets.filter((planet) => Number(planet[filter.selectedColumn]) === Number(filter.numberInput)))
        break;
    }
    // handlesAvailableColumns();
    
  // setNumberInput('');
  };
 

  return (
    <div>
      <form>
        <label htmlFor="filter">
          <input
            type="text"
            id="filter"
            name="filter"
            value={searchName}
            placeholder="pesquise por nome"
            data-testid="name-filter"
            onChange={ (e) => setSearchName(e.target.value) }
          />
        </label>
        {availableColumns.length > 0 &&
        <div>
        <select
          name="columns"
          data-testid='column-filter'
          id="columns"
          value={selectedColumn}
          onChange={ (e) => e.target.value !== ''
          && setSelectedColumn(e.target.value) }
        >
          {/* <option value="">All</option> */}
          {
            availableColumns.map((column, index) => <option key ={index} value = {column}>{column}</option>)
          }

        </select>
        <select
          name="operator"
          data-testid='comparison-filter'
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
            data-testid='value-filter'
            name="numberInput"
            value={numberInput}
            // placeholder="search"
            // data-testid="name-filter"
            onChange={ (e) => setNumberInput(e.target.value) }
          />
        </label>
        <button type = "button" data-testid='button-filter' onClick={handleAddAppliedFilters}>Filtrar</button>
        <select
          name="sort"
          data-testid='column-sort'
          id="sort"
          onChange={(e) => setSelectedSortColumn(e.target.value)}
        >
          {/* <option value="">All</option> */}
        {
            availableSortColumns.map((sortColumn, index) => <option key ={index} value = {sortColumn}>{sortColumn}</option>)
          }

        </select>
        <label htmlFor="asc"> Ascendente
        <input 
        type="radio" 
        id="asc" 
        name="sort" 
        value="ASC" 
        data-testid='column-sort-input-asc'
        onClick={(e) => setSelectedSortType(e.target.value)}
        />
        
        </label>
        <label htmlFor="desc"> Descendente
        <input 
        type="radio" 
        id="desc" 
        name="sort" 
        value="DESC" 
        data-testid='column-sort-input-desc'
        onClick={(e) => setSelectedSortType(e.target.value)}
        />
        </label>
        <button type = "button"  data-testid='column-sort-button' onClick={handleSort} >Ordenar</button>
        <button type = "button"  data-testid='button-remove-filters' onClick={handleRemoveAllFilters}>Remover filtros</button>
        </div>
}
      </form>
      <ul>{appliedFilters.map((filter, index) => {
  
      return <li key = {index} data-testid='filter'> 
      <p>{filter.selectedColumn} {filter.operator} {filter.numberInput}</p>
      <button type="button" onClick={handleRemoveAppliedFilter} id={filter.selectedColumn} >Limpar</button>
      
      
      </li>

    })
    }
      </ul>

      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Rotation Period
            </th>
            <th>
              Orbital Period
            </th>
            <th>
              Diameter
            </th>
            <th>
              Climate
            </th>
            <th>
              Gravity
            </th>
            <th>
              Terrain
            </th>
            <th>
              Surface Water
            </th>
            <th>
              Population
            </th>
            <th>
              Films
            </th>
            <th>
              Created
            </th>
            <th>
              Edited
            </th>
            <th>
              URL
            </th>
          </tr>
        </thead>
        <tbody>
          {
            filteredPlanets.map((planet) => (
              // const { name, diameter, climate, gravity, terrain, population, films, created, edited, url } = planet;
              <tr key={ planet.name }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>

              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  planets: PropTypes.arrayOf.isRequired,
};
export default Table;
