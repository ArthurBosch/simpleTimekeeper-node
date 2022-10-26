create TABLE person(
id SERIAL PRIMARY KEY, 
name VARCHAR(255), 
email CITEXT UNIQUE,
passwordHash VARCHAR(255)
);

create TABLE workplace (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255),
    baseWage INTEGER, 
    wageType VARCHAR,
    currency VARCHAR(255), 
    userId INTEGER,
    FOREIGN KEY (userId) REFERENCES person (id)
);

create TABLE shift (
    id SERIAL PRIMARY KEY, 
    timeStart VARCHAR(255), 
    timeEnd VARCHAR(255),
    wage INTEGER,
    userId INTEGER, 
    workplaceId INTEGER, 
    FOREIGN KEY (userId) REFERENCES person (id),
    FOREIGN KEY (workplaceId) REFERENCES workplace (id)
);
