/* Calculates the total staffing costs for a trip */

function getTotalCost(job){
    // get length of trip in days
    let length = job.end_time.diff(job.start_time, 'days');
    
    return job.staff.reduce((wages, staff) => { return wages + staff.current_wage * length}, 0);
}

export default getTotalCost