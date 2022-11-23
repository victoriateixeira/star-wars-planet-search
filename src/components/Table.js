import { useState } from 'react';
import PropTypes from 'prop-types';

function Table({ planets }) {
  const [searchName, setSearchName] = useState('');

  const filteredByName = planets.filter(
    (planet) => planet.name.toLowerCase().includes(searchName),
  );

  return (
    <div>
      <form>
        <label htmlFor="filter">
          <input
            type="text"
            name="filter"
            placeholder="search"
            data-testid="name-filter"
            onChange={ (e) => setSearchName(e.target.value) }
          />
        </label>
      </form>

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
            filteredByName.map((planet) => (
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
