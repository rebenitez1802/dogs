import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import  {makeStyles} from '@material-ui/core/styles';
import Menu from './menu';
import ImagesGridList from './gridList';
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    
    backgroundColor: theme.palette.background.paper,
  },  
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
 
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  } 
}));


function Layout(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = ()=> {
    setMobileOpen(!mobileOpen);
  };
  
  const { container } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle.bind(this)}
            className={classes.menuButton}
          >            
           <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dogs Breads
          </Typography>
        </Toolbar>
      </AppBar>
      <Menu 
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle.bind(this)}
        mobileOpen = {mobileOpen}
        container={container} 
        classes={classes} 
        breads = {props.breads}
        handleBreadclick = {props.handleBreadclick}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <ImagesGridList images={props.data}/>
      </main>
    </div>
  );
}

export default Layout;