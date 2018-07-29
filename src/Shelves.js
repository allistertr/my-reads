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

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({

});

class Shelves extends React.Component {
  state = {
    shelves: [
      {
        name: 'currentlyReading',
        key: 'CURRENTLY_READING',
        expanded: true
      },
      {
        name: 'read',
        key: 'READ',
        expanded: true
      },
      {
        name: 'wantToRead',
        key: 'WANT_TO_READ',
        expanded: true
      }
    ]
  };

  changePanelExpansion = panelKey => {
    this.setState(state => ({
      shelves: state.shelves.map(shelf => {
        if (shelf.key === panelKey) shelf.expanded = !shelf.expanded;
        return shelf;
      })
    }));
  };

  render() {
    const { shelves } = this.state;
    const { classes, books, translate } = this.props;

    shelves.forEach(shelf => {
      shelf.books = books.filter(book => book.shelf === shelf.name);
    });

    return (
      <div>
        {shelves.map(shelf => (
          <ExpansionPanel key={shelf.name} expanded={shelf.expanded} onChange={() => { this.changePanelExpansion(shelf.key) }}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="title" gutterBottom>
                {translate[shelf.key]}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container >
                {shelf.books.map(book => (
                  <Grid item key={book.id} style={{ margin: '10px auto' }}>
                    <Book book={book} />
                  </Grid>
                ))}
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  }

}

Shelves.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Shelves);