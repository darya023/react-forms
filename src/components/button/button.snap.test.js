import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';
import Button from './button';

let history;
describe(`Tests for Button`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });
  it(`Button should render correctly`, () => {
    const {container} = render(
        <Router history={history}>
          <Button>
            Test
          </Button>
        </Router>
    );
    expect(container).toMatchSnapshot();
  });
  it(`Button should render correctly with type submit`, () => {
    const {container} = render(
        <Router history={history}>
          <Button type="submit">
            Test
          </Button>
        </Router>
    );
    expect(container).toMatchSnapshot();
  });
  it(`Button should render correctly if disabled`, () => {
    const {container} = render(
        <Router history={history}>
          <Button disabled={true}>
            Test
          </Button>
        </Router>
    );
    expect(container).toMatchSnapshot();
  });
});
