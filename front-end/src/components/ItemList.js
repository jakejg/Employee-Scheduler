import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import './styles/ItemList.css';


const ItemList = ({type, name}) => {
    const items = useSelector(state => state[type])

  
  return (
    <div>
      <Grid container spacing={1}>
                <Grid item xs>
                </Grid>
                <Grid item lg>
                <List>
      {Object.keys(items).map(id => <ListItem key={id}>{items[id][name]}</ListItem>)}
      </List>
                </Grid>
                <Grid item xs>
                  
                </Grid>
               
             </Grid>
        
    </div>
  );
}

export default ItemList;
