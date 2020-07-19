import React, {useEffect} from 'react';
import NavBar from './NavBar';
import Routes from './Routes'
import JobList from './JobList';
import { loadJobsFromAPI } from '../actions/jobs';
import { useDispatch} from 'react-redux';
import { loadStaffFromAPI } from '../actions/staff';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            dispatch(loadJobsFromAPI())
            dispatch(loadStaffFromAPI())
        }
        getData();
    }, [dispatch])

    return (
        <div className="App">
            <NavBar/>
            <JobList />
            <Routes />      
        </div>
        );
}

export default App;
