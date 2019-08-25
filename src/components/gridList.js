import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Item from './item';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
}));

export default function ImagesGridList(props) {
  const classes = useStyles();

  return (

    <div className={classes.root}>
      <Grid container className={classes.gridList} justify="space-evenly" alignItems="flex-start">
        {props.images.map(item => (
          <Item item key={item.img}
            url={item.img}
            title={item.title}
          />            
          
        ))}
      </Grid>
    </div>
  );
}
