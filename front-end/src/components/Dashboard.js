import React from 'react';
import ItemList from './ItemList';
import Sidebar from './Sidebar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';



const Dashboard = () => {

    return (
        <div className="Dashboard">
            <Grid container spacing={3}>
                <Grid item xs>
                    <Sidebar />
                </Grid>
                <Grid item xs>
                    <Paper>
                    <ItemList type='jobs' name='title' />
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper>
                        <ItemList type='staff' name='first_name' />
                    </Paper>
                </Grid>
               
             </Grid>
        </div>
        );
}

export default Dashboard;
