import React from 'react';
import ItemList from './ItemList';
// import Drawer from '@material-ui/core/Drawer';
// import Divider from '@material-ui/core/Divider';
// import List from '@material-ui/core/List';
// import Toolbar from '@material-ui/core/Toolbar'
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';





const Dashboard = () => {

    return (
        <div className="Dashboard">
            <div>
            {/* <Drawer variant="permanent" >
                <Toolbar />
                    <div>
                        <List>
                          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button key={text}>
                              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                              <ListItemText primary={text} />
                            </ListItem>
                          ))}
                        </List>
                        <Divider />
                        <List>
                            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                            ))}
                        </List>
                    </div>
                <Toolbar />
            </Drawer> */}
            </div>
            <div>
            <ItemList type='jobs' name='title' />
            <ItemList type='staff' name='first_name' />
            </div>
               
        </div>
        );
}

export default Dashboard;
