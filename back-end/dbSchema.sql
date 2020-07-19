DROP TABLE IF EXISTS users_jobs;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS jobs;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    is_admin boolean NOT NULL,
    current_wage INTEGER,
    years_at_company FLOAT,
    position TEXT
);



CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    possible_staff TEXT,
    staff_needed INTEGER,
    notes TEXT
);

CREATE TABLE users_jobs (
    id SERIAL PRIMARY KEY,
    job_id INTEGER NOT NULL REFERENCES jobs ON DELETE CASCADE, 
    user_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE
);

INSERT INTO jobs (title, start_date, end_date, possible_staff, staff_needed, notes) 
VALUES ('15 day Mountain', '7-12-20', '7-15-20', 'jake', 2, 'test');

INSERT INTO jobs (title, start_date, end_date, possible_staff, staff_needed, notes) 
VALUES ('20 day Mountain', '7-14-20', '7-20-20', 'jon', 3, 'test2');

INSERT INTO jobs (title, start_date, end_date, possible_staff, staff_needed, notes) 
VALUES ('30 day Mountain', '7-01-20', '7-30-20', 'jon', 3, 'test3');


INSERT INTO users (username, first_name, last_name, current_wage, years_at_company, is_admin) 
VALUES ('Jon', 'Jon', 'Martin', 130, 3, false);

INSERT INTO users (username, first_name, last_name, current_wage, years_at_company, is_admin) 
VALUES ('Sarah', 'Sarah', 'Brown', 100, 1, false);

INSERT INTO users (username, first_name, last_name, current_wage, years_at_company, is_admin) 
VALUES ('Kim', 'Kim', 'Miller', 120, 2, false);

INSERT INTO users (username, first_name, last_name, current_wage, years_at_company, is_admin) 
VALUES ('Stacy', 'Stacy', 'Lopez', 140, 4, false);

INSERT INTO users (username, first_name, last_name, current_wage, years_at_company, is_admin) 
VALUES ('Jake', 'Jake', 'Gerry', 140, 4, true);

INSERT INTO users_jobs (job_id, user_id) 
VALUES (2,1);

INSERT INTO users_jobs (job_id, user_id) 
VALUES (2,2);