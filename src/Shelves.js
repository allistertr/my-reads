import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Book from './Book';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    flexGrow: 1,
  }
});

function Shelves(props) {
  const { classes, books, translate } = props;
  let shelves = [
    {
      name: 'currentlyReading',
      label: translate.CURRENTLY_READING
    },
    {
      name: 'read',
      label: translate.READ
    },
    {
      name: 'wantToRead',
      label: translate.WANT_TO_READ
    }
  ];

  shelves.forEach(shelf => {
    shelf.books = books.filter(book => book.shelf === shelf.name);
  });

  return (
    <div className={classes.root}>
      {shelves.map(shelf => (
        <div key={shelf.name}>
          <p>{shelf.label}</p>
          <Grid container spacing={24}>
              {shelf.books.map(book => (
                <Grid item key={book.title}>
                  <Book book={book} />
                </Grid>
              ))}
          </Grid>
        </div>
      ))}
    </div>
  );
}

Shelves.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Shelves);