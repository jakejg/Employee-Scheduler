import React from 'react';
import { useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const ItemList = ({type, name}) => {
    const items = useSelector(state => state[type])

  return (
    <div >
      <List>
      {Object.keys(items).map(id => <ListItem key={id}>{items[id][name]}</ListItem>)}
      </List>
        
    </div>
  );
}

export default ItemList;
