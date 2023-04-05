CREATE TABLE schools {
  school_id INT PRIMARY SERIAL KEY,
  school_name VARCHAR(255),
  school_image VARCHAR(255),
  establish_date DATE,
  longitude VARCHAR(255),
  latitude VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  type INT,
  FOREIGN KEY (type) REFERENCES type(type_id)
}

CREATE TABLE user_school {
  user_school_id INT PRIMARY SERIAL KEY,
  school_id INT,
  user_id INT,
  start_year YEAR,
  end_year YEAR,
  created_at TIMESTAMP DEFAULT NOW(),
FOREIGN KEY (school_id) REFERENCES schools(school_id),
FOREIGN KEY (user_id) REFERENCES users(user_id)
}



CREATE TABLE users {
  user_id INT PRIMARY SERIAL KEY,
  email VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  role INT,
  password VARCHAR(255),
  user_image VARCHAR(255),
  DOB DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (role) REFERENCES role(role_id)
}

CREATE TABLE role {
  role_id INT PRIMARY SERIAL KEY,
  role VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
}

CREATE TABLE type {
  type_id INT PRIMARY SERIAL KEY,
  type VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
}

CREATE TABLE permission {
  permission_id INT PRIMARY SERIAL KEY,
  permission VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
}

CREATE TABLE role_permission {
  role_permission_id INT PRIMARY SERIAL KEY,
  role_id INT,
  permission_id INT,
  FOREIGN KEY (role_id) REFERENCES role(role_id),
  FOREIGN KEY (permission_id) REFERENCES permission(permission_id)

}


CREATE TABLE connection {
  connection_id INT PRIMARY SERIAL KEY,
  user_id INT,
  friend_id INT,
  status VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (friend_id) REFERENCES users(user_id)

}
