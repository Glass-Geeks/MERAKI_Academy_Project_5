CREATE TABLE type (
  type_id SERIAL PRIMARY KEY,
  type VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  is_deleted SMALLINT DEFAULT 0
);

CREATE TABLE role (
  role_id SERIAL PRIMARY KEY,
  role VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  is_deleted SMALLINT DEFAULT 0
);

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  role INT,
  password VARCHAR(255),
  user_image VARCHAR(255),
  DOB DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (role) REFERENCES role(role_id)
);

CREATE TABLE schools (
  school_id SERIAL PRIMARY KEY,
  school_name VARCHAR(255),
  school_image VARCHAR(255),
  establish_date DATE,
  longitude VARCHAR(255),
  latitude VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  is_deleted SMALLINT DEFAULT 0,
  type INT,
  FOREIGN KEY (type) REFERENCES type(type_id)
);

CREATE TABLE user_school (
  user_school_id SERIAL PRIMARY KEY,
  school_id INT,
  user_id INT,
  start_year DATE,
  end_year DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (school_id) REFERENCES schools(school_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE permission (
  permission_id SERIAL PRIMARY KEY,
  permission VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  is_deleted SMALLINT DEFAULT 0
);

CREATE TABLE role_permission (
  role_permission_id SERIAL PRIMARY KEY,
  role_id INT,
  permission_id INT,
  created_at TIMESTAMP DEFAULT NOW(),
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (role_id) REFERENCES role(role_id),
  FOREIGN KEY (permission_id) REFERENCES permission(permission_id)
);

CREATE TABLE connection (
  connection_id SERIAL PRIMARY KEY,
  user_id INT,
  friend_id INT,
  status VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ,
  FOREIGN KEY (friend_id) REFERENCES users(user_id)
);
-- TO DROP ALL TABLES
-- DROP TABLE user_school;
--DROP TABLE schools;
--DROP TABLE connection;
--DROP TABLE users;
--DROP TABLE role_permission;
--DROP TABLE permission;
--DROP TABLE role;
--DROP TABLE type;
