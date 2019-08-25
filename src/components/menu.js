import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import {useTheme,makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MenuItem from './menuItem';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
          width: drawerWidth,
          flexShrink: 0,
        },
      },
      drawerPaper: {
        width: drawerWidth,
      },
}))


function renderMenu(props){    
  
    return (props.breads?
        <div>             
            <div className={props.classes.toolbar} >
                <Typography variant="h6" noWrap>
                    Filters
                </Typography>
            </div>
            <Divider />            
            <List>
                {Object.keys(props.breads).map((bread)=>{
                    return (
                            <MenuItem 
                                key={bread}
                                bread = {bread}
                                subbreads= {props.breads[bread]}
                            />               
                    )
                })}               
            </List>            
        </div>:'' );
}

function Menu(props){      
    const classes = useStyles();
    const theme = useTheme();   
    return (      
    <nav className={classes.drawer} aria-label="mailbox folders">   
        <Hidden smUp implementation="css">
            <Drawer
                container={props.container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={props.mobileOpen}
                onClose={props.handleDrawerToggle}
                classes={{
                paper: classes.drawerPaper,
                }}
                ModalProps={{
                keepMounted: true, // Better open performance on mobile.
                }}
            >
            {renderMenu(props)}
        </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
        <Drawer
            classes={{
            paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
        >
            {renderMenu(props)}
        </Drawer>
        </Hidden>
  </nav>);
  }
export default Menu;