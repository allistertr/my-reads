import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link, history } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import languages from './languages.json';
import Drawer from '@material-ui/core/Drawer';

import fileDownload from 'js-file-download';



const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    drawerOpen: false
  };

  toggleDrawer = open => () => {
    this.setState({
      drawerOpen: open,
    });
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, translate, changeLanguage } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const languagesLabels = Object.keys(languages).map(prototype => ({ key: prototype, label: languages[prototype].LANGUAGE_LABEL }));

    return (
      <div className={classes.root}>
        <div>
          <br />
          <br />
          <br />
        </div>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton onClick={this.toggleDrawer(true)} className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                {translate.MY_READS}
              </Link>
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
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
                  <MenuItem onClick={this.handleClose}>{translate.PROFILE}</MenuItem>
                  <MenuItem onClick={() => { fileDownload(JSON.stringify([{ oi: 'tchau' }]), 'download.json'); }}>{'Download'}</MenuItem>
                  <TextField
                    style={{ paddingLeft: 16, paddingRight: 16 }}
                    id="select-currency"
                    select
                    value={translate.LANGUAGE_KEY}
                    onChange={(event) => changeLanguage(event.target.value)}
                    margin="normal"
                  >
                    {languagesLabels.map(option => (
                      <MenuItem key={option.key} value={option.key}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <MenuItem onClick={this.handleClose}>
                    Test
                  </MenuItem>
                </Menu>
                <Drawer open={this.state.drawerOpen} onClose={this.toggleDrawer(false)}>
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer(false)}
                    onKeyDown={this.toggleDrawer(false)}
                  >
                    {/* {sideList} */}
                    <MenuItem onClick={this.handleClose}>{translate.PROFILE}</MenuItem>
                  <MenuItem onClick={() => { fileDownload(JSON.stringify([{ oi: 'tchau' }]), 'download.json'); }}>{'Download'}</MenuItem>
                  <TextField
                    style={{ paddingLeft: 16, paddingRight: 16 }}
                    id="select-currency"
                    select
                    value={translate.LANGUAGE_KEY}
                    onChange={(event) => changeLanguage(event.target.value)}
                    margin="normal"
                  >
                    {languagesLabels.map(option => (
                      <MenuItem key={option.key} value={option.key}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <MenuItem onClick={this.handleClose}>
                    Test
                  </MenuItem>
                  </div>
                </Drawer>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);