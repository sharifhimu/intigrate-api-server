CREATE DATABASE evatix;
CREATE TABLE api(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    fullname VARCHAR(255),
    dob VARCHAR(255),
    profession VARCHAR(255)
)