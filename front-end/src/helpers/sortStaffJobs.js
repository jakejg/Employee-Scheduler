import moment from 'moment';

/* Takes an array of all jobs associated with a staff, 
sorts into jobs worked, jobs scheduled for, and currently working,
returns an object with two arrays of job ids and current job */

function sortJobs(jobs) {
    let past = [];
    let future = [];
    let current = false;

    for (let job of jobs) {
        if (moment(job.end_date) < moment()) {
            past.push(job.id)
        }
        else if (moment(job.start_date) > moment()) {
            future.push(job.id)
        }
        else {
            current = job.id;
        }
    }

    return {past, future, current}
}

export default sortJobs;
