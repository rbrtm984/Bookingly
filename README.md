# reinforcement

Database - RDS - Slack for connection info

Tables exist corresponding to ideas from initial brainstorm. 

They correspond to the following queries: 

-- Create Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP,
    current_rank INTEGER
);

-- Create Races table
CREATE TABLE races (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    slot INTEGER NOT NULL,
    prize MONEY NOT NULL,
    winner INTEGER REFERENCES users(id),
    reporter INTEGER REFERENCES users(id)
);

-- Create Participants table
CREATE TABLE participants (
    id SERIAL PRIMARY KEY,
    race_id INTEGER REFERENCES races(id),
    user_id INTEGER REFERENCES users(id),
    rank INTEGER
);

-- Create Sessions table
CREATE TABLE sessions (
    session_id VARCHAR(255) PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    exp_datetime TIMESTAMP NOT NULL
);