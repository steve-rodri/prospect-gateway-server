DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

\c test;

CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE IF NOT EXISTS Users (
  id serial UNIQUE PRIMARY KEY NOT NULL,
  username VARCHAR(20) NOT NULL,
  email citext UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  wallet_balance DECIMAL NOT NULL,
  total_holdings_value DECIMAL NOT NULL
);

CREATE TABLE IF NOT EXISTS Competition_Types (
  id serial UNIQUE PRIMARY KEY NOT NULL,
  name VARCHAR(40) NOT NULL,
  athlete_limit INT,
  money_limit DECIMAL,
  duration_in_days INT
);

CREATE TABLE IF NOT EXISTS Competitions (
  id serial UNIQUE PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  competition_id INT NOT NULL,
  competition_type_id INT NOT NULL,
  start_time VARCHAR(50) NOT NULL,
  end_time VARCHAR(50) NOT NULL,
  user_result VARCHAR(1) NOT NULL,
  FOREIGN KEY(user_id)
    REFERENCES Users(id),
  FOREIGN KEY(competition_type_id)
    REFERENCES Competition_Types(id)
);

CREATE TABLE IF NOT EXISTS Athletes (
  id INT UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  age INT NOT NULL,
  position VARCHAR(5) NOT NULL,
  origin VARCHAR(50) NOT NULL,
  team_abbr VARCHAR(3) NOT NULL,
  last_updated VARCHAR(50) NOT NULL,
  image_url VARCHAR(200) NOT NULL,
  point_average DECIMAL,
  rebound_average DECIMAL,
  assist_average DECIMAL,
  block_average DECIMAL,
  steal_average DECIMAL,
  turnover_average DECIMAL
);

CREATE TABLE IF NOT EXISTS Holdings (
  id serial UNIQUE PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  athlete_id INT NOT NULL,
  share_amt FLOAT NOT NULL,
  purchase_date VARCHAR(50) NOT NULL,
  FOREIGN KEY(user_id)
    REFERENCES Users(id),
  FOREIGN KEY(athlete_id)
    REFERENCES Athletes(id)
);

CREATE TABLE IF NOT EXISTS Stock_Prices (
  id serial UNIQUE PRIMARY KEY NOT NULL,
  athlete_id INT NOT NULL,
  date VARCHAR(50) NOT NULL,
  price DECIMAL NOT NULL,
  FOREIGN KEY(athlete_id)
    REFERENCES Athletes(id)
);

CREATE TABLE IF NOT EXISTS Athletes_Used_In_Competition (
  id serial UNIQUE PRIMARY KEY NOT NULL,
  competition_id INT NOT NULL,
  athlete_id INT NOT NULL,
  FOREIGN KEY(competition_id)
    REFERENCES Competitions(id),
  FOREIGN KEY(athlete_id)
    REFERENCES Athletes(id)
);

CREATE TABLE IF NOT EXISTS Friendships (
  id serial UNIQUE PRIMARY KEY NOT NULL,
  user_one_id INT NOT NULL,
  user_two_id INT NOT NULL,
  FOREIGN KEY(user_one_id)
    REFERENCES Users(id),
  FOREIGN KEY(user_two_id)
    REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS Notification_Types (
  id serial UNIQUE PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Notifications (
  id serial UNIQUE PRIMARY KEY NOT NULL,
  type_id INT NOT NULL,
  sender_id INT NOT NULL,
  recipient_id INT NOT NULL,
  date_sent VARCHAR(50) NOT NULL,
  status VARCHAR(10) NOT NULL,
  key VARCHAR(30) NOT NULL,
  FOREIGN KEY(recipient_id)
    REFERENCES Users(id),
  FOREIGN KEY(sender_id)
    REFERENCES Users(id)
);

INSERT INTO Notification_Types(name)
VALUES('friendship'),('competition');

INSERT INTO Users(username, email, password, wallet_balance, total_holdings_value)
VALUES (
  'knissley',
  'knissley@test',
  'password123',
  5000.00,
  5600.00
), (
  'testuser',
  'testuser@test',
  'password321',
  4000.00,
  8000.00
);