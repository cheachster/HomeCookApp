DROP DATABASE IF EXISTS recipesDB;
CREATE database recipesDB;
USE recipesDB;

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100),
    password VARCHAR(100) NOT NULL
);

CREATE TABLE recipes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    recipe VARCHAR(100),
    user_Id INT NOT NULL
);

INSERT INTO user (email, password) VALUES ('linda@homecook.com', 'Linda123' ),
('cheachster@homecook.com', 'Chris123' ),
('billy@homecook.com', 'Billy123' );

INSERT INTO recipes (recipe, user_Id ) VALUES( 'cookies', 1 ),
( 'cupcake', 2 ),
( 'pie', 1 );


