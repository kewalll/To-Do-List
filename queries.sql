-- Create the database
CREATE DATABASE toDoList;


-- Create the table
CREATE TABLE list (
    id SERIAL PRIMARY KEY,
    task TEXT NOT NULL
);

