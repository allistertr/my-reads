import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <div>
            <p>
              Hello word
              </p>
            <Link
              to="/search"
            >Search</Link>
            <Button variant="contained" color="primary" href="/search">
              Test
            </Button>
          </div>
        )} />
        <Route path="/search" render={({ history }) => (
          <div>
            <p>
              Search
            </p>
            <Link
              to="/"
            >Home</Link>
          </div>
        )} />
      </div>
    );
  }
}

export default App;
