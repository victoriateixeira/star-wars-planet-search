import PropTypes from 'prop-types';

function OrderFilter(props) {
  const { columns, handleSort, handleOrderChange } = props;
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
  handleOrderChange: PropTypes.func.isRequired,
  handleSort: PropTypes.func.isRequired,

};
export default OrderFilter;
