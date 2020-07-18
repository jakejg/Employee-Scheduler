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
    staff_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE
);

INSERT INTO jobs (title, start_date, end_date, possible_staff, staff_needed, notes) VALUES ('15 day Mountain', '7-12-20', '7-15-20', 'jake', 2, 'test');
INSERT INTO jobs (title, start_date, end_date, possible_staff, staff_needed, notes) VALUES ('20 day Mountain', '7-14-20', '7-20-20', 'jon', 3, 'test2');
INSERT INTO jobs (title, start_date, end_date, possible_staff, staff_needed, notes) VALUES ('30 day Mountain', '7-01-20', '7-30-20', 'jon', 3, 'test3');

