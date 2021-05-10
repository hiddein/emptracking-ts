create TABLE client(
    client_id SERIAL PRIMARY KEY not NULL,
    login VARCHAR(20) not NULL,
    password VARCHAR (20) not NULL,
    role VARCHAR(10) not NULL
);

create TABLE department (
    id_dep SERIAL PRIMARY KEY not NULL,
    name_dep VARCHAR(40) not NULL
)

create TABLE emp (
    id_emp SERIAL PRIMARY KEY not NULL,
    first_name varchar(40) not NULL,
    middle_name varchar(40) not NULL,
    last_name varchar(40) not NULL,
    id_dep INTEGER not NULL,
    db_emp DATE not NULL,
    email_emp VARCHAR (40) not NULL,
    tel_emp VARCHAR(11) not NULL,
    FOREIGN KEY (id_dep) REFERENCES department (id_dep)
)

create TABLE access (
    id_emp INTEGER not NULL,
    id_room INTEGER not NULL,
    FOREIGN KEY (id_emp) REFERENCES emp (id_emp),
    FOREIGN KEY (id_room) REFERENCES room (id_room)
)

create TABLE room (
    id_room SERIAL PRIMARY KEY not NULL,
    name_room VARCHAR(40) not NULL,
    about_room VARCHAR(100),
)

create TABLE route (
    id_route SERIAL PRIMARY KEY not NULL,
    id_start INTEGER not NULL,
    id_end INTEGER not NULL,
    FOREIGN KEY (id_start) REFERENCES room (id_room),
    FOREIGN KEY (id_end) REFERENCES room (id_room)
)

create TABLE tracking (
    id_reg SERIAL PRIMARY KEY not NULL,
    id_emp INTEGER not NULL,
    id_route INTEGER not NULL,
    Timestamp TIMESTAMP not NULL,
    FOREIGN KEY (id_emp) REFERENCES emp (id_emp),
    FOREIGN KEY (id_route) REFERENCES route (id_route)
)

create TABLE dep_own_room (
    id_dep INTEGER not NULL,
    id_room INTEGER not NULL,
    FOREIGN KEY (id_dep) REFERENCES department (id_dep),
    FOREIGN KEY (id_room) REFERENCES room (id_room)
)

create TABLE schedule(
    id_reg SERIAL PRIMARY KEY not NULL,
    id_emp INTEGER not NULL,
    start_time time not NULL,
    tea_time time not NULL,
    lunch_time time not NULL,
    end_time time not NULL,
    FOREIGN KEY (id_emp) REFERENCES emp (id_emp)
)

create TABLE moves(
    move_id SERIAL PRIMARY KEY not NULL,
    id_emp INTEGER not NULL,
    id_room time not NULL,
    time_enter TIMESTAMP not NULL,
    time_leave TIMESTAMP not NULL,

)

