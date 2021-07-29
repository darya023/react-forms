import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';
import Header from './header';

it(`Header should render correctly`, () => {
  const history = createMemoryHistory();
  const {container} = render(
      <Router history={history}>
        <Header />
      </Router>
  );
  expect(container).toMatchSnapshot();
});
