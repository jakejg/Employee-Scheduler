DROP TABLE IF EXISTS users_jobs;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS companies;

CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    calendar_id TEXT

);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT,
    password TEXT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    is_admin boolean DEFAULT false,
    current_wage INTEGER,
    years_at_company FLOAT,
    comp_id INTEGER REFERENCES companies ON DELETE CASCADE
);



CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    status TEXT DEFAULT 'under',
    staff_needed INTEGER,
    notes TEXT,
    comp_id INTEGER NOT NULL REFERENCES companies ON DELETE CASCADE,
    calendar_event_id TEXT
);

CREATE TABLE users_jobs (
    id SERIAL PRIMARY KEY,
    job_id INTEGER NOT NULL REFERENCES jobs ON DELETE CASCADE, 
    user_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE
);

INSERT INTO companies (name, calendar_id) 
VALUES ('Demo Company', 'AAMkAGZlYTI0YjJjLTg2ZjEtNDliNC1hMzEyLTRjZWQ1MTUxZDY0YgBGAAAAAADeU7Uxc9NWSb0_KQxp3SxZBwDOkpB1ICt6TpndDjvJOZEqAAAAAAEGAADOkpB1ICt6TpndDjvJOZEqAAAB5zU0AAA=');

INSERT INTO jobs (title, start_date, end_date, staff_needed, notes, comp_id, calendar_event_id) 
VALUES ('15 day Mountain', '2020-07-04', '2020-07-19', 2, 'test', 1, 'AAMkAGZlYTI0YjJjLTg2ZjEtNDliNC1hMzEyLTRjZWQ1MTUxZDY0YgBGAAAAAADeU7Uxc9NWSb0_KQxp3SxZBwDOkpB1ICt6TpndDjvJOZEqAAAB5y1mAADOkpB1ICt6TpndDjvJOZEqAAAB54uaAAA=');

INSERT INTO jobs (title, start_date, end_date, staff_needed, notes, comp_id, calendar_event_id) 
VALUES ('20 day River', '2020-08-10', '2020-08-30', 3, 'test2', 1, 'AAMkAGZlYTI0YjJjLTg2ZjEtNDliNC1hMzEyLTRjZWQ1MTUxZDY0YgBGAAAAAADeU7Uxc9NWSb0_KQxp3SxZBwDOkpB1ICt6TpndDjvJOZEqAAAB5y1mAADOkpB1ICt6TpndDjvJOZEqAAAB54uZAAA=');

INSERT INTO jobs (title, start_date, end_date, staff_needed, notes, comp_id, calendar_event_id) 
VALUES ('30 day Canyon', '2020-07-15', '2020-08-15', 3, 'test3', 1, 'AAMkAGZlYTI0YjJjLTg2ZjEtNDliNC1hMzEyLTRjZWQ1MTUxZDY0YgBGAAAAAADeU7Uxc9NWSb0_KQxp3SxZBwDOkpB1ICt6TpndDjvJOZEqAAAB5y1mAADOkpB1ICt6TpndDjvJOZEqAAAB54uYAAA=');

INSERT INTO jobs (title, start_date, end_date, staff_needed, notes, comp_id, calendar_event_id) 
VALUES ('Warehouse Cleaning', '2020-07-15', '2020-08-15', 3, 'test3', 1, '');

INSERT INTO jobs (title, start_date, end_date, staff_needed, notes, comp_id, calendar_event_id) 
VALUES ('Grant Proposal', '2020-07-15', '2020-08-15', 3, 'test3', 1, '');


INSERT INTO users (username, email, password, first_name, last_name, is_admin, comp_id) 
VALUES ('Demo', 'demouser@gmail.com', '$2b$12$/D1ERcrzDjfy3QfHwRUgmO.Dyw091SAw19vWTNr.H4d6.PSn0ytFu', 'Demo', 'User', true, 1);

INSERT INTO users (username, email, first_name, last_name, current_wage, years_at_company, comp_id) 
VALUES ('jon@gmail.com', 'jon@fakemail.com', 'Jon', 'Martin', 130, 3, 1);

INSERT INTO users (username, email, first_name, last_name, current_wage, years_at_company, comp_id) 
VALUES ('jarah@gmail.com', 'sarah@fakemail.com', 'Sarah', 'Brown', 100, 1, 1);

INSERT INTO users (username, email, first_name, last_name, current_wage, years_at_company, comp_id) 
VALUES ('kim@gmail.com', 'kim@fakemail.com', 'Kim', 'Miller', 120, 2, 1);

INSERT INTO users (username, email, first_name, last_name, current_wage, years_at_company, comp_id) 
VALUES ('stacy@gmail.com', 'stacy@fakemail.com', 'Stacy', 'Lopez', 140, 4, 1);

INSERT INTO users_jobs (job_id, user_id) 
VALUES (2,2);

INSERT INTO users_jobs (job_id, user_id) 
VALUES (2,3);

INSERT INTO users_jobs (job_id, user_id) 
VALUES (1,2);

INSERT INTO users_jobs (job_id, user_id) 
VALUES (3,2);
