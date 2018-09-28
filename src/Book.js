import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
  card: {
    maxWidth: 240,
  },

});

class Book extends React.Component {
  state = {
    anchorEl: null
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, book, shelves, translate } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            component="img"
            className={classes.media}
            // height="340"
            width="240"
            image={book.imageUrl || translate.NO_IMAGE_URL}
            title="Contemplative Reptile"
          />
          <CardHeader
            action={
                <IconButton
                  aria-owns={open ? 'book-options' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                >
                  <MoreVertIcon />
                </IconButton>
            }
            title={book.title}
            subheader={book.authors && book.authors.length ? book.authors.join(', ') : ''}
          />
        </Card>
        <Menu
          id="book-options"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>{translate.VIEW}</MenuItem>
          <div style={{ paddingLeft: 16, paddingRight: 16, outline: "none" }}>
            <TextField
              id="select-currency"
              label={translate.SHELF}
              select
              value={book.shelf}
              style={{ minWidth: 160 }}
              // onChange={(event) => changeLanguage(event.target.value)}
              margin="normal"
            >
              {shelves.map(shelfName => (
                <MenuItem key={shelfName} value={shelfName}>
                  {translate[shelfName]}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Menu>
      </div>
    );
  }
}

Book.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Book);