import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import { NavLink } from 'react-router-dom';
import * as React from 'react';

export const publicNavs = [
    {
        url: '/exchanges',
        name: 'Markets',
        icon: <StarIcon />
    }
];

class PublicNav extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            publicNavs.map((navItem) => {
                return <NavLink
                    to={navItem.url}
                    className="NavLinkItem"
                    key={navItem.url}
                    activeClassName="NavLinkItem-selected"
                    style={{ textDecoration: 'none', color: 'white' }}>
                    <List component="nav">
                        <ListItem button>
                            <ListItemIcon className="innernavitem">
                                {navItem.icon}
                            </ListItemIcon>
                            <ListItemText primary={navItem.name} className="innernavitem" color="black" />
                        </ListItem>
                    </List>
                </NavLink>
            }
            )
        )
    }
}

export default PublicNav;