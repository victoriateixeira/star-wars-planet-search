import React from 'react';
import { render, screen} from '@testing-library/react';
import App from '../App';
import AppProvider from '../context/AppProvider';
import userEvent from '@testing-library/user-event';
import planetsData from './services/planetsData';
// import Filters from '../components/Filters';
// import Table from '../components/Table';
import testData from '../../cypress/mocks/testData';

describe('testes da aplicação StarWars Search', () => {

  beforeEach(() => global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(planetsData)
  }));


  test('tests if all filters and inputs are rendered in the page', async () => {
 render(
 <AppProvider>
 <App/>
 </AppProvider>);
  // await waitFor(() => expect(screen.getByText('Carregando...')).not.toBeInTheDocument());

  const nameInputField =  screen.getByTestId("name-filter");
  const columnInputField =  screen.getByTestId("column-filter");
  const operatorInputField =  screen.getByTestId("comparison-filter");
  const numberInputField =  screen.getByTestId("value-filter");
  const sortInputField =  screen.getByTestId("column-sort");
  const ascInputField =  screen.getByTestId("column-sort-input-asc");
  const descInputField =  screen.getByTestId("column-sort-input-desc");
  const filterButton =  screen.getByTestId("button-filter");
  const sortButton =  screen.getByTestId("column-sort-button");
  const removeAllButton =  screen.getByTestId("button-remove-filters");

  expect(nameInputField).toBeInTheDocument();
  expect(columnInputField).toBeInTheDocument();
  expect(operatorInputField).toBeInTheDocument();
  expect(numberInputField).toBeInTheDocument();
  expect(sortInputField).toBeInTheDocument();
  expect(ascInputField).toBeInTheDocument();
  expect(descInputField).toBeInTheDocument();
  expect(filterButton).toBeInTheDocument();
  expect(sortButton).toBeInTheDocument();
  expect(removeAllButton).toBeInTheDocument();
});
  test('testa filtrar pelo nome', async () => {
  render(
   <AppProvider>
  <App />
  </AppProvider>);

  const nameInputField = screen.getByTestId("name-filter");
  // const inputValues= {
  //   name:'t',
  //   number: '23',
  // }

userEvent.type(nameInputField, 'oo');
const tatooine = await screen.findByText('Tatooine');
const naboo = await screen.findByText('Naboo');

// const hoth = await screen.findByText('Hoth');
// const coruscant = await screen.findByText('Coruscant');

const planetsFiltByName = await screen.findAllByTestId("planet-name");

expect(tatooine).toBeInTheDocument();
expect(naboo).toBeInTheDocument();
// expect(hoth).toBeInTheDocument();
// expect(coruscant).toBeInTheDocument();
expect(planetsFiltByName).toHaveLength(2);

userEvent.clear(nameInputField);
});

test('testa filtrar por maior que"', async () => {
  render(
   <AppProvider>
  <App />
  </AppProvider>);

  // const nameInputField = screen.getByTestId("name-filter");
  const columnSelect = screen.getByTestId('column-filter');
  const numberSelect = screen.getByTestId('value-filter');
  const comparisonSelect = screen.getByTestId('comparison-filter'); 
  const filterButton =  screen.getByTestId("button-filter");


userEvent.selectOptions(columnSelect, 'rotation_period');
userEvent.selectOptions(comparisonSelect, 'maior que');
userEvent.clear(numberSelect);
userEvent.type(numberSelect, '26');
userEvent.click(filterButton);

const kamino = screen.findByText('Kamino');
// const planetsFiltered = screen.getAllByTestId('planet-name');

expect(kamino).toBeInTheDocument();
// expect(planetsFiltered).toHaveLength(1);

});
});