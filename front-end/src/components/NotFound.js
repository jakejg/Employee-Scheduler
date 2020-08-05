import React from 'react';
import {Link} from 'react-router-dom';
import {
    Box
} from '@material-ui/core'


const App = () => {

    return (
        <Box mx={{sm:'auto'}} width={{sm:'40%'}} mt={3}>
            Sorry the page you requested does not exist<br></br>
            Click <Link to='/'>here</Link> to return to the home page.
        </Box>
        );
}

export default App;
