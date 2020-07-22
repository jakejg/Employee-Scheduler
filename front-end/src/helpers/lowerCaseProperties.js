// End Date: "2020-07-28"
// Notes: ""
// Staff Needed: "4"
// Start Date: "2020-07-21"
// Title: "8 Day River"
// comp_id: 1

function toLower(obj){
    let newObj = {}
    for (let key in obj) {
        newObj[key.toLowerCase()] = obj[key];
}
return newObj
}

export default toLower