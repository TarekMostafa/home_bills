import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, List, Divider, ListItem, ListItemText, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  link: {
    textDecoration:'none'
  }
};

class DrawerComponent extends Component {
  state = {
    left: false,
    items: [
      {id:1, text:'Home Page', link:'/'},
      {id:2, text:''},
      {id:3, text:'Bills', link:'/bills'},
      {id:4, text:'Bills Transactions', link:'/billsTransactions'}
    ]
  };

  toggleDrawer = (open) => () => {
    this.setState({
      left: open
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          {
            this.state.items.map((item, index) => item.text ? (
              <ListItem button key={item.id}>
				          <Link to={item.link} className={classes.link}><ListItemText primary={item.text}/></Link>
			        </ListItem>
              ) : (<Divider key={item.id}/>))
          }
        </List>
      </div>
    );

    return (
      <div>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Drawer open={this.state.left} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

DrawerComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerComponent);
