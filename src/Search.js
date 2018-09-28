import React from 'react';
import PropTypes from 'prop-types';
import DebounceControl from './DebounceControl';
import TextField from '@material-ui/core/TextField';

class Search extends React.Component {
  constructor() {
    super();
    this.debounceSearchText = new DebounceControl(this.onChangeSearchText, 2000);
  }

  onChangeSearchText = value => {
    this.setState({
      searchText: value
    })
  }

  state = {
    searchText: ''
  };

  render() {
    return (
      <div>
        <TextField
          id="name"
          label="Name"
          // className={classes.textField}
          value={this.state.name}
          onChange={event => this.debounceSearchText.onChange(event.target.value)}
          margin="normal"
        />

        <p>Value: {this.state.value}</p>
        <p>searchText: {this.state.searchText}</p>
      </div>
    );
  }
}

Search.propTypes = {
  // TODO: Implement or remove this
  // classes: PropTypes.object.isRequired,
};

export default Search;