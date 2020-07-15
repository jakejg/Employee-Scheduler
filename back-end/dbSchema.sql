CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    is_admin boolean NOT NULL,
    current_wage INTEGER,
    years_at_company FLOAT,
    position TEXT,
    join_at timestamp without time zone NOT NULL,
    last_login_at timestamp with time zone
);

CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    possible_staff TEXT,
    staff_needed INTEGER,
    total_staff_cost INTEGER,
    notes TEXT
);

CREATE TABLE users_jobs (
    id SERIAL PRIMARY KEY,
    job_id INTEGER NOT NULL REFERENCES jobs,
    staff_id INTEGER NOT NULL REFERENCES users
);