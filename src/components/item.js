import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 300,
    marginTop:10
  },
  media: {
    width: '100%'        
  },
});

export default function Item(props) {
  

    const classes = useStyles();

    return (
      <Card className={classes.card}>
         <img
            className={classes.media}
            src={props.url}
            title={props.title}
          />         
          <CardContent>         
            <Typography gutterBottom variant="h6" component="p">
                {props.title}
            </Typography>
            
          </CardContent>
        
      </Card>
    );
  
  
}
