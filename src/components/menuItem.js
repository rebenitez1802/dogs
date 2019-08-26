import React, {Fragment} from 'react';
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
    return (
        <Fragment>
        <ListItem button key={props.bread}>                                               
            
            <ListItemIcon>
                <Checkbox
                  checked={props.checked}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': props.bread }}
                  onChange={(evt)=>{
                      evt.preventDefault();
                      props.handleBreadclick(props.bread,null,props.checked)}}
                />
            </ListItemIcon>
            <ListItemText primary={props.bread} />
            {props.subbreads.length>0? open ? <ExpandLess  onClick={handleClick} /> : <ExpandMore  onClick={handleClick} />:null}
        </ListItem>
        {props.subbreads.length > 0?
        <Collapse  key={"collapse-"+props.bread.bread} in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {props.subbreads.map((subread)=> {
                    return (<ListItem button key={subread.bread} className={classes.nested}>    
                        <ListItemIcon>
                            <Checkbox
                                checked={subread.checked}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': subread.bread }}
                                onChange={()=> props.handleBreadclick(props.bread, subread.bread, subread.checked)}
                                />    
                        </ListItemIcon>                                       
                        <ListItemText primary={subread.bread} />
                    </ListItem>)
                })}
            </List>
        </Collapse>
   :null
   }</Fragment>
    );
}
export default MenuItem;