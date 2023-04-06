

INSERT INTO type (type)
VALUES
('Elementary School'),
('Middle School'),
('High School'),
('University'),
('College');

INSERT INTO role (role)
VALUES
('Admin'),
('Teacher'),
('Student'),
('Alumni');



INSERT INTO users (email, first_name, last_name, role, password, DOB)
VALUES
('johndoe@gmail.com', 'John', 'Doe', 2, '123456', '1995-01-01'),
('janedoe@gmail.com', 'Jane', 'Doe', 3, '123456', '2000-01-01'),
('bobsmith@gmail.com', 'Bob', 'Smith', 3, '123456', '2002-01-01'),
('alumni@gmail.com', 'Khalid', 'Haj', 4, '123456', '1990-01-01'),
('teacher@gmail.com', 'Hassan', 'Er', 2, '123456', '1985-01-01');


INSERT INTO schools (school_name, establish_date, type, longitude, latitude )
VALUES
('Lincoln Elementary School', '1990-01-01', 1, '35.901431', '31.931891'),
('Stevenson Middle School', '2000-01-01', 2, '35.902661', '31.978391'),
('Washington High School', '2010-01-01', 3, '35.908131', '31.931231'),
('University of California, Berkeley', '2015-01-01', 4, '35.901471', '31.911811'),
('Stanford College', '2018-01-01', 5, '35.900731', '31.933391');


INSERT INTO user_school (school_id, user_id, start_year, end_year)
VALUES
(1, 1, '1995-01-01', '2002-01-01'),
(2, 2, '2005-01-01', '2008-01-01'),
(3, 3, '2015-01-01', '2019-01-01'),
(4, 4, '2017-01-01', '2021-01-01'),
(5, 5, '1985-01-01', '1990-01-01');



INSERT INTO permission (permission, created_at)
VALUES
  ('View profile', NOW()),
  ('Edit profile', NOW()),
  ('Delete profile', NOW()),
  ('Create post', NOW()),
  ('Edit post', NOW()),
  ('Delete post', NOW()),
  ('View dashboard', NOW()),
  ('Manage users', NOW()),
  ('Manage settings', NOW()),
  ('Manage billing', NOW());




INSERT INTO role_permission (role_id, permission_id, created_at)
VALUES
  (1, 1, NOW()),
  (1, 2, NOW()),
  (1, 3, NOW()),
  (1, 4, NOW()),
  (1, 5, NOW()),
  (2, 1, NOW()),
  (2, 2, NOW()),
  (2, 4, NOW()),
  (3, 3, NOW()),
  (3, 6, NOW()),
  (3, 7, NOW()),
  (3, 9, NOW()),
  (4, 1, NOW()),
  (4, 2, NOW()),
  (4, 4, NOW()),
  (4, 5, NOW()),
  (4, 7, NOW()),
  (4, 8, NOW());




INSERT INTO connection (user_id, friend_id, status, created_at)
VALUES
  (1, 2, 'Pending', NOW()),
  (2, 1, 'Pending', NOW()),
  (1, 3, 'Accepted', NOW()),
  (3, 1, 'Accepted', NOW()),
  (2, 3, 'Declined', NOW()),
  (3, 2, 'Declined', NOW()),
  (3, 4, 'Accepted', NOW()),
  (4, 3, 'Accepted', NOW()),
  (4, 5, 'Pending', NOW()),
  (5, 4, 'Pending', NOW());