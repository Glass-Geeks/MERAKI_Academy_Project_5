INSERT INTO type (type)
VALUES
('SCHOOL'),
('UNIVERSITY'),


INSERT INTO role (role)
VALUES
('ADMIN'),
('TEACHER'),
('STUDENT'),

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

INSERT INTO permission (permission)
VALUES
  ('VIEW_PROFILE'),
  ('EDIT_PROFILE'),
  ('DELETE_PROFILE'),
  ('CREATE_POST'),
  ('EDIT_POST'),
  ('DELETE_POST'),
  ('VIEW_DASHBOARD'),
  ('MANAGE_USERS'),
  ('MANAGE_SETTINGS'),
  ('MANAGE_BILLING');

INSERT INTO role_permission (role_id, permission_id)
VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (2, 1),
  (2, 2),
  (2, 4),
  (3, 3),
  (3, 6),
  (3, 7),
  (3, 9),

INSERT INTO connection (user_id, friend_id)
VALUES
  (2, 1),
  (1, 3),
  (2, 3),
  (3, 4),
  (4, 5),
