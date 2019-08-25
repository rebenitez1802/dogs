import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import  {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    nested: {
        paddingLeft: theme.spacing(4),
      },
      formControl: {
        margin: theme.spacing(3),
      },
}))
function MenuItem(props){
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    function handleClick() {
      setOpen(!open);
    }
    return (props.subbreads.length > 0?
    [
        <ListItem button key={props.bread} onClick={handleClick}>                                               
            
            <ListItemIcon>
                <Checkbox
                  checked={false}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': props.bread }}
                />
            </ListItemIcon>
            <ListItemText primary={props.bread} />
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>,
        <Collapse key={"collapse-"+props.bread} in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {props.subbreads.map((subread)=> {
                    return (<ListItem button key={subread} className={classes.nested}>    
                        <ListItemIcon>
                            <Checkbox
                                checked={false}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': subread }}
                                />    
                        </ListItemIcon>                                       
                        <ListItemText primary={subread} />
                    </ListItem>)
                })}
            </List>
        </Collapse>
    ]
    :
    <ListItem button key={props.bread}>           
        
        <ListItemText primary={props.bread} />
    
    </ListItem>
    );
}
export default MenuItem;