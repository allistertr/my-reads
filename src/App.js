import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import languages from './languages.json';
import Profiles from './Profiles';
import Search from './Search';
import * as BooksAPI from './BooksAPI';
import * as BookFactory from './BookFactory';
import * as StorageService from './StorageService';
import { prototype } from 'react-transition-group/TransitionGroup';

import MenuAppBar from './MenuAppBar';

import Shelves from './Shelves';

const DEFAULT_LANGUAGE_KEY = 'en'

class App extends Component {

  constructor() {
    super();
    this.data = StorageService.getData();
    this.state = {
      translate: languages[this.data.profiles[this.data.currentProfile].language],
      // translate: languages[DEFAULT_LANGUAGE_KEY],
      data: StorageService.getData(),
      books: []
    };

    this.languagesLabels = Object.keys(languages).map(prototype => ({ key: prototype, label: languages[prototype].LANGUAGE_LABEL }));
    console.log(this.languagesLabels)
    BooksAPI.search('ios').then(searchedBooks => this.addSearchedBooks(searchedBooks.map(s => {s.shelf = "read"; return s})));
    console.log(BooksAPI)
  }

  changeLanguage = language => {
    let { data, translate } = this.state;
    let profile = data.profiles[data.currentProfile];
    let newLanguage = languages[language] ? language : DEFAULT_LANGUAGE_KEY;

    profile.language = newLanguage;
    data.profiles[data.currentProfile] = profile;

    StorageService.saveData(data);

    this.setState({ data, translate: languages[newLanguage] });
  };

  addSearchedBooks = (searchedBooks, searchText) => {
    let { data, translate } = this.state;
    let profile = data.profiles[data.currentProfile];
    let { books } = profile;

    searchedBooks.forEach(searchedBook => {
      let bookFound = books.find(book => book.id === searchedBook.id);
      if (bookFound) {
        bookFound.show = true;
        searchedBook = bookFound;
      } else {
        searchedBook = BookFactory.create({...searchedBook, show: true});
        books.push(searchedBook);
      }
    });

    // TODO: checks if other previously added books should be displayed in the search
    searchText = 'test';
    books = books.map(book => {
      if (JSON.stringify(book).search(searchText))
        book.show = true;
      return book;
    });

    this.saveData(data);
  }


  changeBook = language => {

  };

  getLanguageByCurrentProfile = data => {
    if (!data)
      return languages[DEFAULT_LANGUAGE_KEY];

    const languageKey = data.profiles[data.currentProfile].language || DEFAULT_LANGUAGE_KEY;
    return languages[languageKey];
  };

  saveData = data => {
    StorageService.saveData(data);
    this.setState({ data, translate: this.getLanguageByCurrentProfile(data) });
  }

  render() {
    let { translate, data } = this.state;
    let profile, books = [];

    if (data) {
      console.log('data', data)
      profile = data.profiles[data.currentProfile];
      books = profile.books;
    }

    return (
      <div>
        <MenuAppBar translate={translate} changeLanguage={this.changeLanguage} />

        <Profiles data={data} translate={translate} open={data ? false : true} />

        <Route exact path="/" render={({ history }) => (
          <div>
            <p>
              {translate.HELLO_WORLD}
            </p>
            <Link
              to="/search"
            >Search</Link>
            <Shelves books={books} translate={translate} />
            <Button variant="contained" color="primary" onClick={() => history.push('/search')}>
              Test
            </Button>
          </div>
        )} />
        <Route path="/search" render={({ history }) => (
          <div>
            <Search />
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
