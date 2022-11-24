import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { listenerCount } from 'process';

function Table({ planets }) {
  const columns = ['Population',
    'Rotation period',
    'Orbital period',
    'Diameter',
    'Surface water'];
   
  const [filteredPlanets, setFilteredPlanets] = useState([...planets]);
  const [searchName, setSearchName] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('Population');
  const [operator, setOperator] = useState('maior que');
  const [numberInput, setNumberInput] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [availableColumns, setAvailableColumns] = useState([...columns]);

  useEffect(() => {
    const filteredByName = planets.filter(
      (planet) => planet.name.toLowerCase().includes(searchName),
    );
    setFilteredPlanets(filteredByName)
  }, [searchName])

// useEffect (() => {
//     setAvailableColumns([]);
//     columns.forEach((column) => {
//       const isAvailable =  appliedFilters.some((filter) => filter[selectedColumn] === column);
//       if (!isAvailable) {
//        setAvailableColumns([...availableColumns, column]);
//      }
//     })
  
// }, [appliedFilters])
useEffect (() => {
    columns.filter((column) => {
    appliedFilters.forEach((filter) => filter[selectedColumn] !== column);
     })
} , [appliedFilters])

  
const handleAddAppliedFilters = () => {
const filter = {
  selectedColumn, 
   operator, 
   numberInput,
  };
setAppliedFilters([...appliedFilters, filter])
  }
  const handleRemoveAppliedFilter = (e) => {
appliedFilters.filter((filter, index) => index !== e.target.id);
  }

  const handlesFilterClick = () => {
    handleAddAppliedFilters();
    switch (operator) {
      case 'maior que':
        setFilteredPlanets(filteredPlanets.filter((planet) => planet[selectedColumn] > numberInput));
    break;
      case 'menor que':
        setFilteredPlanets(filteredPlanets.filter((planet) => planet[selectedColumn] < numberInput));
    break;
     default:
        setFilteredPlanets(filteredPlanets.filter((planet) => planet[selectedColumn] === numberInput))
        break;
    }
  }
 

  return (
    <div>
      <form>
        <label htmlFor="filter">
          <input
            type="text"
            id="filter"
            name="filter"
            placeholder="search"
            data-testid="name-filter"
            onChange={ (e) => setSearchName(e.target.value) }
          />
        </label>
        <select
          name="columns"
          id="columns"
          onChange={ (e) => e.target.value !== ''
          && setSelectedColumn(e.target.value) }
        >
          <option value="">All</option>
          {
            availableColumns.map((column, index) => <option key ={index} value = {column}>{column}</option>)
          }

        </select>
        <select
          name="operator"
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
            name="numberInput"
            // placeholder="search"
            // data-testid="name-filter"
            onChange={ (e) => setNumberInput(e.target.value) }
          />
        </label>
        <button type = "button" onClick={handlesFilterClick}>Filtrar</button>
      </form>
      <ul>{appliedFilters.map((filter, index) => {
  
      <li key = {index} id={index}> 
      <p>{filter.selectedColumn} {filter.operator} {filter.numberInput}</p>
      <button type="button" onClick={handleRemoveAppliedFilter} >Limpar</button>
      
      
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
