import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import languages from './languages.json';
import * as BooksAPI from './BooksAPI'
import { prototype } from 'react-transition-group/TransitionGroup';

import Shelves from './Shelves';

class App extends Component {

  constructor() {
    super();
    this.state = {
      translate: languages['en'],
      books: [
        {
          name: 'Test None',
          shelf: 'none'
        },
        {
          name: 'Test currentlyReading',
          shelf: 'currentlyReading'
        },
        {
          name: 'Test read',
          shelf: 'read'
        },
        {
          name: 'Test wantToRead',
          shelf: 'wantToRead'
        }
      ]
    };

    this.languagesLabels = Object.keys(languages).map(prototype => ({ key: prototype, label: languages[prototype].LANGUAGE_LABEL }));
    console.log(this.languagesLabels)
    BooksAPI.getAll()
      .then(books => console.log(books))
    console.log(BooksAPI)
  }

  changeLanguage = language => {
    this.setState({ translate: languages[language] });
  };

  render() {
    let { translate, books } = this.state;
    return (
      <div>
        <Grid
          container
          // spacing={16}
          // alignItems={alignItems}
          direction='column'
        // justify={justify}
        >
          <Shelves books={books} translate={translate} />
          <TextField
            id="select-currency"
            select
            value={this.state.translate.LANGUAGE_KEY}
            onChange={(event) => this.changeLanguage(event.target.value)}
            margin="normal"
          >
            {this.languagesLabels.map(option => (
              <MenuItem key={option.key} value={option.key}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <input
            accept=".json"
            style={{
              display: 'none',
            }}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button color="primary" variant="contained" component="span" >
              Upload
            </Button>
          </label>
        </Grid>
        <Route exact path="/" render={({ history }) => (
          <div>
            <p>
              {translate.HELLO_WORLD}
            </p>
            <Link
              to="/search"
            >Search</Link>
            <Button variant="contained" color="primary" onClick={() => history.push('/search')}>
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
