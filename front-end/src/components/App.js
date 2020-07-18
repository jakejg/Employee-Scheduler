import React, {useEffect} from 'react';
import NavBar from './NavBar';
import Routes from './Routes'
import JobList from './JobList';
import { loadJobsFromAPI } from '../actions/jobs';
import { useDispatch, useSelector } from 'react-redux';

function App() {
    const jobs = useSelector(state => state) || {}
    console.log(jobs)
    const dispatch = useDispatch();

    useEffect(() => {
        const getJobs = async () => {
            await dispatch(loadJobsFromAPI())
        }
        getJobs();
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
