import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PublicNav from './PublicNav';
import * as React from 'react';

interface HeaderProps {

}

class Header extends React.Component<HeaderProps> {
  state = {
    value: 1,
    open: false
  };

  constructor(props: HeaderProps) {
    super(props);
  }

  handleChange = (event: any, index: number, value: number) => this.setState({ value });
  
  onLeftIconButtonClick = (event: any, index: number, value: number) => {
    console.log('hi;');
    this.setState({
      open: !this.state.open
    });

  };

  toggleDrawer = (open: boolean) => () => {
    this.setState({ open: open });
  };

  handleClick = () => {
    
  };

  handleClose = (event: any) => {
    if (this.target1.contains(event.target) || this.target2.contains(event.target)) {
      return;
    }
  };

  render() {
    return (
      <div>
        <Drawer open={this.state.open} onClose={this.toggleDrawer(false)}>
          <div tabIndex={0} role="button">
            <div className="sidelistwrapper">
              <React.Fragment>
                <PublicNav />
              </React.Fragment>
            </div>
          </div>
        </Drawer>
        <div className="appbarwrapper">
          <AppBar position="static">
            <Toolbar>
              <IconButton
                className="iconbuttonsyle"
                color="inherit"
                aria-label="Menu"
                onClick={this.onLeftIconButtonClick}>
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className="headertypoclass">
                Multi Exchange Crypto
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      </div>
    );
  };
}

export default Header;