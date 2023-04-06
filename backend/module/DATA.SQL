CREATE TABLE type (
  type_id SERIAL PRIMARY KEY,
  type VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  is_deleted SMALLINT DEFAULT 0
);

CREATE TABLE role (
  role_id SERIAL PRIMARY KEY,
  role VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  is_deleted SMALLINT DEFAULT 0
);

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  role INT NOT NULL,
  password VARCHAR(255) NOT NULL,
  user_image VARCHAR(255) NOT NULL, 
  DOB DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (role) REFERENCES role(role_id)
);

CREATE TABLE schools (
  school_id SERIAL PRIMARY KEY,
  school_name VARCHAR(255) NOT NULL,
  school_image VARCHAR(255) NOT NULL,
  establish_date DATE NOT NULL,
  longitude VARCHAR(255) NOT NULL,
  latitude VARCHAR(255) NOT NULL,
  type INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (type) REFERENCES type(type_id)
);

CREATE TABLE user_school (
  user_school_id SERIAL PRIMARY KEY,
  school_id INT NOT NULL,
  user_id INT NOT NULL,
  start_year DATE NOT NULL,
  end_year DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (school_id) REFERENCES schools(school_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE

);

CREATE TABLE permission (
  permission_id SERIAL PRIMARY KEY,
  permission VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  is_deleted SMALLINT DEFAULT 0
);

CREATE TABLE role_permission (
  role_permission_id SERIAL PRIMARY KEY,
  role_id INT NOT NULL,
  permission_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (role_id) REFERENCES role(role_id),
  FOREIGN KEY (permission_id) REFERENCES permission(permission_id)
);

CREATE TABLE connection (
  connection_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  friend_id INT NOT NULL,
  status VARCHAR(255) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT NOW(),
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ,
  FOREIGN KEY (friend_id) REFERENCES users(user_id)
);
-- TO DROP ALL TABLES
-- DROP TABLE user_school;
-- DROP TABLE schools;
-- DROP TABLE connection;
-- DROP TABLE users;
-- DROP TABLE role_permission;
-- DROP TABLE permission;
-- DROP TABLE role;
-- DROP TABLE type;
-- DROP TABLE type;

