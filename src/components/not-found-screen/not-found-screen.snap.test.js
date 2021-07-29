import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';
import NotFoundScreen from './not-found-screen';

it(`NotFoundScreen should render correctly`, () => {
  const history = createMemoryHistory();
  const {container} = render(
      <Router history={history}>
        <NotFoundScreen />
      </Router>
  );
  expect(container).toMatchSnapshot();
});
