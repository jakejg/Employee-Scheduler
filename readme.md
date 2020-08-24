# Employee Scheduler
Employee Scheduler is an application for organizations to manage contracts and short term work agreements for staff.
Organization administrators can assign staff to jobs, keep track of which jobs/tasks still need to be filled, and view all the jobs on a calendar. When a staff is assigned to a job, a notification will be sent to the staff member and the job will appear on their Google or Microsoft calendar.
Vist https://employee-scheduler1.herokuapp.com and register your company or view the demo version to see how it works.

## Using the Website
After registering, open the left side bar on the dashboard page and click on 'Add Job' to add jobs/tasks/events. The job status will be shown as a colored check mark, next to the job. yellow = still need staff, green = staff filled, red = too many staff. Click on 'Add Staff' to add employees/staff. Click on 'Change Staff on a Job' to add staff to a job. When a staff if added, an email will be sent to them, and the job will appear on their Google or Microsoft calendar. Clicking on a staff or job from the dashboard will show details, which can be changed if needed. Click on 'View Calendar in the sidebar to view all the jobs in a calendar. Jobs can be moved by drag and drop on the calendar page.

## Additional Features to be Added 
Some features I'd like to add: a login flow for staff members to see upcoming jobs and request work. A feature to match staff availability with open jobs. This could be useful for both admin and staff users. 

## Technologies Used
This was created with React, Node.js and PostgreSQL. The Google/Microsoft calendar functionality is set up using the Microsoft Graph Api. 

## Tests
Tests for the front-end are located in the front-end src folder and can be run with npm test.
Test for the back-end are located in the root back-end folder and can be run with jest.

## Instructions for Running Project Code
You will need node.js and PostgreSQL installed on your machine.
1. Download the code <br>
    git clone https://github.com/jakejg/Employee-Scheduler.git 
2. Install dependencies for back-end<br>
    cd Employee-Scheduler/back-end <br>
    npm install <br>
3. Create a .env file with secret key <br>
    echo "SECRET_KEY = your-secret-key" > .env <br>
4. Create a database called scheduler <br>
    create_db food_planner
5. Set up the database tables <br>
    psql scheduler <br>
    \i dbSchema.sql <br>
6. Start back-end server
    node (or nodemon) server.js <br>
7. Install dependencies for front-end and start server<br>
    npm install <br>
    npm start <br>

