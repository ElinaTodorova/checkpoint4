SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS user;
CREATE TABLE user(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  username VARCHAR(150) NOT NULL,
  hashed_password VARCHAR(255)NOT NULL
);

DROP TABLE IF EXISTS gift;
CREATE TABLE gift(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name_gift VARCHAR(255) NOT NULL,
  description_gift TEXT,
  age_min INT NOT NULL,
  image_url VARCHAR(255),
  user_id INT,
  CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES user(id)
);

DROP TABLE IF EXISTS activity;
CREATE TABLE activity(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name_activity VARCHAR(255) NOT NULL,
  description_activity TEXT,
  age_min INT NOT NULL,
  age_max INT NOT NULL,
  image_url VARCHAR(255),
  userActivity_id INT,
  CONSTRAINT userActivity_id FOREIGN KEY (userActivity_id) REFERENCES user(id)
);

SET FOREIGN_KEY_CHECKS = 1;