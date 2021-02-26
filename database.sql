create TABLE client(
    id_user SERIAL PRIMARY KEY,
    login VARCHAR(20),
    password VARCHAR (20),
    role VARCHAR(10)
);

create TABLE department (
    id_dep SERIAL PRIMARY KEY,
    name_dep VARCHAR(255)
)

create TABLE emp (
    id_emp SERIAL PRIMARY KEY,
    first_name varchar(40),
    middle_name varchar(40),
    last_name varchar(40),
    id_dep INTEGER,
    db_emp DATE,
    email_emp VARCHAR (40),
    tel_emp VARCHAR(11),
    FOREIGN KEY (id_dep) REFERENCES department (id_dep)
)

create TABLE access (
    id_emp INTEGER,
    id_route INTEGER,
    FOREIGN KEY (id_emp) REFERENCES emp (id_emp)
    FOREIGN KEY (id_route) REFERENCES route (id_route)
)

create TABLE room (
    id_room SERIAL PRIMARY KEY,
    name_room VARCHAR(40),
    about_room VARCHAR(100),
)

create TABLE route (
    id_route SERIAL PRIMARY KEY,
    id_start INTEGER,
    id_end INTEGER,
    FOREIGN KEY (id_start) REFERENCES room (id_room)
    FOREIGN KEY (id_end) REFERENCES room (id_room)
)

create TABLE tracking (
    id_reg SERIAL PRIMARY KEY,
    id_emp INTEGER,
    id_route INTEGER,
    Timestamp TIMESTAMP,
    FOREIGN KEY (id_emp) REFERENCES emp (id_emp)
    FOREIGN KEY (id_route) REFERENCES room (id_route)
)

