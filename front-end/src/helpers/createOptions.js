/*  Create a new array with just the info needed for the select field options,
    id and full name,
    if staff is already assigned to the job, don't show them as an option to be added again
    Accepts an object for allStaff and an array for staffOnJob
*/
   
function filterStaffOnJob(allStaff, staffOnJob){
    const options = [];
    for (let id in allStaff){
        let matched = false
        for (let staff of staffOnJob){
            // eslint-disable-next-line 
            if (id == staff.id) {
                matched = true;
                break
            }
        }
        if (!matched) {
            options.push({id, full_name: `${allStaff[id].first_name} ${allStaff[id].last_name}`})
        }
    }
    return options
}

export default filterStaffOnJob;