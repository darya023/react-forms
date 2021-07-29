import React from 'react';
import {render, screen} from '@testing-library/react';
import {Route, Router, Switch} from 'react-router';
import {createMemoryHistory} from 'history';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import userEvent from '@testing-library/user-event';

it(`Header's logo should redirect to Mainscreen when user clicks on logo`, () => {
  const history = createMemoryHistory();
  history.push(`/test`);
  render(
      <Router history={history}>
        <Switch>
          <Route exact path={`/`}><div>Mock Main Screen</div></Route>
          <Route component={NotFoundScreen} />
        </Switch>
      </Router>
  );

  userEvent.click(screen.getByRole(`link`, {name: /На главную/i}));
  expect(screen.getByText(/Mock Main Screen/i)).toBeInTheDocument();
});
