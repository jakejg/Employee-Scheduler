import moment from 'moment';
const jobs = {
    1 : {
        id : 1,
        start_time : moment('2020-10-04'),
        end_time : moment('2020-10-24'),
        group : 1,
        staff: [],
        status: 'under',
        title : '20 Day River'
    },
    2 : {
        id: 2,
        start_time : moment('2020-10-15'),
        end_time : moment('2020-10-30'),
        group : 2,
        staff: [],
        status: 'under',
        title : '15 Day Mountain'
    }
}

const fullJobDetails1 = {
            id :1,
            start_time : moment('2020-10-04'),
            end_time : moment('2020-10-24'),
            group : 1,
            staff: [],
            status: 'under',
            title : '20 Day River',
            staff_needed: 2,
            notes: "this is only a test",
            staff: []
    }

const staff = {
    1 : {
        id : 1,
        first_name: "Stacey",
        last_name: "Lopez",
        isWorking: false,
        past_jobs: [],
        scheduled_jobs: []
    },
    2 : {
        id : 2,
        first_name: "Jon",
        last_name: "Martin",
        isWorking: false,
        past_jobs: [],
        scheduled_jobs: []
    }
}

const fullStaffDetails1 = {
    id : 1,
    first_name: "Stacey",
    last_name: "Lopez",
    current_wage: 130,
    years_at_company: 3,
    current_job: false,
    past_jobs: [],
    scheduled_jobs: []
}

const staffList = [
    {id:1, first_name: 'Stacey', last_name: 'Lopez', current_wage: 130, email: 'stacey@fakemail.com'},
]
export {jobs, staff, fullJobDetails1, staffList, fullStaffDetails1}