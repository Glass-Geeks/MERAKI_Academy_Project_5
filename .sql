
Table schools {
  school_id INT PRIMARY SERIAL KEY,
  school_name VARCHAR(255),
  school_image VARCHAR(255),
  establish_date date,
  longitude VARCHAR(255),
  latitude VARCHAR(255),
  created_at timestamp,
  type INT,
  FOREIGN KEY (type) REFERENCES type(type_id)
}

Table user_school {
  user_school_id INT PRIMARY SERIAL KEY,
  school_id INT,
  user_id INT,
  start_year YEAR,
  end_year YEAR,
  created_at TIMESTAMP,
FOREIGN KEY (school_id) REFERENCES schools(school_id),
FOREIGN KEY (user_id) REFERENCES users(user_id)
}



Table users {
  user_id INT PRIMARY SERIAL KEY,
  email VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  role INT,
  password VARCHAR(255),
  user_image VARCHAR(255),
  DOB DATE,
  created_at TIMESTAMP,
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (role) REFERENCES role(role_id)
}

Table role {
  role_id INT PRIMARY SERIAL KEY
  role VARCHAR(255)
  created_at TIMESTAMP
}

Table type {
  type_id INT PRIMARY SERIAL KEY
  type VARCHAR(255)
  created_at timestamp
}

Table permission {
  permission_id INT PRIMARY SERIAL KEY
  permission VARCHAR(255)
  created_at timestamp
}

Table role_permission {
  role_permission_id INT PRIMARY SERIAL KEY
  role_id INT
  permission_id INT
}


Table connection {
  connection_id INT PRIMARY SERIAL KEY
  user_id INT
  friend_id INT
  status VARCHAR(255)
}


Ref: schools.type > type.type_id // many-to-one

Ref: users.role < role.role_id

Ref: user_school.user_id < users.user_id

Ref: user_school.school_id < schools.school_id

Ref: role_permission.permission_id > permission.permission_id

Ref: role_permission.role_id > role.role_id

Ref: connection.user_id > users.user_id
Ref: connection.friend_id > users.user_id
