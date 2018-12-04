//#region 
import * as React from 'react';
const classNames = require('classnames');
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Route, withRouter } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import { styles } from './styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppDrawer from './App.Drawer';
import NotificationIcon from '@material-ui/icons/Notifications';
import { Badge, Menu } from '@material-ui/core';
import { connect } from 'react-redux';
//#endregion

interface IAppProps {
  classes: any;
  theme?: any;
}

interface IState {
  anchorEl: any;
  notificationEl: any;
}

class MiniDrawer extends React.Component<IAppProps, IState> {

  public state: IState = {
    anchorEl: null,
    notificationEl: null
  };

  public componentWillMount() {
    
  }

  private handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  private handleMenuClose = (path?: string) => {
    this.setState({ anchorEl: null });
    this.navigate(path);
  };

  private navigate = (path?: string) => {
    if (path) {
      this.props.history.push(path);
    }
  }

  public handleDrawerOpen = () => {
    this.props.openDrawer();
  };

  public handleDrawerClose = () => {
    this.props.closeDrawer();
  };

  private renderAppBar() {
    const { classes, utility } = this.props;
      const { anchorEl, notificationEl } = this.state;
      const open = Boolean(anchorEl);
      const notificationsOpen = Boolean(notificationEl);
      const unreadMessages = this.props.mail.filter(x => x.seen === false);

      return (
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, utility.drawerOpen && classes.appBarShift)}
        >
          <Toolbar disableGutters={!utility.drawerOpen}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, utility.drawerOpen && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.fillSpace} variant="title" color="inherit" noWrap={true}>
              Tomahawk
            </Typography>
            <div>
              <IconButton
                aria-owns={notificationsOpen ? 'notifications' : null}
                aria-haspopup="true"
                color="inherit"
                onClick={this.handleNotificationMenu}
              >
                <Badge badgeContent={unreadMessages.length} color="secondary">
                  <NotificationIcon />
                </Badge>
              </IconButton>
              {this.renderNotifications(unreadMessages)}
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
                onClose={this.handleMenuClose.bind(this, null)}
              >
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      );
  }

  private renderDrawer() {
    const { utility, authentication } = this.props;
    return (
      <Hidden mdDown={!utility.drawerOpen && true}>
        <AppDrawer
          utility={utility}
          authentication={authentication}
          handleDrawerClose={this.handleDrawerClose}
        />
      </Hidden>
    );
  }

  public render() {
    const { classes } = this.props;
    const Dashboard =  
                <div>sdssdsd</div>


    return (
      <div className={classes.root}>
        {this.renderAppBar()}
        {this.renderDrawer()}

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route path='/' exact={true} component={Dashboard} />
          <Route path='/dashboard' component={Dashboard} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  
});


export default withRouter(connect(mapStateToProps)(withStyles(styles as any, { withTheme: true })(MiniDrawer as any)) as any);
